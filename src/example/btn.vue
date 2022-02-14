<template>
  <div>w
    <!-- <apc-btn :options="option1" cls="" @event="log" :svg="user"></apc-btn>
    <apc-btn :options="option2" @event="log"></apc-btn> -->
  </div>
</template>
<script>
  import user from '../../src/assets/svg/user';
  export default {
    name: 'btn',
    data() {
      return {
        user:user,
        option1: {
          text: '按钮1',
          disabled:false
        },
        option2: {
          text: '按钮2',
          disabled:false
        },
      };
    },
    methods: {
      log() {
        console.log(this.option1.text);
      },
    }
  };
</script>
