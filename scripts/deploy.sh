#!/usr/bin/env bash
#
# Build, ship and release rockship-profile.
#
#   ./scripts/deploy.sh                 build -> push -> release (the full ride)
#   ./scripts/deploy.sh build           1. build Next.js standalone on this machine
#   ./scripts/deploy.sh image           2. build the Docker image locally (this arch)
#   ./scripts/deploy.sh push            2+3. build multi-arch image and push to ECR
#   ./scripts/deploy.sh release         4. ssh to the server, swap the container
#   ./scripts/deploy.sh run-local       smoke-test the local image on :3000
#   ./scripts/deploy.sh logs            tail the container logs on the server
#
# Configuration lives in ./deploy.config (see deploy.config.example).

# This script uses bash features (arrays, ${!var}). Re-exec under bash so that
# `sh ./scripts/deploy.sh` behaves identically to `./scripts/deploy.sh`.
if [ -z "${BASH_VERSION:-}" ]; then
  exec bash "$0" "$@"
fi

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# ---------------------------------------------------------------- output ----

if [ -t 1 ]; then
  C_RESET=$'\033[0m'; C_BOLD=$'\033[1m'; C_DIM=$'\033[2m'
  C_BLUE=$'\033[34m'; C_GREEN=$'\033[32m'; C_RED=$'\033[31m'; C_YELLOW=$'\033[33m'
else
  C_RESET=""; C_BOLD=""; C_DIM=""; C_BLUE=""; C_GREEN=""; C_RED=""; C_YELLOW=""
fi

step() { printf '\n%s==>%s %s%s%s\n' "$C_BLUE$C_BOLD" "$C_RESET" "$C_BOLD" "$*" "$C_RESET"; }
info() { printf '    %s\n' "$*"; }
dim()  { printf '    %s%s%s\n' "$C_DIM" "$*" "$C_RESET"; }
ok()   { printf '    %s✓%s %s\n' "$C_GREEN" "$C_RESET" "$*"; }
warn() { printf '    %s!%s %s\n' "$C_YELLOW" "$C_RESET" "$*" >&2; }
die()  { printf '\n%serror:%s %s\n' "$C_RED$C_BOLD" "$C_RESET" "$*" >&2; exit 1; }

need() { command -v "$1" >/dev/null 2>&1 || die "\`$1\` is not installed or not on PATH."; }

# ---------------------------------------------------------------- config ----

[ -f deploy.config ] || die "deploy.config not found. Run: cp deploy.config.example deploy.config"

SETTINGS="AWS_REGION AWS_ACCOUNT_ID ECR_REPOSITORY AWS_PROFILE IMAGE_TAG PLATFORMS
          SSH_HOST SSH_USER SSH_PORT SSH_KEY CONTAINER_NAME DOCKER_NETWORK
          HOST_PORT CONTAINER_PORT LOCAL_PORT REMOTE_ENV_FILE"

# An environment variable beats deploy.config (`IMAGE_TAG=v1.2.3 ./scripts/deploy.sh`).
# `source` would clobber it, so snapshot the overrides first and reapply after.
_overrides=""
for _v in $SETTINGS; do
  [ -n "${!_v+set}" ] && _overrides+="$(printf '%s=%q\n' "$_v" "${!_v}")"$'\n'
done

# shellcheck disable=SC1091
set -a; source ./deploy.config; set +a
eval "$_overrides"

# `set -a` exported everything, including AWS_PROFILE="". The AWS CLI reads that
# as a profile literally named "" and fails with "The config profile () could
# not be found" — empty has to mean absent, so unset it.
[ -z "${AWS_PROFILE:-}" ] && unset AWS_PROFILE

true # the test above must not decide the script's exit status under `set -e`

