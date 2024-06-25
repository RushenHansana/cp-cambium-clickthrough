# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the server package.json and install dependencies
COPY server/package.json ./server/
RUN cd server && npm install

# Copy the client package.json and install dependencies
COPY client/package.json ./client/
RUN cd client && npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN cd client && npm run build

# Expose the port the app runs on
EXPOSE 80

# Start the server
CMD ["npm", "start"]
