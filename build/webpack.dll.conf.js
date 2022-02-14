const path = require('path');
const webpack = require('webpack');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); // 引入清除文件插件

process.env.NODE_ENV = 'production' // 将 NODE_ENV 设置为 production 可减少依赖的大小

function resolve(_path = '..', _dir = '') {
  return path.join(__dirname, _path, _dir);
}

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['vue', 'vuex', 'vue-router', 'axios', 'core-js', 'vue-amap/dist'],
    common: ['fastclick', 'vue-awesome-swiper' , 'dingtalk-jsapi'],
    admin: ['html2canvas','wangeditor', 'vuedraggable/dist/vuedraggable.common.js', 'sortablejs/modular/sortable.esm.js', 'jquery/dist/jquery.min.js']
  },
  output: {
    path: resolve('./dll'), //放在项目的static/js目录下面
    filename: '[name]-dll.js', //打包文件的名字
    library: '[name]_[hash]_library' //可选 暴露出的全局变量名
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    //设置编译环境
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    //清除打包内容
    new CleanWebpackPlugin(),

    //生成清单文件
    new webpack.DllPlugin({
      context: process.cwd(),
      path: resolve('./dll', '[name]-manifest.json'),
      name: '[name]_[hash]_library'
    }),
  ]
};
