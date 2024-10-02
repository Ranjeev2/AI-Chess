# Use the official Nginx image
FROM nginx:alpine

# Copy the HTML file to the Nginx html directory
COPY index.html /usr/share/nginx/html/

# Expose port 80 to access the web server
EXPOSE 80
