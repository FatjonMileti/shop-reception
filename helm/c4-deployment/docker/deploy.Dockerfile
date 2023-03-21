FROM debian:bullseye-slim

ENV NODE_VERSION 19.8.1

WORKDIR /app
ADD . /app

