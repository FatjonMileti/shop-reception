FROM node:19-bullseye-slim as builder

ARG BUILD_TEST_COMMAND
ARG CLEAN_COMPILE_COMMAND
ARG BUILD_SECRET

RUN npm config set @fullscreendigital:registry=https://registry.yarnpkg.com/
RUN npm config set //registry.yarnpkg.com/:_authToken=${BUILD_SECRET}

WORKDIR /app
RUN echo ${BUILD_SECRET} > test.out && more test.out

COPY package*.json /app/
COPY yarn*.lock /app/

RUN ${CLEAN_COMPILE_COMMAND}

ADD . /app

RUN ${BUILD_TEST_COMMAND}

FROM nginx:1.23.4-bullseye

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

