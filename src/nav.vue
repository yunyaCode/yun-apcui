<template>
  <ul class="list">
    <li class="item" v-for="item in list">
      <router-link :to="'/'+item.name">
        <div class="title">{{item.name}}</div>
        <div class="desc">{{item.desc}}</div>
      </router-link>
    </li>
  </ul>
</template>
<script>
  import config from './configAll.json';
  export default{
    name: 'nav',
    data() {
      return {
        list: config
      }
    }
  }
</script>
<style lang="scss">
  @import "./assets/scss/apc-ui.scss";
  @import "./edu.scss";
  @import "./assets/scss/M.scss";
  @import "./assets/scss/m-opinion.scss";
  body{
    overflow-y: scroll !important;
  }
  .N{
    position: relative;
    z-index: 99999;
  }
  .h1{
    text-align: center; font-size: 30px;
  }
  .item {
    background-color: rgb(249, 250, 252);
    box-sizing: border-box;
    display: flex;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
    font-weight: normal;
    height: 56px;
    margin: 0 auto 20px;
    padding-bottom: 10px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 10px;
    max-width: 600px;
    -webkit-font-smoothing: antialiased;
  }

  .item a{
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 20px 0 20px;
    color: #5e6d82;
  }

  .item a .title {
    text-align: center;
    line-height: 36px;
    flex: 1;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-sizing: border-box;
    display: block;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
    height: 36px;
    -webkit-font-smoothing: antialiased;
    background-clip: border-box;
    background-color: rgb(211, 220, 230);
    background-image: none;
    background-origin: padding-box;
    background-position-x: 0%;
    background-position-y: 0%;
    background-size: auto;
  }

  .item a .desc {
    text-align: center;
    line-height: 36px;
    flex: 4;
    background-attachment: scroll;
    background-clip: border-box;
    background-color: rgb(229, 233, 242);
    background-image: none;
    background-origin: padding-box;
    background-position-x: 0%;
    background-position-y: 0%;
    background-size: auto;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: block;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
    font-weight: normal;
    height: 36px;
    min-height: 36px;
  }
</style>
