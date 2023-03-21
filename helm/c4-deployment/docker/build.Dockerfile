FROM debian:bullseye-slim

ENV NODE_VERSION 19.8.1

ARG BUILD_TEST_COMMAND

WORKDIR /app
ADD . /app

RUN /bin/bash -c "${BUILD_TEST_COMMAND}"
