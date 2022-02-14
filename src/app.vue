<template>
  <div class="A">
    <div class="P">
      <div class="C">
        <div class="N" v-if="$route.name !== 'index'" style="width: 100px">
          <apc-btn @event="back" text="返回" />
        </div>
        <div class="U">
          <div class="L">
            <h1 class="h1" v-if="$route.name === 'index'">apc-ui组件</h1>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/apc-ui.scss";
</style>
