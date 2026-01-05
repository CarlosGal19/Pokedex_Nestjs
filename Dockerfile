# NODE VERSION
FROM node:lts-alpine3.22 AS deps

# GENERATE IMAGE JUST WITH INSTALLED DEPENDENCIES
RUN apk add --no-cache libc6-compat
WORKDIR /app

## ENABLE pnpm
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# GENERATES BUILD IMAGE WITH NEW OR EXISTENT DEPENDENCIES
FROM node:lts-alpine3.22 AS builder

WORKDIR /app
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# PRODUCTION IMAGE
FROM node:lts-alpine3.22 AS runner

WORKDIR /usr/src/app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

CMD [ "node", "dist/main" ]
