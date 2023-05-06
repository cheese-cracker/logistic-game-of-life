# Choose docker image
FROM node:alpine

# Set workspace (so container VM is neat and organized)
WORKDIR /app

# Copy all files to Docker VM
COPY . .

# Install packages
RUN yarn install

# serve to serve build
RUN yarn global add serve

# Run Build
RUN yarn run build

# Mount local volume
VOLUME /app/node_modules

# Expose port
EXPOSE 3000

# Run the application (curly quotes only)
CMD [ "serve", "-s", "build/" ]
