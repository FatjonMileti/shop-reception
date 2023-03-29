FROM node:19 as  builder

ENV NODE_VERSION 19.8.1

RUN npm config set @fullscreendigital:registry=https://registry.yarnpkg.com/
RUN npm config set //registry.yarnpkg.com/:_authToken=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

ARG BUILD_TEST_COMMAND

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY . .

RUN yarn clean && yarn install
RUN yarn build:prod

CMD ["yarn", "start"]
