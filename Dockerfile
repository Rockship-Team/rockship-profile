# syntax=docker/dockerfile:1.7
#
# Runtime-only image, executed by bun — there is no Node.js in it.
#
# Nothing is compiled here. `./scripts/deploy.sh build` runs the Next.js build on
# the host with bun and stages `.next/standalone` (plus `.next/static` and
# `public/`) into .deploy/. This image just packages that output and runs it.
#
# Why not a single `bun build --compile` binary: Next's standalone entrypoint
# calls `process.chdir(__dirname)`, which inside a compiled binary resolves to
# the virtual path /$bunfs/root/ and fails with ENOENT. Even if that were
# patched, `next-server` loads the `.next/server/**` chunks from disk at request
# time, so `.next/` and `public/` must ship as real files regardless — a
# genuinely self-contained executable is not achievable for a Next.js server.
#
# sharp is the one exception to "nothing is compiled here": its binaries are
# platform-specific, so the staging step strips the host's copy and it is
# reinstalled below, where the target platform is known. Without it Next silently
# serves originals instead of optimized images — a 20x payload regression that
# still returns HTTP 200.

FROM oven/bun:1.3.14-alpine AS sharp
WORKDIR /sharp
RUN echo '{}' > package.json \
 && bun add --trust sharp@0.34.5

FROM oven/bun:1.3.14-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# oven/bun:alpine already ships an unprivileged `bun` user (uid 1000) and wget.
COPY --chown=bun:bun .deploy/ ./
COPY --from=sharp --chown=bun:bun /sharp/node_modules/ ./node_modules/

USER bun

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/api/health" > /dev/null || exit 1

CMD ["bun", "run", "server.js"]
