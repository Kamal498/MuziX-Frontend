FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install --silent 

COPY . /app

CMD ["npm","start"]