FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

ENTRYPOINT [ "sh", ".docker/entrypoint.sh" ]
