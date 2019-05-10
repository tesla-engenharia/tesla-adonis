FROM node:10.15.3-alpine

LABEL maintainer="renan"

RUN mkdir /usr/api
WORKDIR /usr/api

RUN yarn global add @adonisjs/cli

COPY package.json .

RUN yarn

COPY . .

CMD ["yarn", "dev"]

EXPOSE 3333
