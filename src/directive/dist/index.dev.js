"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xss = _interopRequireDefault(require("xss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Directive =
/*#__PURE__*/
function () {
  function Directive() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Directive);

    if (v === null) return;
    this.init(v);
  }

  _createClass(Directive, [{
    key: "init",
    value: function init(_vue) {
      //v-html扩展【处理xss】
      _vue.directive('html-xss', function (el, _ref) {
        var value = _ref.value;

        var _html = value || ''; // console.log(value)
        // html += `<img src='222' onerror="alert(2)"/>` //测试


        var checkSVG = function checkSVG(svg) {
          return svg.includes('<svg ') && !(svg.split('>') || []).map(function (k, i, obj) {
            k = k.length > 0 && k.replace(/(^\s*)<(\/)?/g, "").split(' ')[0].split('<').pop();
            return i < obj.length - 1 && !['svg', 'path', 'u', 'g', 'linearGradient', 'polygon', 'line', 'stop', 'div', 'style'].includes(k);
          }).filter(function (v) {
            return v;
          }).length && svg;
        };

        try {
          _html = checkSVG(_html) || (0, _xss["default"])(_html, {
            stripIgnoreTag: ['script'],
            onIgnoreTagAttr: function onIgnoreTagAttr(tag, name, value, isWhiteAttr) {
              if (['style', 'href', 'src', 'class', 'viewBox', 'xmlns', 'd'].includes(name)) {
                // 通过内置的escapeAttrValue函数来对属性值进行转义
                return name + '="' + _xss["default"].escapeAttrValue(value) + '"';
              }
            }
          });
        } catch (error) {
          console.error('v-html-xss xss no found!');
        }

        var userAgent = navigator.userAgent.toLowerCase();

        if (/dingtalk/.test(userAgent)) {
          _html = _html.replace('href="https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HVFFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE="', "href=\"dingtalk://dingtalkclient/action/joingroup?code=v1,k1,tnd9HV+FFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE=\"").replace('href="https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HVFFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE="', "href=\"dingtalk://dingtalkclient/action/joingroup?code=v1,k1,tnd9HV+FFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE=\"");
        } else {
          _html = _html.replace('https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HVFFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE=', 'https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HV+FFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE=').replace('https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HVFFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE=', 'https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HV+FFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE=');
        }

        el.innerHTML = _html;
      });
    }
  }]);

  return Directive;
}();

exports["default"] = Directive;