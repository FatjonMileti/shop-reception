FROM node:19-bullseye-slim as builder

RUN npm config set @fullscreendigital:registry=https://registry.yarnpkg.com/
RUN npm config set //registry.yarnpkg.com/:_authToken=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


ARG BUILD_TEST_COMMAND
ARG CLEAN_COMPILE_COMMAND

WORKDIR /app

COPY package*.json /app/
COPY yarn*.lock /app/

RUN ${CLEAN_COMPILE_COMMAND}

ADD . /app

RUN ${BUILD_TEST_COMMAND}


