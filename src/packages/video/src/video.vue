<template>
  <div :id="'apcVideo_'+newOptions.id" class="apc-video"
    :class="[{'pause': videoStatus===10},{'trial':adminTrial&&!loading&&canShowVideo&&canInit}]"
    :style="[{width: `${$store.getters.isPc?newOptions.width+'px!important':'100%'}`, height:(!videoH||videoH==0)&& newOptions.pWidth !=='' ? `${newOptions.pWidth/16*9}px` : `${videoH>0?videoH+'px!important':'100%'}`,'background-image': 'url('+newOptions.coverURL+')'}]">
    <!--试用课程倒计时-->

    <div class="trial" v-if="playTrialTime">
      <span class="t video">{{playTrialTime}}</span>
    </div>

    <!--阿里播放组件-->
    <div :id="'J_prismPlayer_'+newOptions.id" class="prism-player" v-show="canShowVideo&&!showPlayButton"></div>
    <!--视频播放次数-->

    <div class="prism-big-play-btn" @click="startPlay"
      v-if="(showPlayButton||!canInit)&&canShowVideo||videoH&& player&&['pause'].includes(player.getStatus())">

      <u class="icon" v-html-xss="svg.avplay"></u>
    </div>

    <!--为了防止直播多清晰度组件报错-->
    <div class="prism-setting-item prism-setting-quality none"></div>
    <!--为了防止直播多清晰度组件报错-->

    <!--<div class="count" :class="{oO:!isCtrl,live:live}">{{live? newOptions.liveCount:newOptions.playCount}}</div>-->
    <div class="count none">
      <b class="view">{{newOptions.browseCount}}</b>
      <b class="live" v-if="live">{{newOptions.liveCount}}</b>
    </div>
    <!--视频播放相关的动作【开课提醒，购买，回放提醒。。。】-->
    <slot name="videoAction"></slot>
    <apc-loading v-if="loading&&canShowVideo&&!showPlayButton"></apc-loading>
  </div>
