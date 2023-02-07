FROM node:18.14-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3003

ENV MONGOMS_DOWNLOAD_URL=https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.28.tgz

CMD [ "yarn", "start:dev" ]