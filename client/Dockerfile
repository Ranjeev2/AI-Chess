# Use the official Node.js image as the base image
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Install 'serve' to serve the React app
RUN npm install -g serve

# Expose port 3000 (React app will be served on this port now)
EXPOSE 3000

# Command to serve the built React app
CMD ["serve", "-s", "build", "-l", "3000"]
