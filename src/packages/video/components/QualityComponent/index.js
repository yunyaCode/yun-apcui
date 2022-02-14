/**
 * @Author ：sean
 * @Date ：2019/5/29
 */

import './index.scss';

import {
  parseDom
} from '../utils';

import {
  qualityHtml,
  qualityModal
} from './template';


/**
 * 切换清晰度组件
 */
export default class QualityComponent {
  constructor() {
    this.html = parseDom(qualityHtml);
    this.modalHtml = parseDom(qualityModal);
    this.definition = 'HD';
  }

  createEl(el) {
    const eleControlbar = el.querySelector('.prism-controlbar');
    eleControlbar.appendChild(this.html);
    el.appendChild(this.modalHtml);
  }

  setCurrentQuality(quality, def) {
    const currentQuality = this.html.querySelector('.current-quality');
    currentQuality.innerText = quality;
    currentQuality.dataset.def = def;
    this.definition = def;

    const qualityListEle = this.html.querySelector('.quality-list');

    const currentEle = qualityListEle.querySelector('.current');
    if (currentEle) {
      currentEle.className = '';
    }
    const li_target = qualityListEle.querySelector(`li[data-def=${def}]`);
    if (li_target) {
      li_target.className = 'current';
    }
  }

  created(player) {
    this._urls = player._urls;

    // 扩展条件判断，当只有一种类型时不显示其功能
    if (player._urls.length <= 1) return;

    this.html.style.display = 'block';

    const qualityListEle = this.html.querySelector('.quality-list');

    const lis_ele = this._urls.map(url => `<li data-def="${url.definition}">${url.desc}</li>`);
    this.html.querySelector('.quality-list').innerHTML = lis_ele.join('');

    if (this.definition) {
      const li_target = qualityListEle.querySelector(`li[data-def=${this.definition}]`);
      li_target.className = 'current';
    }

    qualityListEle.onclick = ({
      target
    }) => {
      const definition = target.dataset.def;
      if (definition) {
        if (target.className !== 'current') {

          const url = this._urls.find(url => url.definition === definition);

          player.loadByUrl(url.Url, player.getCurrentTime(), true, true);

          this.setCurrentQuality(url.desc, url.definition);

          this.modalHtml.style.display = 'block';
          this.modalHtml.querySelector('span').innerText = url.desc;

        }
      }
    };
  }

  ready(player) {
    this.modalHtml.style.display = 'none';
    document.querySelector('.prism-setting-item.prism-setting-quality').classList.add('player-hidden');
  }
}
