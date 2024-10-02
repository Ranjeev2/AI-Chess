# # Use the official Nginx image
# FROM nginx:alpine

# # Copy the HTML file to the Nginx html directory
# COPY index.html /usr/share/nginx/html/

# # Expose port 80 to access the web server
# EXPOSE 80
# Stage 1: Build and run the server
FROM node:alpine AS server

# Set working directory for the server
WORKDIR /app/server

# Copy the server package.json and package-lock.json files
COPY ./server/package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of the server files
COPY ./server .

# Set the environment to development
ENV NODE_ENV=development

# Expose server port 5000
EXPOSE 5000

# Command to run the server
CMD ["npm", "run", "dev"]

# Stage 2: Build and run the client
FROM node:alpine AS client

# Set working directory for the client
WORKDIR /app/client

# Copy the client package.json and package-lock.json files
COPY ./client/package*.json ./

# Install client dependencies
RUN npm install

# Copy the rest of the client files
COPY ./client .

# Expose client port 3000
EXPOSE 3000

# Command to run the client
CMD ["npm", "start"]
