// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const commonPaths = require('./paths')
const path = require('path')

// eslint-disable-next-line no-undef
module.exports = {
  entry: [commonPaths.entryPath],
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
      title: 'DEX PWA',
      template: commonPaths.templatePath,
      inject: 'body'
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 65000000
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/images', to: 'images' },
        { from: './src/manifest', to: 'manifest' }
      ]
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
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/static/firebase',
          to: 'static/firebase/[name][ext]',
          info: { minimized: true }
        }
      ]
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/static/pdfWorker',
          to: 'static/pdfWorker/[name][ext]',
          info: { minimized: true }
        }
      ]
    })
  ],
  target: 'web'
}