: "${AWS_REGION:?set AWS_REGION in deploy.config}"
: "${AWS_ACCOUNT_ID:?set AWS_ACCOUNT_ID in deploy.config}"
: "${ECR_REPOSITORY:?set ECR_REPOSITORY in deploy.config}"
: "${PLATFORMS:=linux/amd64,linux/arm64}"
: "${CONTAINER_NAME:=rockship-profile}"
: "${CONTAINER_PORT:=3000}"
: "${SSH_PORT:=22}"
: "${LOCAL_PORT:=3000}"
# HOST_PORT deliberately has NO default: empty means "publish nothing" and the
# container is reached over DOCKER_NETWORK. A `:=` default here would silently
# republish port 3000 and collide with whatever already owns it.
: "${HOST_PORT=}"
: "${DOCKER_NETWORK=nginx}"

if [ -z "${IMAGE_TAG:-}" ]; then
  if git rev-parse --git-dir >/dev/null 2>&1; then
    IMAGE_TAG="$(git rev-parse --short HEAD)"
    [ -n "$(git status --porcelain)" ] && IMAGE_TAG="${IMAGE_TAG}-dirty"
  else
    IMAGE_TAG="manual"
  fi
fi

REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
IMAGE="${REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}"
IMAGE_LATEST="${REGISTRY}/${ECR_REPOSITORY}:latest"
LOCAL_IMAGE="${ECR_REPOSITORY}:${IMAGE_TAG}"
STAGE_DIR=".deploy"

aws_cli() {
  if [ -n "${AWS_PROFILE:-}" ]; then
    aws --region "$AWS_REGION" --profile "$AWS_PROFILE" "$@"
  else
    aws --region "$AWS_REGION" "$@"
  fi
}

ssh_cmd() {
  local args=(-p "$SSH_PORT" -o StrictHostKeyChecking=accept-new)
  [ -n "${SSH_KEY:-}" ] && args+=(-i "$SSH_KEY")
  ssh "${args[@]}" "${SSH_USER}@${SSH_HOST}" "$@"
}

# -------------------------------------------------------- node toolchain ----

# Next.js 16 needs Node >= 20, but pnpm 11 needs >= 22.13 — and below that it
# dies inside its own bundle with `ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite`
# (node:sqlite landed in 22.13) instead of naming the real problem. Enforce the
# stricter bound.
node_is_current() {
  local v major minor
  command -v node >/dev/null 2>&1 || return 1
  v="$(node -p 'process.versions.node' 2>/dev/null)" || return 1
  major="${v%%.*}"
  minor="$(printf '%s' "$v" | cut -d. -f2)"
  [ "$major" -gt 22 ] && return 0
  [ "$major" -eq 22 ] && [ "$minor" -ge 13 ] && return 0
  return 1
}

# Switch Node via nvm rather than making the caller remember `nvm use`. nvm is a
# shell function, so it has to be sourced — it is not on PATH for scripts.
ensure_node() {
  node_is_current && return 0

  local current nvm_sh
  current="$(node -v 2>/dev/null || echo none)"
  nvm_sh="${NVM_DIR:-$HOME/.nvm}/nvm.sh"

  if [ -s "$nvm_sh" ]; then
    info "Node ${current} is too old — switching to $(cat .nvmrc) via nvm…"
    # nvm.sh trips over `set -u` and returns non-zero on benign paths.
    set +eu
    # shellcheck disable=SC1090
    . "$nvm_sh" >/dev/null 2>&1
    nvm use >/dev/null 2>&1 || { nvm install >/dev/null 2>&1; nvm use >/dev/null 2>&1; }
    set -eu
  fi

  node_is_current || die "Node ${current} detected; pnpm 11 requires Node >= 22.13.
       This repo pins the version in .nvmrc, but switching automatically failed.
       Run it yourself, then retry:

         nvm install && nvm use"

  ok "Using node $(node -v)"
}

