# Step 1: Build stage
FROM node:16 

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Use --legacy-peer-deps to skip strict peer checking
RUN npm install --legacy-peer-deps


# Copy the rest of the app files
COPY . ./

# Step 2: Start the app
CMD ["npm", "start"]
