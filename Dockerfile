# Use the official Node.js image as a base image
FROM node:18-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
RUN npm run build
# Expose the port the app runs on
EXPOSE 3000
# Define environment variable
ENV NODE_ENV=production
# Run the app
CMD [ "npm", "run", "start:prod" ]
