# -------------------------
#   Builder Stage
# -------------------------
FROM node:18 AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy application source
COPY . .

# -------------------------
#   Runtime Stage (non-root)
# -------------------------
FROM node:18-alpine AS runtime

ARG APP_VERSION=dev
ARG BUILD_SHA=unknown

ENV APP_VERSION=$APP_VERSION
ENV BUILD_SHA=$BUILD_SHA

WORKDIR /app

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./


# Install ONLY production dependencies
RUN npm install --omit=dev --omit=production && npm ci --only=production

# Copy application source from builder
COPY --from=builder /app /app

# Change ownership of app directory to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 5001
CMD ["node", "src/app.js"]