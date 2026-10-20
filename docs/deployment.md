# Deployment

The app ships as a Docker image built from a **host-built** Next.js standalone
bundle. Nothing is compiled inside Docker — the image only packages the output —
which keeps image builds to a few seconds and avoids installing the full
dependency tree in the container.

```
 laptop                                    DOCR                   server
┌──────────────────────────┐            ┌───────┐            ┌──────────────┐
│ 1. bun run build         │            │       │            │              │
│    → .next/standalone    │            │       │            │              │
│    → staged in .deploy/  │            │       │            │              │
│ 2. docker buildx         │──push──▶   │ image │  ──pull──▶ │ docker run   │
│    (amd64 + arm64)       │            │       │            │              │
└──────────────────────────┘            └───────┘            └──────────────┘
```

## Getting access (new developer, start here)

You need two things before you can deploy: a DigitalOcean API token that can
push to the `rockship-temp` container registry, and an SSH key the server
trusts. Neither is in the repo — both are granted by an admin (**@axing**).

### 1. Ask @axing for a registry token

Ask for a DigitalOcean API token with read and write access to the
`rockship-temp` container registry. It starts with `dop_v1_`.

> The token is shown exactly once, at creation. If you lose it, you need a new
> one — it cannot be recovered.

### 2. Keep the token out of files

`scripts/deploy.sh` reads the token from the environment, never from the repo.
Export it in the shell you deploy from:

```bash
export REGISTRY_TOKEN=dop_v1_...
```

DigitalOcean takes the token as both username and password, so `REGISTRY_USER`
defaults to it. Check it works:

```bash
printf '%s' "$REGISTRY_TOKEN" \
  | docker login registry.digitalocean.com -u "$REGISTRY_TOKEN" --password-stdin
```

`Login Succeeded` means the push will authenticate. The server needs no token of
its own: `release` forwards yours for the one pull and deletes it afterwards.

### 3. Generate an SSH key

Make a key dedicated to this server rather than reusing a personal one:

```bash
ssh-keygen -t ed25519 -C "your.name@rockship.co" -f ~/.ssh/rockship-profile
```

Press Enter twice to skip the passphrase, or set one and add the key to your
agent (`ssh-add ~/.ssh/rockship-profile`).

This produces two files:

| File | What it is | Share it? |
|---|---|---|
| `~/.ssh/rockship-profile` | **Private key** | **Never.** Anyone holding it can log in as you |
| `~/.ssh/rockship-profile.pub` | Public key | Yes — this is what you send |

> Older guides say `ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa`. That still works
> and the server accepts it; ed25519 is just shorter and faster. Use rsa only if
> something rejects ed25519.

### 4. Send the **public** key to @axing

```bash
cat ~/.ssh/rockship-profile.pub | pbcopy    # macOS: copies to clipboard
```

Paste that into your message to @axing. It's a single line starting with
`ssh-ed25519 AAAA...` and ending with your email. It is safe to send over Slack —
publishing a public key grants nothing on its own.

<details>
<summary>For @axing: installing it on the server</summary>

```bash
ssh ubuntu@13.251.100.184
echo "ssh-ed25519 AAAA... their.name@rockship.co" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Append — don't overwrite, or you'll lock out everyone else.
</details>

### 5. Test the connection

```bash
ssh -i ~/.ssh/rockship-profile ubuntu@13.251.100.184 'docker ps --format "{{.Names}}"'
```

The first connection asks you to trust the host key — type `yes`. A list of
running containers means you're in.

### 6. Fill in `deploy.config`

```bash
cp deploy.config.example deploy.config    # gitignored; never commit it
```

Set the three values specific to you and the server:

```bash
SSH_KEY="$HOME/.ssh/rockship-profile"     # from step 3 — the PRIVATE key
SSH_HOST="13.251.100.184"
SSH_USER="ubuntu"
```

Leave the rest at their defaults. In particular `HOST_PORT=""` is deliberate:
the server's host port 3000 already belongs to `prod-rockship-fe-1`, so this
container publishes nothing and is reached over the `nginx` Docker network
instead, as `http://rockship-profile:3000`. Setting `HOST_PORT` reintroduces the
collision.

