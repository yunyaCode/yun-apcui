<template>
  <transition name="fade">
    <div v-if="open || options.open"
      :class="[MCls, cls,{lock: newOptions.lock}, {noEsc: !newOptions.lock}, {'w':minMax}, {'min':minMax==='min'}, {'max':minMax==='max'}, MIndex]"
      :style="MStyle" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <div style="height: 100%; width: 100%; " @click="closeBack(true)" @mousemove="stopMove"></div>
      <apc-loading v-if="loading"></apc-loading>
      <div v-else :class="[direction, BCls]" v-show="show || minMax"
        :style="[BStyle, {overflow: newOptions.move ? 'visible':'hidden'}]" @mousemove="move" style="padding-top: 0;"
        ref="apcM_B">
        <div v-if="newOptions.move" style="height: 7rem; margin-top: -5.225rem; width: 100%; cursor: move;"
          @mousedown="readyMove" @mouseup="stopMove" @mosueleave="stopMove"></div>

        <slot name="mHtml" ref="slotList"></slot>
        <!-- 这里的:apcm_init参数表示是当前工作区的标志 -->
        <component v-for="(m,i) in components" :class="[m.mCls,m.transition]" :apcm_message=m.message||{}
          :apcm_init="i===components.length-1&&show" v-show="m.opacity===1" :style="`opacity:${m.opacity}!important`"
          :is="m.component" :key=i>
        </component>

        <a v-if="newOptions.back!==''" :class="[newOptions.ePath,newOptions.back]" :style="newOptions.lockStyle"
          @click="close">
          <u :style="UStyle" class="icon" v-html-xss="svg[newOptions.back]">
          </u>
          <del v-if="newOptions.back==='esc'">Esc</del>
        </a>
        <div class="X" v-if="minMax">
          <a class="xbtn min" @click="miniM"><u class="icon" v-html="svg.min"></u></a>
          <a class="xbtn max" @click="maxM"><u class="icon" v-html="svg.max"></u></a>
          <a class="xbtn close" @click="close(true)"><u class="icon" v-html="svg.close"></u></a>
        </div>
      </div>

    </div>
  </transition>
