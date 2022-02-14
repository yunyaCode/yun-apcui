import xss from 'xss';


export default class Directive {

  constructor(v = null) {

    if (v === null) return;

    this.init(v);
  }

  init(_vue) {
    //v-html扩展【处理xss】
    _vue.directive('html-xss',
      (el, {
        value
      }) => {
        let _html = value || '';
        // console.log(value)
        // html += `<img src='222' onerror="alert(2)"/>` //测试
        let checkSVG = (svg) => {
          return svg.includes('<svg ') && !(svg.split('>') || []).map((k, i, obj) => {
            k = k.length > 0 && k.replace(/(^\s*)<(\/)?/g, "").split(' ')[0].split('<').pop()
            return i < obj.length - 1 && !['svg', 'path', 'u', 'g', 'linearGradient', 'polygon', 'line', 'stop', 'div', 'style'].includes(k)
          }).filter(v => v).length && svg
        }

        try {
          _html = checkSVG(_html) || xss(_html, {
            stripIgnoreTag: ['script'],
            onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
              if (['style', 'href', 'src', 'class', 'viewBox', 'xmlns', 'd'].includes(name)) {
                // 通过内置的escapeAttrValue函数来对属性值进行转义
                return name + '="' + xss.escapeAttrValue(value) + '"';
              }
            }
          })
        } catch (error) {
          console.error('v-html-xss xss no found!')
        }

        var userAgent = navigator.userAgent.toLowerCase();


        if (/dingtalk/.test(userAgent)) {
          _html = _html.replace('href="https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HVFFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE="', `href="dingtalk://dingtalkclient/action/joingroup?code=v1,k1,tnd9HV+FFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE="`)
            .replace('href="https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HVFFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE="', `href="dingtalk://dingtalkclient/action/joingroup?code=v1,k1,tnd9HV+FFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE="`)
        } else {
          _html = _html.replace('https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HVFFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE=', 'https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HV+FFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE=')
            .replace('https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HVFFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE=', 'https://qr.dingtalk.com/action/joingroup?code=v1,k1,tnd9HV+FFv9FcaMtqc0iq0u38dWdPMu6K5WhVEq7FyE=')
        }
        el.innerHTML = _html
      }
    )
  }
}
