<template>
    <div>
      <h1 class="h1">按钮切换</h1>
      <apc-switcher :options="option" @choose="choose"/>
    </div>
</template>
<script>
export default {
  data() {
    return {
      option: {
        on: true,
        txt: 'open',
      },
    };
  },
  methods: {
    choose(on) {
      console.log(on);
    },
  },
};
</script>
