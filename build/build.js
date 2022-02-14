let fs = require('fs');
let ora = require('ora')
let rm = require('rimraf')
let path = require('path')
let chalk = require('chalk')
let webpack = require('webpack')
let config = require('../config')
let utils = require('./utils')

const version = require('./build-version.js')

let webpackDllConfig = require('./webpack.dll.conf')

const startT = new Date().getTime();
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  fs.mkdir(path.join(__dirname, './dll'), function () {
    console.log(chalk.cyan('  mkdir dll complete.\n'))
    //判断依赖包是否发生变更
    let isChange = true
    //获取根目录的包配置信息
    var rootPackageJsonData = fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8');
    let rootDependencies = JSON.parse(rootPackageJsonData).dependencies
    //获取dll目录的包配置信息
    let dllDependencies = null
    try {
      dllDependencies = fs.readFileSync(path.join(__dirname, './dll/dependencies.json'), 'utf8')
    } catch (e) {
      console.log(chalk.cyan(' dependencies.json ; start create \n'))
    }
    isChange = !dllDependencies || utils.equalsByJson(rootDependencies, JSON.parse(dllDependencies))
    //判断配置信息是否发生变更
    console.log(chalk.cyan(` dependencies isChange=${isChange}.\n`))

    if (!isChange) {
      //start build
      startBuild()
      return
    }

    let spinnerDll = ora('building for dll...')
    spinnerDll.start()
    webpack(webpackDllConfig, function (err, stats) {
      spinnerDll.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      console.log(chalk.cyan('  Build dll complete.\n'))

      //记录下配置信息

      fs.writeFile(path.join(__dirname, './dll/dependencies.json'), JSON.stringify(rootDependencies), function (err) {
        if (err) console.log(chalk.cyan(' dependencies.json fail.\n'))
        else console.log(chalk.cyan(' dependencies.json success.\n'))
      })

      startBuild()
    })
  })
})

let startBuild = () => {
  let filterArgs = require('./filterArgs')
  let buiuld_analyz = filterArgs('buiuld_analyz')
  let webpackConfig = require('./webpack.prod.conf')

  //是否启用buiuld_analyz【打包可视化解析】
  if (buiuld_analyz) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }

  let spinner = ora('building for production...')
  spinner.start()
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

    const endT = new Date().getTime();
    console.log(chalk.cyan(`编译完成✅:耗时 ${parseInt((endT - startT) / 1000)} 秒`))
    console.log(chalk.yellow(`
      版本信息: \n
      version📖: ${version.version}\n
      data⌚️:${version.date}
      `))
  })
}
