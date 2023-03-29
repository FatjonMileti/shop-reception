#!groovy
@Library(['c4-pipeline-library']) _

/********************************************************************************************************************/
env.APP_GROUP='ro.carrefour'
env.APP_NAME='dex-front-end'
env.APP_VERSION='1.0.0'
/********************************************************************************************************************/

env.BUILD_ARTIFACT="dex-front-end"
env.BUILD_DOCKERFILE='./helm/c4-deployment/docker/build.Dockerfile'
env.BUILD_TEST_COMMAND='yarn build:prod'
env.CLEAN_COMPILE_COMMAND='yarn clean && yarn install'

env.DOCKER_ARTIFACT=true
env.DEPLOY_DOCKERFILE='./helm/c4-deployment/docker/deploy.Dockerfile'
env.DEPLOY_IMAGE_NAME='dex/dex-front-end'
c4pipev1()
