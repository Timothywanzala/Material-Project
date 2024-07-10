# Use the official Node.js image from the Docker Hub
FROM node:lts-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Set environment variables 
ENV FLER_DB_HOST=leopard.nssfug.org
ENV FLER_DB_USERNAME=fler_app
ENV FLER_DB_NAME=financial_literacy
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