const { merge } = require('webpack-merge')
const common = require('./webpack/webpack.common')

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()

const envs = {
  development: 'dev',
  production: 'prod'
}

const env = envs[process.env.NODE_ENV || 'development']
const envConfig = require(`./webpack/webpack.${env}.js`)
// eslint-disable-next-line no-undef
module.exports = env => merge(common, envConfig(env))

// module.exports = env => smp.wrap(merge(common, envConfig(env)))
