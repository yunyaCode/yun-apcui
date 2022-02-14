let path = require('path');
let fs = require('fs');
let render = require('json-templater/string');
let version = require('./version');


//自定义的版本信息
let VersionConfig = {
  a: 0,
  b: 0,
  c: 0
}

let a = Number.parseInt(version.version.split('.')[0]) || 0;
let b = Number.parseInt(version.version.split('.')[1]) || 1;
let c = Number.parseInt(version.version.split('.')[2]) + 1;

//配置优先
if (VersionConfig.a > a || VersionConfig.b > b) {
  a = VersionConfig.a;
  b = VersionConfig.b;
  c = VersionConfig.c;
}

let Y = new Date().getFullYear();
let M = new Date().getMonth() + 1;
let D = new Date().getDate();
let H = new Date().getHours();
let Mi = new Date().getMinutes();
let MAIN_TEMPLATE = `var a = {{a}};
var b = {{b}};
var c = {{c}};

module.exports = {
  version: a + '.' + b + '.' + c,
  date: {{Y}} + '-' + {{M}} + '-' + {{D}} + ' ' + {{H}} + ':' + {{Mi}}
};
`;

let template = render(MAIN_TEMPLATE, {
  a,
  b,
  c,
  Y,
  M,
  D,
  H,
  Mi
});

fs.writeFileSync(path.join(__dirname, './version.js'), template);

module.exports = {
  version: a + '.' + b + '.' + c,
  date: Y + '-' + M + '-' + D + ' ' + H + ':' + Mi
};
