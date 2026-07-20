# Deployment

The app ships as a Docker image built from a **host-built** Next.js standalone
bundle. Nothing is compiled inside Docker — the image only packages the output —
which keeps image builds to a few seconds and avoids installing the full
dependency tree in the container.

```
 laptop                                    ECR                    server
┌──────────────────────────┐            ┌───────┐            ┌──────────────┐
│ 1. pnpm build            │            │       │            │              │
│    → .next/standalone    │            │       │            │              │
│    → staged in .deploy/  │            │       │            │              │
│ 2. docker buildx         │──push──▶   │ image │  ──pull──▶ │ docker run   │
│    (amd64 + arm64)       │            │       │            │              │
└──────────────────────────┘            └───────┘            └──────────────┘
```

## One-time setup

### Local

```bash
cp deploy.config.example deploy.config   # then fill it in (gitignored)
aws sso login                            # or however you authenticate
```

Node is handled for you: the build step reads `.nvmrc` and switches via nvm if
your shell is on an older version.

Create `.env.production` for **build-time** values. Anything named
`NEXT_PUBLIC_*` is inlined into the client bundle when `next build` runs on your
laptop — it cannot be supplied later on the server:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Server

Install Docker and the AWS CLI, give the instance an IAM role with
`AmazonEC2ContainerRegistryReadOnly`, then create the **runtime** env file. This
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

Nothing is required for the app to boot — Supabase queries return empty, the
assistants disable themselves, and the contact form 503s. It will start and
serve pages with an empty env file, which is worth knowing when debugging: a
healthy container does not mean a correctly configured one.

## Deploying

```bash
pnpm deploy          # build → push → release
```

Or one step at a time:

| Command | Step | What it does |
|---|---|---|
| `./scripts/deploy.sh build` | 1 | `pnpm install` + `next build`, stages output into `.deploy/` |
| `./scripts/deploy.sh image` | 2 | Builds the image for *your* arch only, for local testing |
| `./scripts/deploy.sh push` | 2+3 | Multi-arch `buildx` build, pushes to ECR |
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

Every SHA tag stays in ECR, so redeploy any previous build without rebuilding:

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

`.github/workflows/deploy-ecr.yml` runs on every push to `main` and on manual
dispatch. It does not reimplement the deploy — it writes a `deploy.config` from
repo variables and then calls the same `scripts/deploy.sh`, so CI and your
laptop cannot drift apart.

> Note: the existing `ci-cd.yml` (Vercel) still runs alongside this. Both deploy
> on pushes to `main`, to two different places.

### Repository variables

Settings → Secrets and variables → Actions → **Variables**:

| Variable | Example |
|---|---|
| `AWS_REGION` | `ap-southeast-1` |
| `AWS_ACCOUNT_ID` | `123456789012` |
| `ECR_REPOSITORY` | `rockship-profile` |
| `SSH_HOST` | `1.2.3.4` |
| `SSH_USER` | `ubuntu` |
| `REMOTE_ENV_FILE` | `/etc/rockship-profile/.env.production` |

Optional, with defaults: `PLATFORMS`, `SSH_PORT`, `CONTAINER_NAME`, `HOST_PORT`,
`CONTAINER_PORT`.

### Repository secrets

| Secret | Purpose |
|---|---|
| `AWS_DEPLOY_ROLE_ARN` | IAM role the runner assumes via OIDC |
| `SSH_PRIVATE_KEY` | Private key for `SSH_USER@SSH_HOST` |
| `SSH_KNOWN_HOSTS` | Output of `ssh-keyscan <host>`. Strongly recommended — without it the workflow trusts the host key on first use and logs a warning |
| `NEXT_PUBLIC_SUPABASE_URL` | Inlined into the client bundle at build time |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Inlined into the client bundle at build time |

Server-only secrets (`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`,
`RESEND_API_KEY`, `GROQ_API_KEY`) are **not** GitHub secrets — they live only in
`REMOTE_ENV_FILE` on the server and are never seen by CI.

### One-time AWS OIDC setup

Register GitHub as an OIDC provider (once per account):

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

Create a role trusted by this repo only — note the `sub` condition pins it to
`main`, so a branch or fork cannot assume it:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
      "StringLike": { "token.actions.githubusercontent.com:sub": "repo:<ORG>/<REPO>:ref:refs/heads/main" }
    }
  }]
}
```

Attach a policy allowing `ecr:GetAuthorizationToken` plus push access to the one
repository (`ecr:BatchCheckLayerAvailability`, `ecr:CompleteLayerUpload`,
`ecr:InitiateLayerUpload`, `ecr:PutImage`, `ecr:UploadLayerPart`,
`ecr:DescribeRepositories`, `ecr:CreateRepository`), then put the role ARN in
`AWS_DEPLOY_ROLE_ARN`.

If you add a `production` environment with required reviewers, deploys will wait
for approval — the workflow already targets `environment: production`.

### Rollback from the Actions tab

Run the workflow manually and set **image_tag** to a previously pushed tag. The
build and push steps are skipped entirely; only the release step runs.

CI tags images with the full commit SHA (`github.sha`), while local deploys use
the short SHA. Both land in the same repository — `aws ecr list-images
--repository-name rockship-profile` shows everything available to roll back to.

## How it fits together

**`output: 'standalone'`** (next.config.js) makes Next emit `.next/standalone/`
— `server.js` plus only the `node_modules` actually reached by the server. The
build step also copies in the two things standalone deliberately omits,
`.next/static` and `public/`.

**sharp** is the one native dependency. Its binaries are platform-specific, so
the build step deletes the host's copy from `.deploy/` and the Dockerfile
reinstalls it in a separate stage where the target platform is known. Without
this, an arm64 laptop would ship arm64 `.node` files into an amd64 image and
`next/image` would fail at runtime.

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

**`ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite`** or
**`ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`** — both mean the wrong Node version.
pnpm 11 requires Node **>= 22.13** and crashes inside its own bundle rather than
saying so.

The build step handles this: it detects an old Node, sources nvm and switches to
the `.nvmrc` version automatically. You should only see the error if nvm is not
installed, in which case install Node >= 22.13 by whatever means you prefer.

Note this only applies to the deploy script. Running `pnpm dev` by hand still
needs the right Node in your shell — `nvm use`.

**`ERR_PNPM_IGNORED_BUILDS`** — a new native dependency needs approval. Add it to
`allowBuilds` in `pnpm-workspace.yaml`.

**Container is unhealthy** — `./scripts/deploy.sh logs`. Most often the
`--env-file` on the server is missing a variable the app reads at boot.

**Health check never settles** — the app listens on `HOSTNAME=0.0.0.0` inside the
container (set in the Dockerfile). If you override `PORT`, `CONTAINER_PORT` in
`deploy.config` must match.
