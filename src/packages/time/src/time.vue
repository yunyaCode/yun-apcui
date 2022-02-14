<template>
  <time class="apc-time" :class="cls">{{timeago}}</time>
</template>
<script>
  /**
   * apc-time
   * @module time/时间
   * @desc 时间
   **/
  export default {
    name: 'apc-time',
    data(){
      return {
        oSince: this.since
      };
    },
    props: {
      cls: String,
      since: String,
    },
    computed: {
      timeago(){
      	let agent = navigator.userAgent.toLowerCase(), since = this.since;
        if (!since) return '无';
        if (!!agent.match(/iphone/i) || !!agent.match(/iPod/i) || !!agent.match(/ipad/i)) {
          since = since.replace(/-/g, "/");
        }
        since = since.replace(/-/g, "/");
        let now = new Date().getTime();
        let sinceTime = new Date(since).getTime();
        let difTime = now - sinceTime;
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let week = day * 7;
        let month = day * 30;
        if (difTime < 0) {
          return;
        }
        let monthC = difTime / month;
        let weekC = difTime / week;
        let dayC = difTime / day;
        let hourC = difTime / hour;
        let minC = difTime / minute;
        if (monthC >= 1) {
          if (this.since.indexOf(new Date().getFullYear())>-1) {
            return this.since.slice(5,16);
          } else {
            return this.since.slice(0,16);
          }
        } else if (weekC >= 1) {
          return parseInt(weekC) + '周前';
        } else if (dayC >= 1) {
          return parseInt(dayC) + '天前';
        } else if (hourC >= 1) {
          return parseInt(hourC) + '小时前';
        } else if (minC >= 1) {
          return parseInt(minC) + '分钟前';
        } else {
          return '刚刚';
        }
      }
    }
  }
</script>
