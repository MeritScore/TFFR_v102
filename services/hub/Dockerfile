# Dockerfile for TFFR Hub Backend

# Use official lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for caching
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy application source code
COPY . .

# Expose the API port
EXPOSE 8080

# Environment variables (Defaults, overridden by Cloud Run)
ENV PORT=8080
ENV DATABASE_MODE=FIRESTORE

# Start the server
CMD [ "npm", "start" ]
