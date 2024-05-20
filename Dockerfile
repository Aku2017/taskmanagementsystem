# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate
# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the environment variables
ENV DATABASE_URL="postgresql://postgres:admin@db:5432/test?schema=public"
ENV JWT_SECRET="secretKey"
ENV JWT_EXPIRES_IN="300"

# Command to run the application
CMD ["npm", "run", "start:dev"]
