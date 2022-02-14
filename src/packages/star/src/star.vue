<template>
  <div class="apc-star" :class="cls" v-if="!newOptions.disabled">
    <u class="icon" :style="[{'width':(parseInt(newOptions.width)+1)*20+'%'}]"></u>
    <a class="star_i s1 " @click="update('0')" :class="{c:choose==='0'}" title="一星"></a>
    <a class="star_i s2 " @click="update('1')" :class="{c:choose==='1'}" title="二星"></a>
    <a class="star_i s3 " @click="update('2')" :class="{c:choose==='2'}" title="三星"></a>
    <a class="star_i s4 " @click="update('3')" :class="{c:choose==='3'}" title="四星"></a>
    <a class="star_i s5 " @click="update('4')" :class="{c:choose==='4'}" title="五星"></a>
    <span class="n">{{newOptions.text}}</span>
  </div>

  <div class="apc-star" :class="cls" v-else>
    <u class="icon" :style="[{'width':(parseFloat(newOptions.width)+1)*20+'%'}]"></u>
    <span class="n">{{newOptions.text}}</span>
  </div>
</template>
<script>
  /**
   * apc-star
   * Created by lvxianfu on 2017/4/20.
   * @module components/打星
   * @desc 打星
   * @param {string} [width] - 宽
   * @param {string} [choose] - 选中第几个
   * @param {string} [txt] - 文案
   * @param {String} [cls] - 自定义样式名
   * @param {boolean} [disabled] - 是否不可点击
   *
   * @example
   * <apc-star cls=""></apc-star>
   */
  export default{
    name: 'apc-star',
    data() {
      return {
        choose:'',
        defaultOptions:{
          text:'',
          disabled:false,
          width:''
        }
      }
    },
    computed: {
      newOptions() {
      	this.choose = this.options && this.options.width ? this.options.width : '';
        return Object.assign(this.defaultOptions, this.options);
      }
    },
    props: {
      options:Object,
      cls:String
    },
    methods: {
      update(index) {
//        this.choose = index;接口成功后再变色
        this.$emit('choose', index);
      },
    },
  };
</script>

