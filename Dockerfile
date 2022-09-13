FROM node:16

RUN npm install -g lerna

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN lerna bootstrap --force-local

RUN npm run build
