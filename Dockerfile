FROM node:alpine

LABEL maintainer="renan.mav@hotmail.com"

RUN mkdir /usr/api
WORKDIR /usr/api

COPY package*.json yarn.lock ./

RUN npm install

COPY . ./

EXPOSE 3333

RUN npm i -g @adonisjs/cli

CMD ["adonis", "serve", "--dev"]
