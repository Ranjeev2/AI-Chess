# # Use the official Nginx image
# FROM nginx:alpine

# # Copy the HTML file to the Nginx html directory
# COPY index.html /usr/share/nginx/html/

# # Expose port 80 to access the web server
# EXPOSE 80

# Base image for Node.js server (backend)
FROM node:alpine AS server

# Set working directory to /app
WORKDIR /app

# Copy server code
COPY ./server /app

# Install dependencies for the server
RUN npm install

# Expose port 5000 for the server
EXPOSE 5000

# Start the server using npm run dev
CMD ["npm", "run", "dev"]

# Base image for Node.js client (frontend)
FROM node:alpine AS client

# Set working directory to /client
WORKDIR /client

# Copy client code
COPY ./client /client

# Install dependencies for the client
RUN npm install

# Expose port 3000 for the client
EXPOSE 3000

# Start the client using npm start
CMD ["npm", "start"]
