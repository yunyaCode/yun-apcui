<template>
  <div id="J_prismPlayer" class="prism-player"></div>
</template>
<script>
  //  import '../../../sdk/aliyun/prism-min';
  export default{
    name: 'apc-video-aly',
    props: {
      option: {
        type: Object
      },
      live: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
//      console.log(this.option)
      // 初始化播放器
      let reg=/^[https|http].+\.(mp4|avi|rmvb|3gp|flv)$/;
      let url;
      if (reg.test(this.option.videoUrl)) {
        url = this.option.videoUrl
      }

      let player = new prismplayer({
        id: 'J_prismPlayer',
        width: '100%',
        autoplay: false,
        vid: this.option.videoId,
        playauth: this.option.palyAuth,
        source: url,
        cover: this.option.coverURL,
        isLive: this.live
      });

      player.on('play', ()=>{
      	this.$emit('play');
      });

      player.on('pause', () => {
      	this.$emit('pause');
      })
    }
  }
</script>