Confirm everything resolves before deploying anything:

```bash
./scripts/deploy.sh build
```

### Access troubleshooting

| Error | Fix |
|---|---|
| `set REGISTRY_TOKEN ... in the environment` | `export REGISTRY_TOKEN=dop_v1_...` in the shell you deploy from |
| `unauthorized: authentication required` on login or pull | The token is wrong, revoked, or lacks access to `rockship-temp` |
| `Permissions 0644 for '...' are too open` | `chmod 600 ~/.ssh/rockship-profile` — SSH refuses world-readable private keys |
| `Permission denied (publickey)` | @axing hasn't installed your key yet, or `SSH_KEY` points at the `.pub` instead of the private key |
| `Host key verification failed` | The server was rebuilt. Remove the stale entry: `ssh-keygen -R 13.251.100.184` |

## One-time setup

### Local

```bash
cp deploy.config.example deploy.config   # then fill it in (gitignored)
export REGISTRY_TOKEN=dop_v1_...         # see "Getting access"
```

Install bun if you don't have it (`curl -fsSL https://bun.sh/install | bash`).
Node is not needed on the build machine — bun both installs dependencies and
runs the Next.js build. The required bun version is pinned in `.bun-version`;
the build step refuses to run on an older one.

Create `.env.production` for **build-time** values. Anything named
`NEXT_PUBLIC_*` is inlined into the client bundle when `next build` runs on your
laptop — it cannot be supplied later on the server:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Server

Install Docker, then create the **runtime** env file. The server needs no
registry credentials: each release pulls with a token forwarded for that pull
alone. This
file is never uploaded by the deploy script — provision it once, by hand:

```bash
sudo mkdir -p /etc/rockship-profile
sudo nano /etc/rockship-profile/.env.production
sudo chmod 600 /etc/rockship-profile/.env.production
```

See `.env.server.example` for the full annotated list. In short:

```
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=...
RESEND_API_KEY=...
```

Do **not** put `NEXT_PUBLIC_*` variables here. Next.js compiles those into the
bundle during `next build`, so a runtime value is silently ignored.

### Which variable goes where

| Variable | Where | Why |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | build | Inlined into the bundle |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | build | Inlined; public by design (relies on RLS) |
| `NEXT_PUBLIC_GROQ_API_KEY` | build | Inlined — **shipped to the browser**, see below |
| `NEXT_PUBLIC_GEMINI_API_KEY` | build | Inlined — **shipped to the browser**, see below |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Bypasses RLS; server-only |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | server | `/admin` credentials |
| `RESEND_API_KEY` | server | Contact form; 503 without it |

**Every one of these is optional.** The app boots and serves every page with an
empty env file: Supabase queries short-circuit to empty, the assistants disable
themselves, and the contact form returns 503. Placeholder values (`your-project-ref`,
`xxxx`, `example.com`) count as unconfigured, so a half-filled `.env` degrades
the same way instead of failing DNS at build time.

The build and CI both warn when Supabase is unset or still a placeholder, but
neither fails. That is worth remembering when debugging: a healthy container
does not mean a correctly configured one — check the build log for
`Supabase is not configured` if the blog is unexpectedly empty.

## Deploying

```bash
bun run deploy       # build → push → release
```

Or one step at a time:

| Command | Step | What it does |
|---|---|---|
| `./scripts/deploy.sh build` | 1 | `bun install` + `next build`, stages output into `.deploy/` |
| `./scripts/deploy.sh image` | 2 | Builds the image for *your* arch only, for local testing |
| `./scripts/deploy.sh push` | 2+3 | Multi-arch `buildx` build, pushes to the registry |
| `./scripts/deploy.sh release` | 4 | SSH: pull, remove old container, run new one, wait for healthy |
| `./scripts/deploy.sh run-local` | — | Runs the local image on `:3000` to smoke-test |
| `./scripts/deploy.sh logs` | — | Tails container logs on the server |

