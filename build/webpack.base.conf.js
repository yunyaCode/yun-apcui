const path = require('path');
const utils = require('./utils');
const config = require('../config');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); //资源拷贝插件
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-tags-plugin');

let isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
module.exports = {
  entry: {
    edu: ['babel-polyfill', './src/main.js']
  },
  output: {
    filename: utils.assetsPath('js/[name].[hash:7].js'),
    chunkFilename: utils.assetsPath('js/chunks/[name].[contenthash:7].js'),
    // jsonpFunction:'wpJsonpEdu'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@src': resolve('src'),
      '@root-apc-ui-svg': resolve('./src/assets/svg/index'),
      '@root-apc-ui-scss': resolve('./src/assets/scss'),
      '@root-apc-ui-package': resolve('./src/package/index'),
    },
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
        ]
      },

      {
        test: /\.(svg|png|jpe?g|gif)(\?.*)?$/,
        loaders: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('image/[name]-[hash:7].[ext]'),
          },
        }, ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('font/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [
    // new webpack.IgnorePlugin(/\.\/local/, /jQuery/),
    //核心入口文件
    new HtmlWebpackPlugin({
      filename: isProduction ? config.build.index : config.dev.index,
      template: 'index.html',
      inject: true,
      hash: true,
      favicon: 'edu.ico'
    }),

    new VueLoaderPlugin(),

    //深度拷贝【将静态资源拷贝到编译目录下】
    new CopyWebpackPlugin([{
      from: resolve("static"),
      to: config.build.assetsSubDirectory,
      ignore: [".*"]
    }]),


    // new webpack.BannerPlugin("⌚author: sean"), // 会将这段内容插入到打包后的js文件最前面

    //将文件加上hash值插入到页面中。
    // new HtmlWebpackIncludeAssetsPlugin({
    //   tags: require('./includeAssetsFile'),
    //   append: false,
    //   hash: true
    // })
  ]
};
