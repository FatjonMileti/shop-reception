FROM debian:bullseye-slim

ENV NODE_VERSION 19.8.1

ENV NVM_DIR=/root/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN . "$NVM_DIR/nvm.sh" \
    && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" \
    && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" \
    && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN npm install -g yarn

ARG BUILD_TEST_COMMAND

WORKDIR /app
ADD . /app

RUN /bin/bash -c "${BUILD_TEST_COMMAND}"
