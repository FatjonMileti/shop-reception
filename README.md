# carrefour-ui-modules

## Setup project
- create .env file in root folder and copy the contents from .env.example; edit the values for the appropriate environment.
- create .npmrc file in root folder and copy the contents from .npmrc.example; get an _authToken for the private library and set its value in newly created .npmrc file on the line `//registry.yarnpkg.com/:_authToken=`

## Start project:

- install yarn
- run: `yarn`
- run: `yarn start`

## Build prod:
- run: `yarn build`


## docker local build and run
* docker build . -f helm/c4-deployment/docker/build.Dockerfile -t dex-front-end
* docker run -p 8085:80 --name dex-front-end-crf -it dex-front-end