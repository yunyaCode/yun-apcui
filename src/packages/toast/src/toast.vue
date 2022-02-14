<template>
<span class="apc-toast" :class="cls" v-if="show" @webkitAnimationEnd="endEvent">
  <u class="icon" v-if="svg" v-html-xss="svg"></u>
  <i class="txt">{{text}}</i>
</span>
</template>
<script>
  export default{
    name: 'apc-toast',
    props: {
      cls: String,
      show: Boolean,
      svg: String,
      text: String
    },
    methods: {
      endEvent() {
      	this.$emit('endEvent');
      }
    }
  }
</script>