# After an nvm switch the old `pnpm` shim may be gone or point at the wrong
# Node, so resolve pnpm through corepack when a direct binary is unusable.
# `packageManager` in package.json pins the version either way.
pnpm_cmd() {
  if command -v pnpm >/dev/null 2>&1 && pnpm --version >/dev/null 2>&1; then
    pnpm "$@"
  elif command -v corepack >/dev/null 2>&1; then
    corepack pnpm "$@"
  else
    die "Neither \`pnpm\` nor \`corepack\` is usable. Install pnpm: npm i -g pnpm"
  fi
}

# ------------------------------------------------------- 1. local build ----

cmd_build() {
  step "1/4  Building Next.js standalone bundle locally"

  ensure_node
  dim "node $(node -v) · pnpm $(pnpm_cmd --version)"

  if [ ! -f .env.production ] && [ ! -f .env.production.local ]; then
    warn "No .env.production found. NEXT_PUBLIC_* vars are inlined at BUILD time —"
    warn "without them the client bundle ships with undefined Supabase config."
  fi

  info "Installing dependencies…"
  pnpm_cmd install --frozen-lockfile

  info "Running next build…"
  # Subshell so the export cannot leak into later steps.
  ( export NODE_ENV=production; pnpm_cmd build )

  [ -f .next/standalone/server.js ] || die "Standalone output missing. Is output:'standalone' set in next.config.js?"

  info "Staging build output into ${STAGE_DIR}/ …"
  rm -rf "$STAGE_DIR"
  mkdir -p "$STAGE_DIR/.next"
  # server.js + the traced, minimal node_modules + package.json
  cp -R .next/standalone/. "$STAGE_DIR"/
  # standalone deliberately omits these two; Next expects them at runtime
  cp -R .next/static "$STAGE_DIR/.next/static"
  [ -d public ] && cp -R public "$STAGE_DIR/public"

  # sharp carries host-arch native binaries — the Dockerfile reinstalls it for
  # the target platform, so drop the local copy to avoid shipping arm64 .node
  # files into an amd64 image.
  rm -rf "$STAGE_DIR/node_modules/sharp" "$STAGE_DIR/node_modules/@img"

  ok "Staged $(du -sh "$STAGE_DIR" | cut -f1) in ${STAGE_DIR}/"
}

require_stage() {
  [ -f "$STAGE_DIR/server.js" ] || die "$STAGE_DIR/ is empty or stale. Run: ./scripts/deploy.sh build"
}

# ------------------------------------------------- 2. local docker image ----

cmd_image() {
  step "2/4  Building Docker image for this machine ($(uname -m))"
  need docker
  require_stage
  docker build -t "$LOCAL_IMAGE" -t "${ECR_REPOSITORY}:latest" .
  ok "Built $LOCAL_IMAGE"
  dim "Smoke-test it with: ./scripts/deploy.sh run-local"
}

# --------------------------------------------- 2+3. multi-arch + push ECR ----

ecr_login() {
  info "Logging in to ECR (${REGISTRY})…"
  aws_cli ecr get-login-password | docker login --username AWS --password-stdin "$REGISTRY" >/dev/null
}

# Validate credentials before anything that mutates AWS state. Getting this
# wrong used to surface as a confusing failure *after* the script had already
# tried to create a repository.
aws_preflight() {
  local profiles account

  if [ -n "${AWS_PROFILE:-}" ]; then
    profiles="$(aws configure list-profiles 2>/dev/null || true)"
    if ! printf '%s\n' "$profiles" | grep -qxF "$AWS_PROFILE"; then
      die "AWS profile \"${AWS_PROFILE}\" (set in deploy.config) does not exist.

       Available profiles:
$(printf '%s\n' "$profiles" | sed 's/^/         /')

       Note this is a *profile* name from ~/.aws/config, not an IAM user name.
       Leave AWS_PROFILE=\"\" to use the default profile."
    fi
  fi

  account="$(aws_cli sts get-caller-identity --query Account --output text 2>/dev/null || true)"

  if [ -z "$account" ]; then
    die "Could not authenticate to AWS${AWS_PROFILE:+ with profile \"$AWS_PROFILE\"}.
       Credentials may be missing or expired — try: aws sso login"
  fi

  # Pushing to the wrong account is silent and slow to notice. Refuse instead.
  if [ "$account" != "$AWS_ACCOUNT_ID" ]; then
    die "Credentials resolve to account ${account}, but deploy.config says ${AWS_ACCOUNT_ID}.
       Fix AWS_ACCOUNT_ID, or point AWS_PROFILE at the right account."
  fi

  dim "aws account ${account}${AWS_PROFILE:+ · profile ${AWS_PROFILE}}"
}

