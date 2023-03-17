const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const commonPaths = require('./paths')
const path = require('path')

// eslint-disable-next-line no-undef
module.exports = () => ({
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    path: commonPaths.outputPath,
    chunkFilename: '[name].js'
  },
  optimization: {
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
          'style-loader',
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
                correctedPath = correctedPath.replace(/\\/g, '/');

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
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: commonPaths.outputPath
    },
    compress: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [new ReactRefreshWebpackPlugin()]
})
