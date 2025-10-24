# Build stage - Using specific Node version for stability
FROM node:18.20.2-alpine AS build

WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Clear any existing installations and cache
RUN rm -rf node_modules package-lock.json || true

# Install dependencies with multiple fallback strategies
RUN npm install --legacy-peer-deps --force || \
    (npm cache clean --force && npm install --legacy-peer-deps) || \
    (rm -rf node_modules && npm install --legacy-peer-deps --no-optional)

# Copy application source
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:1.25-alpine

# Install curl for healthchecks
RUN apk add --no-cache curl

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/*

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create nginx cache directories
RUN mkdir -p /var/cache/nginx/client_temp && \
    mkdir -p /var/cache/nginx/proxy_temp && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]