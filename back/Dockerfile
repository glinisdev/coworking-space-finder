FROM node:lts-bullseye-slim

WORKDIR /back

COPY package*.json ./

RUN yarn install

COPY . .

CMD yarn start:dev
