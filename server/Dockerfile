# # Dockerfile for Server
# FROM node:14

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # Expose the port (change if necessary)
# EXPOSE 5000

# # Command to run the application
# CMD ["npm", "start"]

# Server Dockerfile
FROM node:16

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 for the server
EXPOSE 5000

# Start the server using `npm run dev`
CMD ["npm", "run", "dev"]
