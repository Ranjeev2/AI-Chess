# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server application code
COPY . .

# Expose port 5000 for the backend server
EXPOSE 5000

# Start the server using `npm run dev`
CMD ["npm", "run", "dev"]
