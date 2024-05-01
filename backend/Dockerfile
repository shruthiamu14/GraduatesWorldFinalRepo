# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app/backend
WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application
COPY backend/ .

# Expose port 5000 (adjust if your application listens on a different port)
EXPOSE 5000

# Define the command to run the app
CMD [ "node", "server.js" ]