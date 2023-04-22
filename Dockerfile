# Choose docker image
FROM node:alpine

# No need to set WORKDIR
# WORKDIR /app

# Copy all the files to the Docker VM
COPY . .

RUN yarn install

CMD [ "yarn", "start" ]
