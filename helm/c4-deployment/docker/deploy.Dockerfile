FROM node:19-bullseye-slim as builder

ARG BUILD_TEST_COMMAND
ARG CLEAN_COMPILE_COMMAND
ARG BUILD_SECRET

RUN npm config set @fullscreendigital:registry=https://registry.yarnpkg.com/
RUN npm config set //registry.yarnpkg.com/:_authToken=${BUILD_SECRET}

WORKDIR /app

COPY package*.json /app/
COPY yarn*.lock /app/

RUN yarn clean && yarn install

ADD . /app

RUN yarn build:prod

FROM nginx:1.23.4-bullseye

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

