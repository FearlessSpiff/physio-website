# Stage 1: Build the Vue frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
# VITE_POCKETBASE_URL is intentionally left unset — the built app
# falls back to window.location.origin at runtime (same origin as PocketBase).
RUN npm run build

# Stage 2: Download PocketBase binary
FROM alpine:3.19 AS pb-downloader
ARG PB_VERSION=0.22.14
ARG TARGETARCH=amd64
RUN apk add --no-cache curl unzip && \
    ARCH=$([ "$TARGETARCH" = "arm64" ] && echo "arm64" || echo "amd64") && \
    curl -fL -o /tmp/pb.zip \
      "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${ARCH}.zip" && \
    unzip /tmp/pb.zip pocketbase -d /tmp/pb && \
    chmod +x /tmp/pb/pocketbase

# Stage 3: Final image
FROM alpine:3.19
RUN apk add --no-cache ca-certificates

# PocketBase binary
COPY --from=pb-downloader /tmp/pb/pocketbase /pb/pocketbase

# Migrations run automatically on startup
COPY pocketbase/pb_migrations /pb/pb_migrations

# Built frontend — PocketBase serves pb_public/ as static files
COPY --from=frontend-builder /app/dist /pb/pb_public

WORKDIR /pb
VOLUME ["/pb/pb_data"]
EXPOSE 8090

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]
