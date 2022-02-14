let ora = require('ora')
let fs = require('fs');
let rm = require('rimraf')
let path = require('path')
let chalk = require('chalk')
let webpack = require('webpack')
let config = require('../config')
let webpackConfig = require('./webpack.dll.conf')

fs.mkdir(path.join(__dirname, './dll'), function () {

  console.log(chalk.cyan('  mkdir dll complete.\n'))
  let spinner = ora('building for dll...')
  spinner.start()

  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      console.log(chalk.cyan('  Build dll complete.\n'))
    })
  })

});
