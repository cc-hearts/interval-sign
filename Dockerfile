FROM node:16

LABEL maintainer="heart<7362469@qq.com>"

WORKDIR /usr/interval

COPY . .

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install -g pnpm

RUN pnpm config set registry https://registry.npmmirror.com/

RUN pnpm install

RUN  pnpm build:engine

RUN cp /usr/interval/packages/interval-engine/app.yaml /usr/interval/packages/interval-engine/dist/app.yaml

EXPOSE 5782

CMD pnpm start:engine