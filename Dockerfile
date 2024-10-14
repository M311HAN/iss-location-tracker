# Use an official nginx image as the base image
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the current directory contents into the container at /usr/share/nginx/html
COPY . .

# Expose port 80 to be able to access the application
EXPOSE 80

# Command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]
