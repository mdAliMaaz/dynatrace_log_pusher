# Use the official Node.js 10 image as base
FROM node:10

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Command to run the application
CMD ["npm", "start"]