</template>
<script>
  /**
   @module apc-video
   @param {options.<pWidth> | <url> | <cover> } {object} apc-video组件的参数
   @param {Array} [svg] - 按钮图标
   @param {String} [cTime] - 当前进度
   @param {String} [tTime] - 总进度
   @param {Number} [disX] - 进度条移动的距离
   @param {Number} [startPositionX] - 手势拖动的起始位置
   @param {Boolean} [isMove] - 是否在移动
   @param {Boolean} [isPlay] - 是否在播放
   @param {Boolean} [isCtrl] - 控制器是否出现
   @param {Object} [timer1] -定时器1（每隔一秒时间+1）
   @param {Object} [timer2] -定时器2（进度条的走动）
   @param {Object} [timer3] -定时器3（开始播放2秒后控制器消失）
   @param {Object} [timer4] -定时器4（鼠标不移动2秒后控制器消失）
   @event toZero toTime 把时间变为00:00:00的格式
   @event playPause 播放暂停
   @event full 全屏
   @event stop 停止播放回到起点
   @event down move up 鼠标拖动进度条
   @event touchStart touchMove touchEnd 手势拖动进度条
   @event mouseMove mouseOut 鼠标移入移出视频
   @event change 苹果设备时控制器消失
   @example <apc-video :options="option"/>
   */
  import {
    avplay
  } from '../../../assets/svg/index';

  export default {
    name: "apc-video",
    data() {
      return {
        svg: {
          avplay
        },
        isCtrl: false,
        start: false,
        time: "",
        date: "",
        defaultOption: {
          id: 0,
          pWidth: "",
          playCount: "0",
          palyAuth: null,
          fn: "",
          liveCount: "0",
          browseCount: "0",
          startTime: "",
          coverURL: ""
        },
        player: null,
        end: false,
        loading: false,
        canQuality: true,
        playTrialTime: null,
        trialInterval: null,
        adminTrial: false,
        showPlayButton: false,
        liveStreamStop: false,
        canInit: !this.trial,
      };
    },
    props: {
      option: {
        type: Object
      },
      live: {
        type: Boolean,
        default: false
      },
      canShowVideo: {
        type: Boolean,
        default: false
      },
      videoStatus: {
        type: Number,
        default: 1
      },
      trialTime: {
        type: Number,
        default: 0
      },
      isTed: {
        type: Boolean,
        default: false
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      trial: {
        type: Boolean,
        default: false
      },
      currentTime: {
        type: Number,
        default: 0
      },
      videoH: {
        type: Number,
        default: 0
      },
    },
    watch: {
      trial: function (data) {

        if (this.adminTrial && !data) {
          this.canInit = true
          this.init();
        }

        this.adminTrial = data;
      },
      canShowVideo: function (data) {
        this.canInit = !this.trial
        this.init();
      }
    },
    computed: {
      newOptions() {
        return Object.assign(this.defaultOption, this.option);
      }
    },
    created() {

      if (this.canVideoVertical) {
        this.switchVH(true)
      }
    },
    mounted() {

      this.canInit = !this.trial
      this.init();
    },
    methods: {

      switchVH(canVertical = false) {

        // if (canVertical) {
        //   this.videoH = window.document.body.offsetHeight; //window.screen.availHeight // window.document.body.offsetHeight;
        // } else {
        //   this.videoH = null
        // }

      },

      autoPlay() {

        const isDD = !!this.$store.getters.userAgent.match(/dingtalk/i);
        const isIOS = !!this.$store.getters.userAgent.match(/iphone/i);
        const isAndroid = !!this.$store.getters.userAgent.match(/android/i);
        const isWX = !!this.$store.getters.userAgent.match(/micromessenger/i);
        const isPc = this.$store.getters.isPc
        const live = this.live;
        const useFlv = this.newOptions.videoUrl && this.newOptions.videoUrl.includes('flv');

        //不能自动播放的，放出按钮【ios：微信，浏览器】，【安卓：微信】，【pc端flv播放】
        this.showPlayButton = isIOS && isWX || isIOS && !isDD && !isWX || isAndroid && isWX || isPc && !useFlv;
        this.showPlayButton = !this.newOptions.autoPlay && this.showPlayButton
      },
      startPlay() {

        if (!this.player) {
          this.canInit = true
          this.init()
          setTimeout(() => {
            this.loading = true;
            this.player.play();
            this.showPlayButton = false
            this.loading = false;
          }, 2000)
          return
        }
        this.loading = true;
        this.player.play();
        this.showPlayButton = false
        this.loading = false;
      },
      init() {

        this.adminTrial = this.trial;

        if (this.canShowVideo && this.canInit) {

          this.loading = true;
          setTimeout(() => {
            this.initVideo();

            if (!(this.live && this.isPc())) {
              this.setCrossOrigin();
            }
          }, 300);
        } else {}
      },

      isPc() {
        const userAgentInfo = window.navigator.userAgent.toLowerCase();
        const Agents = [
          "android",
          "iphone",
          "symbianos",
          "windows phone",
          "ipad",
          "ipod",
          "dingtalk"
        ];
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > -1) {
            flag = false;
            break;
          }
        }
        return flag;
      },
      initVideo() {
        if (this.player && this.player.loaded) {
          this.loading = false;

          return;
        }


        //初始化是否自动播放
        this.autoPlay();


        // 初始化播放器
        const reg = /^[https|http].+\.(mp4|avi|rmvb|3gp|flv)$/;
        let url;
        if (reg.test(this.option.videoUrl) || this.live) {
          url = this.newOptions.videoUrl;
        }

        const $this = this;

        const useFlv = url && url.includes('flv');

        const AliplayerConfig = {
          id: "J_prismPlayer_" + this.newOptions.id,
          width: "100%",
          autoplay: this.autoplay, // this.live 默认自动播放
          vid: this.newOptions.videoId,
          playauth: this.newOptions.palyAuth,
          source: url,
          cover: this.newOptions.coverURL,
          isLive: this.live,
          preload: true,
          rePlay: true,
          useH5Prism: !useFlv,
          useFlashPrism: useFlv,
          playsinline: true,
          controlBarVisibility: this.isPc() ? "hover" : "click",
          showBarTime: "3000",
          // waitingTimeout: 1,
          liveRetry: 60,
          components: [],
          extraInfo: {
            crossOrigin: "anonymous"
          },
          qualitySort: "desc",
          skinLayout: [{
            name: "controlBar",
            align: "blabs",
            x: 0,
            y: 0,
            children: [{
                name: "progress",
                align: "tlabs",
                x: 0,
                y: 0
              },
              {
                name: "playButton",
                align: "tl",
                x: 15,
                y: 12
              },
              {
                name: "fullScreenButton",
                align: "tr",
                x: 10,
                y: 12
              },
              {
                name: "timeDisplay",
                align: "tl",
                x: 10,
                y: 7
              },
              {
                name: "speedButton",
                align: "tr",
                x: 10,
                y: 12
              },
              {
                name: "snapshot",
                align: "tr",
                x: 5,
                y: 12
              }
            ]
          }]
        };

        if (this.videoH > 0) {
          AliplayerConfig.height = this.videoH + 'px!important'
        }

        if (this.newOptions.defaultDefinition) {
          AliplayerConfig.defaultDefinition = this.newOptions.defaultDefinition //'HD'
        } else {
          // 是否使用多清晰度切换功能
          if (this.canQuality) {
            AliplayerConfig.components.push({
              name: "QualityComponent",
              type: XinyaPlayerComponent.QualityComponent
            });
          }
        }

        // 是否可以试用观看

        if (this.trialTime > 0) {
          AliplayerConfig.components.push({
            name: "PreviewVodComponent",
            type: XinyaPlayerComponent.PreviewVodComponent,
            args: [
              this.trialTime,
              `<div class="endPreview">试听结束，完整课程请  <a id="buyClick" class="vip_limit_btn">购买</a></div>`,
              ""
            ]
          });
        }

        const that = this;

        this.player = new Aliplayer(AliplayerConfig, () => {


          document.getElementsByClassName("prism-controlbar")[0].style.display =
            "none";
          // document
          //   .getElementsByTagName("body")[0]
          //   .addEventListener("touchstart", this.touchstartListener);

          if (this.trialTime > 0 && this.player) {
            this.initTrialTime();

            const centerEL = document.createElement("div");
            centerEL.className = "center none";
            document
              .getElementById(`J_prismPlayer_${that.newOptions.id}`)
              .appendChild(centerEL); // 为了防止报错 classList

            document
              .querySelector(".vip_limit_btn")
              .addEventListener("click", () => {
                that.$parent.buy(res => {
                  if (res) location.reload();
                  else alert("购买失败！");
                });
              });
          }

          //初始化截图参数
          // this.player.setSanpshotProperties(400, 225, 1)

          // //记忆播放
          // let currentTime = that.currentTime || 0
          // alert(`currentTime=${currentTime}`)
          // if (currentTime > 1) {
          //   that.player.seek(currentTime)
          // }
          that.$emit("initPlayer", that.player);

        });


        this.player.on("snapshoted", data => {
          this.$emit("snapshoted", data.paramData);
        });

        let seeked = false;
        this.player.on('canplaythrough', function (e) {
          if (!seeked) {
            seeked = true;
            that.player.seek(that.currentTime || 0);
          }
        });

        /* 注册播放器的 sourceloaded, 获取当前播放视频的清晰度, 获取清晰度组件, 并调用组件的setCurrentQuality方法设置播放器清晰度 */
        this.player.on("sourceloaded", params => {
          const paramData = params.paramData;

          if (!this.live) return

          let desc = paramData.desc;
          let definition = paramData.definition;

          if (
            !this.canQuality ||
            this.player.getStatus() === "init" ||
            !this.player.getStatus()
          ) {
            let url = this.player._urls[0];

            desc = url.desc;

            definition = url.definition; // this.currentTime
            // alert(definition)
            this.player
              .getComponent("QualityComponent")
              .setCurrentQuality(desc, definition);

            //  //.find(url => url.definition === definition);

            this.player.loadByUrl(
              url.Url,
              this.player.getCurrentTime(),
              true,
              true
            );
          }
        });

        let ready = null;

        this.player.on("ready", () => {
          ready = setInterval(() => {
            if (!this.player || this.player.getStatus() !== "ready") {
              clearInterval(ready);
              return;
            }

            if (
              document
              .getElementById(`J_prismPlayer_${this.newOptions.id}`)
              .getElementsByTagName("video")[0] && !this.showPlayButton
            ) {
              document
                .getElementById(`J_prismPlayer_${this.newOptions.id}`)
                .getElementsByTagName("video")[0]
                .play();
            }
          }, 300);

          this.loading = false;
          this.$emit("ready", this.player);
        });

        this.player.on("play", () => {


          if (this.showPlayButton) {
            this.player.pause()
          }

          if (document.getElementsByClassName("prism-controlbar")[0]) {
            document.getElementsByClassName("prism-controlbar")[0].style.display =
              "block";
          }
          // alert(`play.this.player.getStatus()===${this.player.getStatus()}`)
          const prismCover = document
            .getElementById(`J_prismPlayer_${this.newOptions.id}`)
            .getElementsByClassName("prism-cover")[0];
          if (prismCover) {
            prismCover.style.display = "none";
          }

          this.$emit("play", this.player);
          this.isCtrl = true;
        });

        this.player.on("pause", () => {
          this.$emit("pause");
          this.isCtrl = false;

          // alert(`pause=${$this.player.getStatus()}`)

          if ($this.live && !this.showPlayButton && !window.isBotApp) {
            $this.player.play();
          }
        });

        this.player.on("ended", () => {
          this.$emit("ended");
          this.isCtrl = false;
        });

        // let liveStreamStopInterval = setInterval(() => {
        //   if (this.liveStreamStop) {
        //     this.$emit("liveStreamStop");
        //     clearInterval(liveStreamStopInterval);
        //   }
        // }, 3000);

        // this.player.on("liveStreamStop", e => {
        //   this.liveStreamStop = true;
        // });

        this.$store.dispatch("playerMap", {
          key: this.newOptions.id,
          val: this.player
        });

        this.$emit("initPlayer", this.player);

        console.log('  this.player====', this.player)
      },

      setCrossOrigin() {
        let hasVideo = false;
        do {
          if (document.getElementsByTagName("video").length > 0) {
            hasVideo = true;

            if (
              document
              .getElementById(`J_prismPlayer_${this.newOptions.id}`)
              .getElementsByTagName("video")[0].crossOrigin
            ) {
              document
                .getElementById(`J_prismPlayer_${this.newOptions.id}`)
                .getElementsByTagName("video")[0].crossOrigin = "*";
            }
          }
        } while (!hasVideo);
      },
      touchstartListener() {
        if (this.player.getStatus() === "pause") return;
        document
          .getElementById(`J_prismPlayer_${this.newOptions.id}`)
          .getElementsByTagName("video")[0]
          .play();
      },

      initTrialTime() {
        let init = time => {
          if (time < 1) {
            this.playTrialTime = null;

            clearInterval(this.trialInterval);

            // this.player.dispose()

            return;
          }

          //渲染
          let min =
            Math.floor(time / 60) > 9 ?
            Math.floor(time / 60) :
            `0${Math.floor(time / 60)}`;
          let second =
            Math.floor(time % 60) > 9 ?
            Math.floor(time % 60) :
            `0${Math.floor(time % 60)}`;

          this.playTrialTime = `${min}:${second}`;
        };

        init(this.trialTime);

        clearInterval(this.trialInterval);
        this.trialInterval = setInterval(() => {
          init(this.trialTime - parseInt(this.player.getCurrentTime()));
        }, 1000);
      }
    },
    beforeDestroy() {
      // document
      //   .getElementsByTagName("body")[0]
      //   .removeEventListener("touchstart", this.touchstartListener);

      if (this.player) {
        this.$store.dispatch("playerList", {
          key: this.newOptions.id,
          val: this.player.getCurrentTime() || 0
        });
      }

      this.player = null;

      delete this.player;
    }
  };

</script>
<style>
  .prism-speed-selector,
  .prism-marker-text,
  .prism-stream-selector,
  .preview-vod-close,
  .preview-component-tip {
    display: none;
  }

  .apc-video .trial {
    position: absolute;
    top: 0;
    padding-top: 0.1rem;
    width: 100%;
    z-index: 200;
    text-align: center;
  }

  .apc-video .trial .t {
    display: inline;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.3rem 1rem;
    border-radius: 0.3125rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    color: #fff;
  }

  .endPreview {
    font-size: 1rem;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }

  .prism-player .endPreview a {
    font-size: 1rem;
    color: #fff;
    text-decoration: underline;
  }

  .apc-video .trial .video:before {
    content: "课程试看中：";
  }

  .preview-vod-component .preview-component-layer {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .prism-snapshot-btn {
    display: none !important;
  }

  .quality-components .quality-list li:nth-child(2) {
    display: none;
  }

  .quality-components .quality-list li:last-child {
    display: block !important;
  }

</style>
