FROM node:12.2.0-alpine as build
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --prod
