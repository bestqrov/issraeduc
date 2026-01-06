FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install root dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application (Backend + Frontend)
# The build script runs: tsc && cd frontend && npm install && npm run build
RUN npm run build

# Expose the backend port
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start"]
