const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const CompressionPlugin = require("compression-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
  },
  publicPath:process.env.NODE_ENV === 'production' ? './' : './',
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  configureWebpack: (config) => {
    config.module.rules[0].use.push({
      loader: 'iview-loader',
      options: {
        prefix: false
      },
      optimization: {
        minimize: process.env.NODE_ENV === 'production',
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log'], // remove console
              },
            },
          }),
        ],
      }
    })
  },
  productionSourceMap: false,
  //Cross-domain request


    // Nginx Reverse proxy
    // devServer: {
    //   open: true,
    //   host: 'localhost',
    //   port: 8080,
    //   https: false,
    //   hotOnly: false,
    //   proxy: {
    //     '/api': {
    //       // target: 'http://54.255.184.108/api/',
    //       target: 'http://13.251.72.106/api/',
    //       ws: true,
    //       changOrigin: true,
    //       pathRewrite: {
    //         '^/api': ''
    //       }
    //     }
    //   },
    //   before: app => {}
    // },
    // ==================
    // Configure gzip compression
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
          return {
              plugins: [
                  new CompressionPlugin({
                      test: /\.js$|\.html$|\.css/,
                      threshold: 10240,
                      deleteOriginalAssets: false
                  })
              ]
          }
      }

  }
}
