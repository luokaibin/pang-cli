FROM node:lts-alpine

WORKDIR /app
COPY . /app

RUN npm config set registry "https://registry.npm.taobao.org/" \
    && npm install

EXPOSE 7001
CMD ["npm", "run", "dev"]