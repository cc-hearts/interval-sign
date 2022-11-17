FROM node:16

LABEL maintainer="heart<7362469@qq.com>"

WORKDIR /usr/interval

COPY packages/ /usr/interval/packages/

COPY package.json /usr/interval/package.json

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm --filter @repo/interval-engine install

EXPOSE 5782

CMD npm run start:engine
