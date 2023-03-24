FROM node:16.17-alpine

RUN apk update

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY src /app/src

RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "node", "./dist/main.js" ]