# Dockerfile for Server
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port (change if necessary)
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