Images are tagged with the short git SHA (`-dirty` if you have uncommitted
changes) and `latest`. Override with `IMAGE_TAG=v1.2.3 ./scripts/deploy.sh`.

### Testing the image before shipping

```bash
./scripts/deploy.sh build
./scripts/deploy.sh image
./scripts/deploy.sh run-local     # → http://localhost:3000
```

### Rollback

Every SHA tag stays in the registry, so redeploy any previous build without rebuilding:

```bash
IMAGE_TAG=<old-sha> ./scripts/deploy.sh release
```

## Known security issues

Two pre-existing problems worth fixing before this is publicly reachable. Both
predate the Docker setup.

**Exposed AI keys.** `services/groqService.ts` and `services/geminiService.ts`
run in the browser (the Groq SDK is constructed with `dangerouslyAllowBrowser`),
reading `NEXT_PUBLIC_GROQ_API_KEY` and `NEXT_PUBLIC_GEMINI_API_KEY`. The
`NEXT_PUBLIC_` prefix inlines them into a client chunk, so any visitor can read
them from devtools and spend your quota. The fix is to proxy both through a
server route — `app/api/chat/route.ts` already exists as a placeholder and looks
intended for exactly this — and drop the `NEXT_PUBLIC_` prefix.

**Forgeable admin session.** `actions/auth.ts` sets the session cookie to
`base64(username:timestamp:password)`, and `proxy.ts` validates it by base64
decoding and comparing only the username. Base64 is encoding, not signing, so
anyone can set `admin_session` to `base64("admin:0:")` and reach `/admin` without
knowing `ADMIN_PASSWORD`. It needs a signed token (HMAC or JWT) with the
signature verified on every request.

## Deploying from GitHub Actions

`.github/workflows/deploy.yml` runs on every push to `main` and on manual
dispatch. It does not reimplement the deploy — it writes a `deploy.config` from
repo variables and then calls the same `scripts/deploy.sh`, so CI and your
laptop cannot drift apart.

> Note: the existing `ci-cd.yml` (Vercel) still runs alongside this. Both deploy
> on pushes to `main`, to two different places.

### Self-hosted runner requirements

All workflows run on `runs-on: self-hosted`, so the runner machine — not GitHub —
must provide the toolchain. Register a runner with the default `self-hosted`
label (add more labels and list them as `runs-on: [self-hosted, linux, x64]` if
you run several).

The deploy needs these on the runner's PATH:

| Tool | Used for | Check |
|---|---|---|
| `docker` + `buildx` | building and pushing the image | `docker buildx version` |
| `ssh`, `ssh-keyscan` | releasing on the server | `ssh -V` |
| `git` | checkout | `git --version` |

`bun` is installed per-run by `oven-sh/setup-bun`, so it does not need to be
preinstalled. QEMU for the arm64 half of the multi-arch build is set up by
`docker/setup-qemu-action`, which needs a working Docker daemon.

The runner user must be able to talk to Docker without `sudo` — normally by
being in the `docker` group.

**A self-hosted runner persists between jobs.** Two consequences the workflows
already account for, worth preserving in any edit:

- SSH material is written to `$RUNNER_TEMP`, never `~/.ssh`. The shared `~/.ssh`
  belongs to every job on the box; writing the deploy key there would expose it
  to other workflows, and the cleanup step would delete a `known_hosts` other
  jobs rely on. `SSH_KNOWN_HOSTS_FILE` in `deploy.config` points `ssh` at the
  job-scoped copy.
- Docker images accumulate. `deploy.sh` prunes dangling images on the *server*,
  not on the runner, so schedule a `docker system prune` there if disk grows.

Do not register the runner on the deploy target (`13.251.100.184`) unless you
intend it: image builds are CPU- and disk-heavy, and that box already runs
sixteen production containers.

### Repository variables

Settings → Secrets and variables → Actions → **Variables** tab. These are not
secret; they are the same values as your local `deploy.config`.

**Required — the workflow fails immediately without them:**

| Variable | Value for this project |
|---|---|
| `REGISTRY` | `registry.digitalocean.com/rockship-temp` |
| `SSH_HOST` | `13.251.100.184` |
| `SSH_USER` | `ubuntu` |
| `REMOTE_ENV_FILE` | `/home/ubuntu/rockship-profile/.env.production` |

