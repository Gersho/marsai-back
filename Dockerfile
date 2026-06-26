FROM node:24.18.0-alpine3.23

USER root

RUN apk update && apk add --no-cache ffmpeg

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD npm run seed:noenv && node ./dist/server.js
