# Choose docker image
FROM node:alpine

# No need to set WORKDIR

# Copy all the files to the Docker VM
COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]
