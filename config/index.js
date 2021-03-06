'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 跨域请求
    proxyTable: {
      '/oauth': {
        target:'http://192.168.0.113:8081',
        changeOrigin: true
       },
       '/comUser': {
        target:'http://192.168.0.113',
        changeOrigin: true,
        pathRewrite: {
          '^/comUser': ''
        }
       },
      //  '/company': {
      //   target:'http://192.168.0.113:80',
      //   changeOrigin: true
      //  },
       '/comapi': {
        target:'http://192.168.0.113:83',
        changeOrigin: true,
        pathRewrite: {
          '^/comapi': ''
        }
       },
       '/file': {
        target:'http://192.168.0.113:3002',
        changeOrigin: true
       },
       '/skill': {
        target:'http://192.168.0.120:80',
        changeOrigin: true,
        pathRewrite: {
          '^/skill': ''
        }
       },
       '/user': {
        target:'http://192.168.0.113:80',
        changeOrigin: true
       },
       '/dept': {
        target:'http://192.168.0.120:80', 
        changeOrigin: true
       },
       '/order': {
        target:'http://192.168.0.116:83', 
        changeOrigin: true
       },
       '/customer': {
        target:'http://192.168.0.116:83', 
        changeOrigin: true
       },
       '/role': {
        target:'http://192.168.0.120:80',
        changeOrigin: true
       },
       '/post': {
        target:'http://192.168.0.120:80',
        changeOrigin: true
       },
       '/manage': {
        target:'http://192.168.0.120:80',
        changeOrigin: true
       },
       '/Applicant': {
        target:'http://192.168.0.120:80',
        changeOrigin: true
       },
       '/bind': {
        target:'http://192.168.0.120:80',
        changeOrigin: true
       },
       '/api': {
        target:'http://192.168.0.116:83',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
       }
    },
    // Various Dev Server settings
    // host: '192.168.0.111', // can be overwritten by process.env.HOST
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build:{
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