cmd_push() {
  step "2+3/4  Building multi-arch image and pushing to ECR"
  need docker
  need aws
  require_stage
  aws_preflight

  if ! aws_cli ecr describe-repositories --repository-names "$ECR_REPOSITORY" >/dev/null 2>&1; then
    info "Repository $ECR_REPOSITORY does not exist — creating it…"
    aws_cli ecr create-repository \
      --repository-name "$ECR_REPOSITORY" \
      --image-scanning-configuration scanOnPush=true >/dev/null
  fi

  ecr_login

  # The default `docker` buildx driver cannot emit multi-platform manifests.
  if ! docker buildx inspect rockship-builder >/dev/null 2>&1; then
    info "Creating buildx builder 'rockship-builder'…"
    docker buildx create --name rockship-builder --driver docker-container --bootstrap >/dev/null
  fi

  info "Platforms: ${PLATFORMS}"
  info "Tags:      ${IMAGE_TAG}, latest"
  docker buildx build \
    --builder rockship-builder \
    --platform "$PLATFORMS" \
    -t "$IMAGE" \
    -t "$IMAGE_LATEST" \
    --push \
    .

  ok "Pushed $IMAGE"
}

# ------------------------------------------------------- 4. ssh release ----

cmd_release() {
  step "4/4  Releasing on ${SSH_USER}@${SSH_HOST}"
  need ssh
  : "${SSH_HOST:?set SSH_HOST in deploy.config}"
  : "${SSH_USER:?set SSH_USER in deploy.config}"
  : "${REMOTE_ENV_FILE:?set REMOTE_ENV_FILE in deploy.config}"

  # The server runs many apps behind nginx-proxy-manager. Publishing a host port
  # would collide with them (and 3000 is already taken), so by default the
  # container only joins DOCKER_NETWORK and exposes 3000 to its siblings; the
  # proxy reaches it as http://CONTAINER_NAME:CONTAINER_PORT.
  local publish_arg="" network_arg=""
  if [ -n "${HOST_PORT:-}" ]; then
    publish_arg="-p ${HOST_PORT}:${CONTAINER_PORT}"
  fi
  if [ -n "${DOCKER_NETWORK:-}" ]; then
    network_arg="--network ${DOCKER_NETWORK}"
  fi
  if [ -z "$publish_arg" ] && [ -z "$network_arg" ]; then
    die "Neither HOST_PORT nor DOCKER_NETWORK is set — nothing could reach the container."
  fi

  # Heredoc is unquoted so these expand HERE, on the laptop; the server only
  # ever sees literal values. No secrets are interpolated — the runtime env
  # comes from REMOTE_ENV_FILE, which already lives on the server.
  ssh_cmd bash -euo pipefail -s <<EOF
    if [ ! -f "${REMOTE_ENV_FILE}" ]; then
      echo "error: ${REMOTE_ENV_FILE} is missing on this server." >&2
      exit 1
    fi

    # A typo here would silently create an isolated network and the proxy would
    # 502 forever, so require that it already exists.
    if [ -n "${DOCKER_NETWORK:-}" ] && ! docker network inspect "${DOCKER_NETWORK:-}" > /dev/null 2>&1; then
      echo "error: docker network '${DOCKER_NETWORK:-}' does not exist on this server." >&2
      docker network ls >&2
      exit 1
    fi

    echo "--> Logging in to ECR"
    aws ecr get-login-password --region "${AWS_REGION}" \
      | docker login --username AWS --password-stdin "${REGISTRY}"

    # Pull BEFORE removing the old container: if the pull fails, the currently
    # running version keeps serving traffic.
    echo "--> Pulling ${IMAGE}"
    docker pull "${IMAGE}"

    echo "--> Removing old container (if any)"
    docker rm -f "${CONTAINER_NAME}" 2>/dev/null || true

    echo "--> Starting ${CONTAINER_NAME}"
    docker run -d \
      --name "${CONTAINER_NAME}" \
      --restart unless-stopped \
      ${network_arg} ${publish_arg} \
      --env-file "${REMOTE_ENV_FILE}" \
      --log-opt max-size=10m \
      --log-opt max-file=3 \
      "${IMAGE}"

    echo "--> Pruning dangling images"
    docker image prune -f > /dev/null

    docker ps --filter "name=${CONTAINER_NAME}" --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'
EOF

  info "Waiting for the container to report healthy…"
  local i state
  for i in $(seq 1 30); do
    state="$(ssh_cmd docker inspect -f '{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo unknown)"
    case "$state" in
      healthy)
        if [ -n "${HOST_PORT:-}" ]; then
          ok "Live: http://${SSH_HOST}:${HOST_PORT}  (${IMAGE_TAG})"
        else
          ok "Healthy on network '${DOCKER_NETWORK}' as ${CONTAINER_NAME}:${CONTAINER_PORT}  (${IMAGE_TAG})"
          dim "Point nginx-proxy-manager at http://${CONTAINER_NAME}:${CONTAINER_PORT}"
        fi
        return 0 ;;
      unhealthy) die "Container is unhealthy. Check: ./scripts/deploy.sh logs" ;;
    esac
    sleep 2
  done
  warn "Health check did not settle within 60s (last state: ${state:-unknown})."
  warn "Inspect with: ./scripts/deploy.sh logs"
}

