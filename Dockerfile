FROM node:18-alpine

WORKDIR /app/

COPY src/ /app/src
COPY package.json /app
COPY webpack/ /app/webpack
COPY webpack.config.js /app
COPY .env.dev /app
COPY .npmrc /app
COPY tsconfig.json /app
COPY .babelrc /app
COPY .eslintrc /app

RUN yarn install

CMD ["yarn", "start:local"]