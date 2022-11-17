FROM node:16

LABEL maintainer="heart<7362469@qq.com>"

WORKDIR /usr/interval

COPY packages/ /usr/interval/packages/

COPY package.json /usr/interval/package.json

RUN npm config set registry https://registry.npm.taobao.org

RUN npm i

RUN npm install pnpm

EXPOSE 5782

CMD npm start:engine