# ------------------------------------------------------------- helpers ----

cmd_run_local() {
  # HOST_PORT is normally empty (the server publishes nothing), but locally we
  # need a reachable port — fall back to LOCAL_PORT.
  local port="${HOST_PORT:-${LOCAL_PORT:-3000}}"
  step "Running $LOCAL_IMAGE locally on :${port}"
  need docker
  local env_args=()
  if [ -f .env.production.local ]; then
    env_args=(--env-file .env.production.local)
  elif [ -f .env.local ]; then
    env_args=(--env-file .env.local)
  else
    warn "No .env.production.local or .env.local — the app runs without secrets."
  fi
  docker rm -f "${CONTAINER_NAME}-local" >/dev/null 2>&1 || true
  docker run --rm -it \
    --name "${CONTAINER_NAME}-local" \
    -p "${port}:${CONTAINER_PORT}" \
    "${env_args[@]}" \
    "$LOCAL_IMAGE"
}

cmd_logs() {
  step "Logs from ${CONTAINER_NAME} on ${SSH_HOST}"
  ssh_cmd docker logs --tail 200 -f "$CONTAINER_NAME"
}

cmd_all() {
  cmd_build
  cmd_push
  cmd_release
  printf '\n%s✓ Deployed %s to %s%s\n\n' "$C_GREEN$C_BOLD" "$IMAGE_TAG" "$SSH_HOST" "$C_RESET"
}

usage() {
  # Print the header comment block, minus the shebang, as the help text.
  awk 'NR == 1 { next } /^#/ { sub(/^# ?/, ""); print; next } { exit }' "${BASH_SOURCE[0]}"
}

case "${1:-all}" in
  all)       cmd_all ;;
  build)     cmd_build ;;
  image)     cmd_image ;;
  push)      cmd_push ;;
  release)   cmd_release ;;
  run-local) cmd_run_local ;;
  logs)      cmd_logs ;;
  -h|--help|help) usage ;;
  *) usage; die "Unknown command: $1" ;;
esac
