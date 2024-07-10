# Use the official Node.js image from the Docker Hub
FROM node:lts-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Set environment variables 
ENV FLER_DB_HOST=82.180.175.0
ENV FLER_DB_USERNAME=u111808351_fl_tootkit
ENV FLER_DB_NAME=u111808351_fl_tootkit
ENV FLER_DB_PASSWORD=dirxEm-gokzeh-6nynxy
# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app's source code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD ["node", "server.js"]