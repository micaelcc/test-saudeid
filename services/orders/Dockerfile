FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3002

CMD [ "yarn", "start:dev" ]