**Optional — sensible defaults if unset:**

| Variable | Default | Set it only if |
|---|---|---|
| `IMAGE_NAME` | `rockship-profile` | the registry repository is renamed |
| `DOCKER_NETWORK` | `nginx` | the proxy network is renamed |
| `CONTAINER_NAME` | `rockship-profile` | you rename the container (nginx-proxy-manager routes to this name) |
| `CONTAINER_PORT` | `3000` | the app listens elsewhere |
| `PLATFORMS` | `linux/amd64,linux/arm64` | you want a single-arch build |
| `SSH_PORT` | `22` | sshd is on another port |
| `HOST_PORT` | *(empty)* | **leave unset** — see below |

Do not set `HOST_PORT`. Host port 3000 on that server belongs to
`prod-rockship-fe-1`; the container is reached over `DOCKER_NETWORK` instead, and
publishing a port recreates the collision.

### Repository secrets

Same page, **Secrets** tab.

**Required:**

| Secret | How to get it |
|---|---|
| `REGISTRY_TOKEN` | DigitalOcean API token with read and write access to `rockship-temp` — see "Registry token for CI" below |
| `SSH_PRIVATE_KEY` | Contents of the private key whose public half is in the server's `~/.ssh/authorized_keys`. Paste the **whole file**, including the `-----BEGIN...` and `-----END...` lines |

**Recommended:**

| Secret | How to get it |
|---|---|
| `REGISTRY_USER` | Leave unset: it defaults to the token, which is what DigitalOcean expects |
| `SSH_KNOWN_HOSTS` | `ssh-keyscan -p 22 13.251.100.184`. Without it the workflow trusts the host key on first use and logs a warning — that window is MITM-able |

**Optional — all four are build-time values compiled into the client bundle:**

| Secret | Effect if unset |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Blog renders empty; rest of the site unaffected |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | As above — both are needed together |
| `NEXT_PUBLIC_GROQ_API_KEY` | Groq assistant disables itself |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Gemini assistant disables itself |

The workflow warns but does not fail when these are missing or still a
placeholder. Note the two AI keys reach the browser — see "Known security
issues".

Server-only secrets (`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_USERNAME`,
`ADMIN_PASSWORD`, `RESEND_API_KEY`) are **not** GitHub secrets — they live only
in `REMOTE_ENV_FILE` on the server and are never seen by CI.

### Setting them from the CLI

```bash
gh auth login
REPO=Rockship-Team/rockship-profile

gh variable set REGISTRY        --repo "$REPO" --body "registry.digitalocean.com/rockship-temp"
gh variable set IMAGE_NAME      --repo "$REPO" --body "rockship-profile"
gh variable set SSH_HOST        --repo "$REPO" --body "13.251.100.184"
gh variable set SSH_USER        --repo "$REPO" --body "ubuntu"
gh variable set REMOTE_ENV_FILE --repo "$REPO" --body "/home/ubuntu/rockship-profile/.env.production"

gh secret set REGISTRY_TOKEN      --repo "$REPO"     # paste the dop_v1_ token
gh secret set SSH_PRIVATE_KEY     --repo "$REPO" < ~/Desktop/aws/rockitflow
ssh-keyscan -p 22 13.251.100.184 2>/dev/null \
  | gh secret set SSH_KNOWN_HOSTS --repo "$REPO"

# Optional
gh secret set NEXT_PUBLIC_SUPABASE_URL      --repo "$REPO"
gh secret set NEXT_PUBLIC_SUPABASE_ANON_KEY --repo "$REPO"
```

The workflow targets `environment: production`. If that environment does not
exist yet, create it under Settings → Environments (add required reviewers there
if you want deploys to wait for approval).

### Registry token for CI

CI authenticates with a DigitalOcean API token stored as the `REGISTRY_TOKEN`
secret. Create a token dedicated to this repository (DigitalOcean → API →
Tokens → Generate New Token, custom scopes, `registry` read and write) rather
than reusing a personal one, so it can be revoked without disturbing anything
else.

