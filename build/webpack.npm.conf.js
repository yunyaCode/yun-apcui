process.env.NODE_ENV = 'production'

const fs = require('fs');
const path = require('path');
const config = require('../config');
const merge = require('webpack-merge');
let baseConfig = require('./webpack.base.conf')
let filterArgs = require('./filterArgs')
const utils = require('./utils');
const webpack = require('webpack');

const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); // 引入清除文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css合并切块处理
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-tags-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); //资源拷贝插件
const HappyPack = require('happypack');
const addCssUtf8WebpackPlugin = require('./plugins/addCssUtf8WebpackPlugin')
const happyThreadPool = HappyPack.ThreadPool({
  size: 5
});

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

let plugins = [


  //定义全局常量【一般用于环境判断】
  new webpack.DefinePlugin({
    'process.env': merge(config.build.env, {
      "NODE_API": JSON.stringify(filterArgs('api') || "")
    })
  }),
  // 清除编译历史数据
  new CleanWebpackPlugin(),

  // 抽离css到公共文件中
  // new MiniCssExtractPlugin({
  //   filename: utils.assetsPath('css/[name].[hash:7].css'),
  //   chunkFilename: utils.assetsPath('css/chunks/[name].[contenthash:7].chunk.css'),
  //   ignoreOrder: true
  // }),
  //
  new addCssUtf8WebpackPlugin(),

  // 代码块分割【webpack4支持0配置】
  new webpack.optimize.SplitChunksPlugin(),

  //优化样式文件，去重、压缩等处理
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    // cssProcessorOptions: cssnanoOptions,
    cssProcessorPluginOptions: {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeUnicode: false
      }]
    },
    canPrint: true
  }),
  // 将js文件解析任务分解成多个子进程并发执行
  new HappyPack({
    id: 'babel',
    loaders: [{
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    }, ],
    threadPool: happyThreadPool,
    verbose: true,
  })
]

//get dll file
let files = fs.readdirSync(path.join(__dirname, '.', 'dll'));

if (files && files.length > 1) {
  //深度拷贝【将DllPlugin产生的资源拷贝到编译目录下】
  plugins.push(
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '.', 'dll'),
      to: config.build.assetsSubDirectory + '/dll',
      ignore: [".*"],
      force: true,
    }])
  )

  files.forEach(file => {

    if (file.indexOf('-manifest.json') > -1) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: require(`./dll/${file}`),
        })
      )
    }
    if (file.indexOf('-dll.js') > -1) {
      //将dll插入到页面中。
      plugins.push(
        new HtmlWebpackIncludeAssetsPlugin({
          tags: `static/dll/${file}`,
          append: false,
          hash: true
        })
      )
    }

  })
}

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  entry: {
    apcUI: ['babel-polyfill', './src/index.js']
  },
  output: {
    publicPath: config.build.assetsPublicPath,
  },
  module: {
    rules: [{
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('postcss-import')(),
              require('autoprefixer')()
            ]
          }
        }, 'sass-loader'],
      },
      {
        test: /\.js$/,
        include: [
          resolve('src'),
          resolve('/../apc-ui/src'),
          resolve('/../lib'),
          resolve('/../utli'),
          resolve('/../core'),
          resolve('/../mixins')
        ],
        use: ['happypack/loader?id=babel'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    // runtimeChunk: {
    //   name: entrypoint => `runtime~${entrypoint.name}`
    // }
  },
  plugins,
});
