<template>
  <div class="apc-carousel" :class="cls">
    <div class="crs" :style="move">
      <div class="crs_i" v-for="(item,index) in img" :style="[{'background-image':'url('+item+')'}, {'left': index*100 + '%'}]"></div>
    </div>
    <apc-switch cls="s10" :length="img.length.toString()" :width="iconWidth" ref="switch"></apc-switch>
  </div>
</template>
<script>
  /**
   * apc-carousel
   * Created by lvxianfu on 2017/4/20.
   * @module components/轮播
   * @desc 轮播
   * @param {Array} [img] - 图片地址数组
   * @param {String} [cls] - 自定义样式
   * @param {String} [iconWidth] - 小圆圈宽
   * @param {String} [width] - 组件宽度
   * @param {String} [timeout] - 自动延迟时间（默认1s）
   * @param {Boolean} [auto] - 是否自动
   *
   * @example
   * <apc-carousel :img="config.img" :width="config.width" :iconWidth="config.iconWidth" auto/>
   */
  export default{
    name: 'apc-carousel',
    data() {
      return {
        move:{
          'transform': `translate3d(0,0,0)`,
          'transition-duration': '.4s'
        },
        timer: 0
      };
    },
    props: {
      img: Array,
      iconWidth: String,
      width: String,
      timeout: {
      	type: String,
        default: '1000'
      },
      auto: Boolean,
      cls: String
    },
    beforeDestroy() {
    	clearInterval(this.timer);
    },
    created() {
    	if (this.auto) {
    		let oIndex = 1;
    		this.timer = setInterval(()=>{
    			if (oIndex > this.img.length - 1) {
            oIndex = 1;
          } else {
            oIndex++;
          }
          this.$refs.switch.go(oIndex - 1);
    			this.move.transform = `translate3d(-${this.width*(oIndex-1)}px,0,0)`;
        }, this.timeout)
      }
    }
  };
</script>
