<template>
  <u class="apc-bar" :class="cls">
    <i class="cur" :style="[{'width':options.width+'%'}]">
      <b class="cur">{{options.width}}%</b>
      <a class="touch"></a>
    </i>
    <b class="target">100%</b>
  </u>
</template>
<script>
  /**
   @module apc-bar
   @param {options.<width>} {object} apc-bar组件的参数
   @example<apc-bar :options='option'/>
   */
  export default {
    name:'apc-bar',
    props: {
      options:Object,
      cls:String
    }
  }
</script>
