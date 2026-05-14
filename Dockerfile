# Build the React client and server for production in a containerized image
FROM node:20-slim AS builder
WORKDIR /app

# Install server dependencies and client dependencies separately
COPY server/package*.json ./server/
COPY client/package*.json ./client/
RUN cd server && npm install --production
RUN cd client && npm install

# Copy source code and build client
COPY server ./server
COPY client ./client
RUN cd client && npm run build

# Final runtime image
FROM node:20-slim AS runtime
WORKDIR /app
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/build ./client/build
WORKDIR /app/server
EXPOSE 5001
ENV NODE_ENV=production
CMD ["node", "index.js"]
