# Use the offical Node.js image as the base image
FROM node:18
# Set the working directory in the container

WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install the dependencies
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .
# Build nest js application
RUN npm run build
# Expose the port that the application will run on
EXPOSE 3000
# Start the application
CMD ["npm", "run", "start:prod"]
