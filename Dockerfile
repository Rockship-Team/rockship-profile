# syntax=docker/dockerfile:1.7
#
# Runtime-only image. Nothing is compiled here: the Next.js standalone bundle is
# built on the host by `./scripts/deploy.sh build`, which stages the result into
# .deploy/. This image just packages that output.
#
# The one exception is sharp, whose native binaries are platform-specific. The
# host-built bundle carries the host's architecture, so the staging step strips
# sharp out and it is reinstalled here, where the target platform is known.

FROM node:22-alpine AS sharp
WORKDIR /sharp
RUN npm init -y > /dev/null \
 && npm install --omit=dev --no-audit --no-fund sharp@0.34.5

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN apk add --no-cache libc6-compat wget

# node:alpine already ships an unprivileged `node` user (uid 1000).
COPY --chown=node:node .deploy/ ./
COPY --from=sharp --chown=node:node /sharp/node_modules/ ./node_modules/

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/api/health" > /dev/null || exit 1

CMD ["node", "server.js"]