The same token covers the pull on the server: `deploy.sh release` writes it into
a temporary docker config on the server for that one pull and deletes it when
the release ends. Nothing on the server has to be rotated when the token is.

**Rotating.** Generate a new token, update the secret, then delete the old token
in the DigitalOcean console.

**Registry space.** Every deploy pushes a new multi-arch image and nothing
deletes old tags. The registry is shared with other projects and its plan caps
storage, so delete old `rockship-profile` tags and run garbage collection from
time to time (DigitalOcean → Container Registry → Settings).

### Rollback from the Actions tab

Run the workflow manually and set **image_tag** to a previously pushed tag. The
build and push steps are skipped entirely; only the release step runs.

CI tags images with the full commit SHA (`github.sha`), while local deploys use
the short SHA. Both land in the same repository —
`doctl registry repository list-tags rockship-profile` shows everything
available to roll back to.

## How it fits together

**`output: 'standalone'`** (next.config.js) makes Next emit `.next/standalone/`
— `server.js` plus only the `node_modules` actually reached by the server. The
build step also copies in the two things standalone deliberately omits,
`.next/static` and `public/`.

**The runtime image is `oven/bun:alpine`** — there is no Node.js in it. The
container runs `bun run server.js` as the unprivileged `bun` user. (`node` does
resolve inside the image, but it is bun's own compatibility shim, not Node.)

**Not a compiled binary.** `bun build --compile` on the standalone entrypoint
produces a binary that immediately fails: Next's `server.js` calls
`process.chdir(__dirname)`, which inside a compiled binary is the virtual path
`/$bunfs/root/` and raises ENOENT. Even patched, `next-server` reads the
`.next/server/**` chunks from disk per request, so `.next/` and `public/` have to
ship as real files. A single self-contained executable isn't achievable for a
Next.js server; the image is the unit of deployment instead.

**sharp** is the one native dependency. Its binaries are platform-specific, so
the build step deletes the host's copy from `.deploy/` and the Dockerfile
reinstalls it in a separate stage where the target platform is known. Without it
`next/image` does not fail loudly — it serves the original file. A 452 KB PNG
comes back as 452 KB instead of a 22 KB WebP, still with HTTP 200.

**Multi-arch** builds require the `docker-container` buildx driver (the default
`docker` driver cannot produce multi-platform manifests). The script creates a
builder named `rockship-builder` on first run. Because a multi-arch manifest
can't be loaded into the local daemon, `push` builds and pushes in one step;
use `image` when you want something you can actually run locally.

**Zero-ish downtime.** `release` pulls the new image *before* removing the old
container, so a failed pull leaves the running version serving traffic. The gap
between `docker rm` and the new container passing its health check is a few
seconds. If you need true zero-downtime, put nginx or an ALB in front and run
two containers on alternating ports.

## Troubleshooting

**`bun X is older than the pinned Y`** — run `bun upgrade`. The pin exists
because bun 1.1.x cannot run the Next.js build: it fails with
`worker_threads.Worker option "stdout" is not yet implemented in Bun`.

**`You are using Node.js 16.x. For Next.js, Node.js version ">=20.9.0" is
required`** — this appears if you run `bun run build` by hand. Plain `bun run`
honours the `next` shebang and delegates to whatever `node` is on your PATH. The
deploy script passes `--bun` to force the bun runtime, sidestepping Node
entirely; do the same by hand with `bun --bun run build`.

**A dependency's install script didn't run** — bun only runs postinstall scripts
for packages listed in `trustedDependencies` in `package.json`. `sharp`,
`unrs-resolver` and `@tsparticles/engine` are already listed; add new native
dependencies there.

**Container is unhealthy** — `./scripts/deploy.sh logs`. Most often the
`--env-file` on the server is missing a variable the app reads at boot.

**Health check never settles** — the app listens on `HOSTNAME=0.0.0.0` inside the
container (set in the Dockerfile). If you override `PORT`, `CONTAINER_PORT` in
`deploy.config` must match.
