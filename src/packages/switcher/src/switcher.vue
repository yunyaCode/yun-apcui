<template>
  <div class="apc-switcher" :class="[{on:newOptions.on,off:!newOptions.on}]">
    <label class="label">{{newOptions.txt}}</label>
    <a class="sw" :class="[{on:newOptions.on}]" @click="choose(newOptions.on)"><span class="sw_s"></span></a>
  </div>
</template>
<script>
  /**
   @module apc-switcher
   @param {options.<list> | <width> | <checked> | <length> } {object} apc-switch组件的参数
   @param {Number} [checkIndex] - 选中的index
   @param {Number} [cenWidth] - 宽度（百分比）
   @event choose 选择的回调事件
   @example<apc-switch :options="option" @choose="choose"/>
   */
  export default{
    name: 'apc-switcher',
    data() {
      return {
        defaultOptions: {
          on: true,
          txt: '',
        },
      };
    },
    props: {
      options: Object,
    },
    computed: {
      newOptions() {
        return Object.assign(this.defaultOptions, this.options);
      },
    },
    methods: {
      choose(on) {
        this.$emit('choose', !on);
        this.options.on = !on;
      },
    },
    watch: {
    },
    created() {
    },
    mounted() {
    },
  };
</script>
