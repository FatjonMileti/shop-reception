const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// for speed measurer
// const MiniCssExtractPlugin = require('mini-css-extract-pluginV1')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const commonPaths = require('./paths')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const terserJS = new TerserPlugin({
  parallel: true,
  terserOptions: {
    parse: {
      ecma: 8
    },
    sourceMap: true,
    compress: {
      ecma: 5,
      warnings: false,
      comparisons: false
    },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true
    },
    mangle: true,
    module: false
  }
})

// eslint-disable-next-line no-undef
module.exports = env => ({
  mode: 'production',
  output: {
    filename: `${commonPaths.jsFolder}/[name].[contenthash].js`,
    path: commonPaths.outputPath,
    chunkFilename: `${commonPaths.jsFolder}/[name].[chunkhash].js`
  },
  optimization: {
    minimize: true,
    minimizer: [terserJS],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: {
                exportLocalsConvention: 'camelCase',
                localIdentName: '[local]___[contenthash:base64:5]'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: (content, loaderContext) => {
                if (loaderContext.resourcePath.endsWith('src/styles/_variables.scss')) {
                  return content
                }

                var correctedPath = path.resolve(commonPaths.root, 'src/styles/_variables.scss')
                correctedPath = correctedPath.replace(/\\/g, '/')

                return `
                @import "${correctedPath}";

                ${content}
              `
              }
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    ...(env.environment !== 'uat'
      ? [
          new CompressionPlugin({
            compressionOptions: {
              numiterations: 15
            },
            algorithm(input, compressionOptions, callback) {
              return zopfli.gzip(input, compressionOptions, callback)
            }
          })
        ]
      : []),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[name].css`,
      chunkFilename: '[id].css'
    }),
    new Dotenv({ path: env.environment === 'uat' ? '.env.uat' : '.env.prod' })
  ],
  devtool: 'source-map'
})
