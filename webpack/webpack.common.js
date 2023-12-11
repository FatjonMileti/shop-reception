// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const commonPaths = require('./paths')
const path = require('path')

// eslint-disable-next-line no-undef
module.exports = {
  entry: {
    main: commonPaths.entryPath,
    'firebase-messaging-sw': commonPaths.firebaseMessagingSWPath
  },
  stats: {
    errorDetails: true // --display-error-details
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: 'ts-loader' }
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // { test: /\.js$/, loader: "source-map-loader" }, // @fullscreendigital/carrefour-dex-fe does not support types
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.css', '.scss', '.ts', '.tsx'],
    alias: {
      'react/jsx-runtime.js': 'react/jsx-runtime',
      'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime'
    }
  },
  plugins: [
    // new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
      inject: 'body'
    }),
    new CopyPlugin({
      patterns: [{ from: './src/images', to: 'images' }]
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path
            .resolve(commonPaths.root, 'node_modules/scandit-sdk/build/', 'scandit-engine-sdk.*')
            .replace(/\\/g, '/'),
          // copy flattend with [name][ext] pattern
          to: './static/scandit/[name][ext]',
          // ignore terser with info about minified state
          info: { minimized: true }
        }
      ]
    })
  ],
  target: 'web'
}
