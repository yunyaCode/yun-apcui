process.env.NODE_ENV = 'development'

const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.conf');
const config = require('../config');

console.log('> devServer.target>>>>>', config.dev.proxyTable["/edu"].target)
console.log('>')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: config.dev.assetsPublicPath,
  },
  devServer: {
    port: config.dev.port,
    progress: true, // 显示打包的进度条
    contentBase: config.dev.assetsPublicPath, // 根目录
    host: config.dev.host,
    inline: true,
    open: true, // 自动打开浏览器
    hot: true, //热替换
    compress: true, // 启动 gzip 压缩
    proxy: config.dev.proxyTable, //配置跨域服务代理
    writeToDisk: true, //是否写入磁盘
    useLocalIp: true, //是否使用本地ip
    disableHostCheck:true
  },
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }]
  },
  plugins: [
    //定义全局常量【一般用于环境判断】
    new webpack.DefinePlugin({
      'process.env': merge(config.dev.env, {
        //可自定义
      })
    })
  ]
});