</template>
<script>
  /**
   @module apc-m
   @param {options.<lock> | <open> | <order> | <ePath> | <back> | <direction> | <mBgColor> | <bBgColor> | <height> | <lockStyle>} {object} apc-region组件的参数
   @example <apc-m :options="option"/>
   */
  import esc from '../../../assets/svg/back';
  import back from '../../../assets/svg/arrow';
  import close from '../../../assets/svg/wrong';
  import min from '../../../assets/svg/min';
  import max from '../../../assets/svg/max';

  export default {
    name: 'apc-m',
    data() {
      return {
        readyMoveStatus: false,
        readyX: 0, // 鼠标的x坐标
        readyY: 0, // 鼠标的y坐标
        winX: 0, // 弹窗的x坐标
        winY: 0, // 弹窗的y坐标
        x: 0, // 准备移动的x坐标
        y: 0, // 准备移动的y坐标
        element: null,
        style: null,
        svg: {
          esc,
          back,
          close,
          min,
          max,
        },
        MStyle: {},
        BStyle: {},
        UStyle: {},
        MCls: !this.pop ? 'M oI' : 'pop oI',
        BCls: !this.pop ? 'B oO' : 'popB oO',
        closing: false,
        isOpen: false,
        open: false,
        direction: '',
        defaultOptions: {
          lock: false,
          open: false,
          order: '0',
          ePath: '',
          back: '',
          direction: '',
          height: '',
          bBgColor: 'rgba(0,0,0,.95)',
          mBgColor: 'none',
          lockStyle: '',
          move: false,
        },
        startY: null,
        top: null,
        bottom: null,
        distanceY: null,
        options: '',
        shwoIndex: 0,
        toEdge: false, // 里面的内容是否滚动到边缘
        componentsLength: 1,
        componentList: [],
        cls: '',
        minMax: false, // 是否允许放大缩小
        loading: false,
        MIndex: ''
      };
    },
    props: {
      pop: Boolean,
      show: {
        default: true,
        type: Boolean
      },
      _apcM: Object,
      _options: Object,
      components: Array,
    },
    created() {
      this.MIndex = this._apcM && this._apcM.minIndex && `m${this._apcM.minIndex}`
      this.init();
    },
    computed: {
      newOptions() {
        this.isOpen = this.options.open;
        if (this.isOpen) {
          this.direction = this.options.direction || 'iU';
          this.initStyle(this.direction);
        }

        this.MStyle = {
          left: this.direction.indexOf('iU') > -1 || this.direction.indexOf('iD') > -1 ? '0' : '',
          top: this.direction.indexOf('iU') > -1 ? '0' : '',
          bottom: this.direction.indexOf('iD') > -1 ? '0' : '',
          background: this.options.mBgColor,
        }

        this.UStyle = {
          '-webkit-transform': `rotate(${this.direction.indexOf('iD') > -1 ? '180deg' : ''})`,
        }

        return Object.assign(this.defaultOptions, this.options);
      },
    },
    watch: {

      '_apcM.minIndex': function (minIndex) {
        this.MIndex = `m${minIndex}`
        console.log('m._apcM.minIndex====', minIndex, this.MIndex)

      },
      isOpen(val) {
        if (val === true) {
          if (this.newOptions.order === '0') {
            setTimeout(() => {
              this.BCls = !this.pop ? `B iC oI ${this.options.direction}` : 'popB iC oI';
              this.direction = '';
            }, 0);
          }
          if (this.newOptions.order === 'MB') {
            setTimeout(() => {
              this.BCls = !this.pop ? 'B iC oI' : 'popB iC oI';
              this.direction = '';
            }, 0);
          }
          window.addEventListener('keyup', this.keyup);
          this.open = true;
        } else {
          if (this.newOptions.order === '0') {
            setTimeout(() => {
              // this.direction = 'iU';
              /*    if (this.isPc()) {
                    this.direction = 'iB';
                  } else {
                    this.direction = 'iU';
                  } */
              this.BCls = !this.pop ? (`B oO  ${this.options.direction}`) : ('popB oO ');
            }, 0);
          }
          if (this.newOptions.order === 'MB') {
            setTimeout(() => {
              // this.direction = 'iU';

              /*      if (this.isPc()) {
                      this.direction = 'iB';
                    } else {
                      this.direction = 'iU';
                    } */
              this.BCls = !this.pop ? (`B oO  ${this.options.direction}`) : ('popB oO ');
            });
          }

          window.removeEventListener('keyup', this.keyup);
          setTimeout(() => {
            this.open = false;
          }, 100);
        }

        //  如果是安卓并且有video标签，则隐藏视频播放
        if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
          //　隐藏播放器
          // this.hiddenVideo(val);
        }
      },
      components(list) {
        this.init()
      },
    },
    methods: {
      init() {
        if (!this.components) return
        console.log('this.components,,,,,', this.components)
        let max = this.components.length
        this.componentList = this.initOpacity();
        if (this.components && max > 0) {
          let component = this.components[max - 1]
          this.cls = component.cls || '';
          this.options = component.options || '';
        } else if (this.options) {
          this.cls = this._options.cls || ''
          this.options = this._options
        }
        this.minMax = this.options.minMax || false;
      },
      initOpacity() {
        let max = this.components.length - 1;
        //处理每个模块的opacity值
        return this.components.map((item, i) => {
          let opacity = 0
          if (this.components[max].transition && (i === max - 1 && i > 0 || item.opacity)) {
            opacity = 1
          }
          if (i === max) opacity = 1;
          item['opacity'] = opacity;
          // console.log('opacity.item', i, 'opacity=', opacity)
          return item
        })
      },
      initStyle(direction = 'iU') {
        this.BStyle = {
          top: direction.indexOf('iU') > -1 ? '0px' : direction.indexOf('iM') > -1 ? '50%' : '',
          left: direction.indexOf('iU') > -1 || direction.indexOf('iD') > -1 ? '0' : '',
          bottom: direction.indexOf('iD') > -1 ? '0' : '',
          '-webkit-transform': direction.indexOf('iM') > -1 ? 'translate(0,-50%) !important' : '',
          height: this.options.height ? this.options.height : '',
          background: this.options.bBgColor,
        };
      },

      isPc() { // 是否是pc
        const userAgentInfo = navigator.userAgent.toLowerCase();
        const Agents = [
          "android",
          "iphone",
          "symbianos",
          "windows phone",
          "ipad",
          "ipod",
          "dingtalk"
        ];
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > -1) {
            flag = false;
            break;
          }
        }
        return flag;
      },
      // 准备移动
      readyMove(e) {
        if (!this.newOptions.move) return;
        this.readyMoveStatus = true; // 准备好移动
        this.winX = this.x; // 初始的窗口x坐标
        this.winY = this.y; // 初始的窗口y坐标
        this.readyX = e.clientX; // 鼠标x坐标
        this.readyY = e.clientY; // 鼠标y坐标
        this.element = document.querySelector('.B'); // 获取需要移动的元素
        if (this.style === null) { // h获取初始的style
          this.style = this.element.attributes.style.nodeValue;
        }
      },
      // 正在移动
      move(e) {
        if (this.readyMoveStatus) {
          this.x = this.winX + (e.clientX - this.readyX); // 计算移动的位置
          this.y = this.winY + (e.clientY - this.readyY);
          this.element.setAttribute('style',
            `${this.style} transform: translate(${this.x}px, ${this.y}px) !important; transition-duration: 0 !important; transition-property: none !important; transition-delay: 0 !important; transition-timing-function: linear !important;`
          ); // 设置style属性
        }
      },
      // 停止移动
      stopMove() {
        this.readyMoveStatus = false; // 停止移动
      },
      keyup(event) {
        if (event.keyCode === 27) {
          if (this.closing || this.newOptions.lock) {
            return;
          }
          this.close();
        }
      },
      closeBack(event) {
        if (event && (this.closing || this.newOptions.lock)) {
          return;
        }
        this.close();
      },
      close(mini = false) {

        // if (mini) {

        //   this.ATransition();
        //   // this.minMax = 'min';

        //   this.$store.dispatch('apcM', {
        //     options: {
        //       open: false
        //     },
        //     key: this._apcM.key
        //   });

        //   return
        // }

        this.ATransition();
        if (!this.components || this.components.length === 1) {
          this.MCls = 'M oO'
          this.options.open = false;
          this.options.direction = 'iU';
          this.readyX = 0;
          this.readyY = 0;
          this.winX = 0;
          this.winY = 0;
          this.x = 0;
          this.y = 0;
        }

        if (this.components) {
          let component = this.components[this.components.length - 1];
          if (typeof component.closeEvent === 'function') {
            component.closeEvent()
          }
        }

        this.$store.dispatch('apcM', {
          key: mini ? this._apcM.key : null,
          options: {
            open: false
          }
        });

      },
      touchStart(e) {
        if (this.newOptions.lock) return;
        // 目前仅支持direction为iD和iU
        this.distanceY = 0;
        this.startY = e.targetTouches[0].pageY;
        this.top = parseFloat(this.$refs.apcM_B.offsetTop||0);
        this.bottom = parseFloat(this.$refs.apcM_B.offsetHeight);
        return
        // 获取slot里面内容listU的滚动条高度（可能在组件里）
        if (this.$slots.mHtml.length > 0 && (this.$slots.mHtml[0].componentInstance.$refs.listU || (this.$slots.mHtml[0]
            .componentInstance.$children.length > 0 && this.$slots.mHtml[0].componentInstance.$children[0].$refs.listU
          ))) {
          const listU = this.$slots.mHtml[0].componentInstance.$refs.listU || (this.$slots.mHtml[0].componentInstance
            .$children.length > 0 && this.$slots.mHtml[0].componentInstance.$children[0].$refs.listU);
          if (this.direction.indexOf('iD') > -1) {
            this.toEdge = listU.scrollTop === 0;
          } else if (this.direction.indexOf('iU') > -1) {
            this.toEdge = listU.scrollTop + listU.clientHeight === listU.scrollHeight;
          }
        }
      },
      touchMove(e) {
        if (e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;
        if (this.direction.indexOf('iD') > -1) {
          this.distanceY = e.targetTouches[0].pageY - this.startY;
          if (this.startY < this.top) { // 在阴影处滑动时阻止默认事件
            e.preventDefault();
          }
          if (this.distanceY > 0 && ((Math.abs(this.startY - this.top) < 100) || this.toEdge)) {
            e.preventDefault();
            this.BStyle.top = (this.distanceY + this.top) + 'px !important';
            this.BStyle.transition = 'none';
          }
        } else if (this.direction.indexOf('iU') > -1) {
          this.distanceY = this.startY - e.targetTouches[0].pageY;
          if (this.bottom < this.startY) {
            e.preventDefault();
          }
          if (this.distanceY > 0 && (Math.abs(this.bottom - this.startY) < 100 || this.toEdge)) {
            e.preventDefault();
            this.BStyle.top = (-this.distanceY) + 'px !important';
            this.BStyle.transition = 'none';
          }
        }
      },
      touchEnd() {
        if (this.direction.indexOf('iD') > -1) {
          if (this.distanceY > 100 && (Math.abs(this.startY - this.top) < 100 || this.toEdge)) {
            this.BStyle.transition = 'all .4s,background 0s';
            this.close();
          }
        } else if (this.direction.indexOf('iU') > -1) {
          if (this.distanceY > 100 && (Math.abs(this.startY - this.bottom) < 100 || this.toEdge)) {
            this.BStyle.transition = 'all .4s,background 0s';
            this.close();
          }
        }
      },
      miniM() {
        this.ATransition();
        this.minMax = 'min';
      },
      maxM() {
        if (this.minMax === 'min' || this.minMax === 'max') {
          this.ATransition();
          this.minMax = true;
        } else {
          this.minMax = 'max';
          let calssVal = document.getElementsByClassName('A')[0].getAttribute('class');
          calssVal = calssVal + ' iL';
          document.getElementsByClassName('A')[0].setAttribute('class', calssVal)
        }
      },
      ATransition() {
        if (this.minMax === 'max') {
          let calssVal = document.getElementsByClassName('A')[0].getAttribute('class');
          calssVal = calssVal.replace('iL', '');
          document.getElementsByClassName('A')[0].setAttribute('class', calssVal)
        }
      }
    },
  };

</script>
<style>
  .fade-enter-to {
    /* .fade-leave-active 在低于版本 2.1.8 中 */
    transition: opacity 0s !important;
    opacity: 1 !important;
  }

  .fade-enter-active {
    opacity: 0 !important;
  }

  .fade-leave-active {
    opacity: 1 !important;
  }

  .fade-leave-to {
    transition: opacity .4s !important;
    opacity: 0 !important;
  }

  .M.sns.post .B:before {
    height: 0 !important;
  }

</style>
