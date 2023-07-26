FROM node:18-alpine

WORKDIR /front

# Install dependencies
COPY package*.json ./
RUN yarn install

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

CMD yarn run dev
