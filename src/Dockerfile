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
#   Runtime Stage
# -------------------------
FROM node:18-alpine AS runtime

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev

# Copy application source from builder
COPY --from=builder /app /app

# Expose port
EXPOSE 5001

# Start app
CMD ["node", "src/app.js"]
