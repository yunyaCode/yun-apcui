<template>
<!-- transformY: `translate3d(0, ${-range/2}px, 0)` -->
  <div :class="cls" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" ref="load"
    :style="{top:` ${-range/2}px`, transition,height:'100%'}">
    <div class="apc-load refresh" :class="refreshStatus" v-if="refresh" style="height: 120px; margin-top: -120px;">
      <i v-if="refreshStatus!=='refreshing'">{{refreshText}}</i>
      <i v-if="refreshStatus==='refreshing'">
        <span class="apc-loading">
          <u class="icon" v-html-xss="loadingIcon"></u>
        </span>
      </i>
    </div>
    <slot name="more"></slot>
    <slot name="list"></slot>
    <div v-if="more && inMore" class="apc-load more refreshing">
      <i>
        <span class="apc-loading">
          <u class="icon" v-html-xss="loadingIcon"></u>
        </span>
      </i>
    </div>
  </div>
</template>
<script>
  /**
   *
   @update by lvxianfu 17.9.21
   @module apc-loadMore
   @props cls {string} 样式
   @props refresh {Boolean} 是否需要刷新
   @props more {Boolean} 是否需要加载更多
   @props refreshed {function} 刷新回调
   @props loadMore {function} 加载更多回调
   @data refreshStatus {string} 下拉刷新状态 'pull', 'release', 'refreshing', 'done'
   @data loadingIcon {string} loading图标
   @data refreshText {string} 刷新时的提示
   @data position {number} 开始滑动的起始位置
   @data move {number} 移动的距离
   @data transition {string} 刷新恢复的动画
   @data inRefresh {boolean} 是否正在刷新
   @data inMore {boolean} 是否正在加载
   @data range {number} style的距离
   @example
   <apc-load cls="load" more refresh :refreshed='refreshed' :loadMore="loadMore">
   <div slot="list" class="list"></div>
   </apc-load>
   */
  import loadingIcon from "../../../assets/svg/loading";

  export default {
    name: "apc-load",
    data() {
      return {
        refreshStatus: "done",
        loadingIcon,
        refreshText: "",
        position: 0,
        move: 0,
        transition: "all 0s ease 0s",
        inRefresh: false,
        inMore: false,
        over: false,
        range: 0,
        startX: 0,
        distanceX: 0,
        speedT: 0,
      };
    },
    props: {
      cls: String,
      refresh: {
        type: Boolean,
        default: false
      },
      more: {
        type: Boolean,
        default: false
      },
      emitEvent: {
        type: Boolean,
        default: false
      },
      refreshed: Function,
      loadMore: Function,
      scrollevent: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      touchstart(e) {
        this.transition = "all 0s ease 0s";
        this.position = e.touches[0].screenY;
        this.startX = e.touches[0].screenX;
        console.log('touchstart.load,e=', e)
        this.speedT = new Date().getTime();
        this.$emit('hasScroll', this.$refs.load.scrollHeight - this.$refs.load.offsetHeight > 0)

      },
      touchmove(e) {

        this.$emit('scrollTop', this.$refs.load.scrollTop)

        console.log('this.$refs.load.scrollTop....', e, this.$refs.load.offsetHeight, this.$refs.load.scrollHeight, this
          .$refs.load.scrollTop)
        // e.preventDefault();
        this.move = this.position - e.touches[0].screenY;

        if (!this.refresh) {
          // e.preventDefault();
          return
        }
        this.distanceX = this.startX - e.touches[0].screenX;
        if (this.$refs.load.scrollTop === 0 && this.move <= 0 && this.refresh) {
          this.inRefresh = true;
          e.preventDefault();
        } else {
          this.inRefresh = false;
        }

        if (this.over) {
          //          e.preventDefault()
          this.inMore = false;
          return;
        }
        if (
          this.$refs.load.scrollTop + this.$refs.load.offsetHeight >=
          this.$refs.load.scrollHeight &&
          this.move >= 0
        ) {
          this.a = 1;
          this.inMore = true;
          //          e.preventDefault()
        }

        if (this.inRefresh && !this.over) {
          this.range = this.move;
          if (this.move > -50) {
            this.refreshStatus = "pull";
            this.refreshText = "下拉刷新";
          } else if (this.move < -50 && this.move > -100) {
            this.refreshStatus = "release";
            this.refreshText = "释放刷新";
          }
        }
      },
      async touchend() {

        // alert(`touchend=${this.move}`)
        if (Math.abs(this.move) > 0 && this.emitEvent && ((new Date().getTime() - this.speedT) < 200)) {
          this.$emit('fastTouch', this.move);
          setTimeout(() => {
            this.move = 0
          }, 200)
          return
        }

        if (Math.abs(this.move) < 100) {
          if (this.distanceX > 100) {
            // 往左滑
            this.$emit("swiperLeft");
          } else if (this.distanceX < -100) {
            // 往右滑
            this.$emit("swiperRight");
          }
        }
        if (this.inRefresh) {
          this.inRefresh = false;
          this.over = true;
          if (this.move < -100) {
            this.refreshStatus = "refreshing";
            await this.refreshed();
            this.refreshText = "刚刚刷新";
            this.refreshStatus = "done";
            this.transition = "all 1s cubic-bezier(0,.6,0,.9) 0.5s";
            this.move = 0;
          } else {
            this.refreshStatus = "done";
            this.transition = "all 1s cubic-bezier(0,.6,0,.9) 0.5s";
            this.move = 0;
          }
          this.range = this.move;
          this.over = false;
        } else if (this.inMore) {
          this.over = true;
          await this.loadMore();
          this.inMore = false;
          this.over = false;
        }

        this.move = 0;
      },
      async scrollLoad() {
        // console.log('this.$refs.load.scrollTop=', this.$refs.load.scrollTop)
        if (
          this.$refs.load.scrollTop + this.$refs.load.offsetHeight >=
          this.$refs.load.scrollHeight - 100 &&
          !this.over
        ) {
          this.over = true;
          this.inMore = true;
          const result = await this.loadMore();
          this.inMore = false;
          if (result) {
            this.over = false;
          }
        }

        this.scrollevent(this.$refs.load.scrollTop);
      }
    },
    mounted() {
      const load = this.$refs.load;
      load.addEventListener("scroll", this.scrollLoad);
      //  console.log('this.$refs.load.scrollTop.mounted...',this.$refs.load.offsetHeight,this.$refs.load.scrollHeight,this.$refs.load.scrollTop)

    }
  };

</script>
