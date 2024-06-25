# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the client package.json and install dependencies
COPY client/package.json ./client/

WORKDIR /app/client
RUN npm install

WORKDIR /app
# Copy the server package.json and install dependencies
COPY server/package.json ./server/

WORKDIR /app/server
RUN npm install

WORKDIR /app
# Copy the entire project to the working directory
COPY . .

# Build the React app
WORKDIR /app/client
RUN npm run build


WORKDIR /app/server
# Expose the port the app runs on
EXPOSE 80

# Start the server
CMD ["npm", "start"]
