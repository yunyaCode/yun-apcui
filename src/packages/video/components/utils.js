/**
 * @Author ：sean
 * @Date ：2019/5/29
 */

export function parseDom(html) {
  const ele = document.createElement('div');
  ele.innerHTML = html;
  return ele.childNodes[0];
}
