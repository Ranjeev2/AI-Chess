# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port that your application runs on (adjust as needed)
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
