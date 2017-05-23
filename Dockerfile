FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copying files in the app directory
COPY . /usr/src/app

# Installing dependencies
RUN npm install

# exposing port inside of docker
EXPOSE 8000
CMD [ "npm", "start" ]
