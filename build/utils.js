var path = require('path')
var fs = require('fs')
var config = require('../config')
let chalk = require('chalk')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.equalsByJson = function (obj1, obj2) {
  let key = false;
  if (!obj2) return true

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return true
  }

  for (var o in obj1) {
    if (!obj2[o] || obj2[o] !== obj1[o]) {
      key = true
    }
  }


  return key
}

//删除文件夹【*************谨慎操作*************】
exports.delDir = function (_path) {
  _path = path.join(__dirname, _path)

  console.log('【delDir】dirUrl =', _path)

  /**
   * 判断文件是否存在
   */
  if (!fs.existsSync(_path)) {
    console.log("对应文件不存在");
    return
  }

  /**
   * 判断文件是否在允许删除内
   */
  let canDelDELDir = ['apc-ui/dist']
  let canDel = false;
  canDelDELDir.forEach(ex => {
    if (_path.includes(ex)) {
      canDel = true
    }
  })
  if (!canDel) {
    console.log('文件被保护不能删除')
    return
  }

  /**
   * 判断环境是否被允许
   */
  if (process.env.NODE_ENV !== 'development') {
    console.log('只能开发环境删除,process.env.NODE_ENV =', process.env.NODE_ENV)
    return
  }

  let dirNum = 0;
  let fileNum = 0;

  (_delDir = url => {
    fs.readdirSync(url).forEach(file => {
      let curPath = path.join(url, file);
      if (fs.statSync(curPath).isDirectory()) {
        dirNum++;
        _delDir(curPath);
      } else {
        fileNum++;
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(url);
  })(_path)
  console.log(chalk.cyan(` 删除文件夹:${dirNum}个.\n 删除文件:${fileNum}个 \n`))
}
