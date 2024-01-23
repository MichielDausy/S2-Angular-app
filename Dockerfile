FROM node:12.2.0-alpine as build
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
