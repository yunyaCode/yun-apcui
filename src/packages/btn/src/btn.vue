<template>
  <a class="apc-btn" :class="cls" @click="event"><u v-if="!noSvg" class="icon" v-html-xss="svg">
  </u>{{newOptions.text}}</a>
</template>
<script>
  /**
   * apc-btn
   * Created by lvxianfu on 2017/4/20.
   * @module components/按钮
   * @desc 按钮
   * @param {String} [cls] - 自定义样式
   * @param {Boolean} [disabled] - 是否不可点击
   * @param {String} [text] - 按钮文本
   * @param {Boolean} [noSvg] - 是否不含svg
   * @param {String} [svg] - svg
   *
   * @example
   * <apc-btn :options="option1" cls="" @event="log" :svg="user"></apc-btn>
   */
  export default {
    name: 'apc-btn',
    data() {
      return {
        defaultOptions: {
          text:'',
          disabled:false
        },
      };
    },
    props: {
      cls:String,
      noSvg:Boolean,
      options: Object,
      svg:String
    },
    methods: {
      event() {
        if (this.newOptions.disabled === true) {
          return;
        }
        this.$emit('event');
      },
    },
    computed: {
      newOptions() {
        return Object.assign(this.defaultOptions, this.options);
      }
    }
  };
</script>
