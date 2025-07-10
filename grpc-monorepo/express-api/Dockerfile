# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose Express port
EXPOSE 4000

# Start the Express app
CMD ["node", "server.js"]