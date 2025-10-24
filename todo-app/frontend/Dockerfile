# Build stage
FROM node:18-bullseye AS build

WORKDIR /app

# ✅ Ensure correct Rollup build on Linux
ENV ROLLUP_SKIP_NODE_UPDATE=true
ENV ROLLUP_SKIP_NATIVE_BUILD=true

# Copy package files
COPY package*.json ./

# ✅ Clean, consistent install
RUN npm ci --no-optional

# Copy full source
COPY . .

# ✅ Build frontend
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy built app to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration if you have it (otherwise remove this)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
