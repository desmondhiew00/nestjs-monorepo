# Use Node.js 20 Alpine as the base image
FROM node:20-alpine AS build

# Install necessary build tools
RUN apk add --no-cache python3 make g++

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Generate Prisma client
RUN npm run prisma:generate

# Build the application
RUN npm run build admin-api

# Start a new stage for a smaller final image
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Run the application
CMD ["node", "dist/apps/admin-api/main.js"]