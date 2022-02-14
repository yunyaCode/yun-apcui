var http = require('http');
var fs = require('fs');
let chalk = require('chalk')
var path = require('path');
var open = require('open');
var documentRoot = path.join(__dirname, '../dist')

let port = process.env.ENV_PORT || process.argv[2] || 8880;

http.createServer(function (req, res) {
  var url = req.url;

  //这里处理“？”是因为需要排除请求资源地址加了hash导致资源路径找不到的bug
  var file = documentRoot + url.split('?')[0];

  console.log(url);

  fs.readFile(file, function (err, data) {
    if (err) {
      if (url == '/edu.html') {

        res.writeHead(200, {
          "Content-Type": "text/plain;charset=utf-8"
        });


        res.write(`
        🌟无效地址:${file} \n

        需要先确保本地edu_new里存在编译记录【即存在dist目录】！！！ \n

        如果不存【dist】目录，则需要在edu_new中执行：npm run  build api=后端服务地址【必填】


        tips:后端服务地址可为 \n

            测试：https://apit-edu.dingtax.cn \n
            预发：https://api-edu-pre.dingtax.cn \n
            生产：https://api-edu.dingtax.cn \n

        `);
      }
    } else {
      res.write(data);
    }

    res.end();
  });

}).listen(port);

console.log(chalk.yellow(
  `服务器开启成功:地址为:http://localhost:${port}`
))

open(`http://localhost:${port}/edu.html`)
