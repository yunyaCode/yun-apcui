<template>
  <div class="mD">
    <apc-video :options="option"></apc-video>
  </div>
</template>
<script>
  export default{
    name: 'video',
    data(){
		    return{
		        option:{
		          url:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
              pWidth:600,
              hasVideo: true,
              cover:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496403617248&di=be2b416eae822e6c0fcbd3d621b082ce&imgtype=0&src=http%3A%2F%2Fimage.thepaper.cn%2Fwap%2Fimage%2F4%2F59%2F951.jpg"
            }
        }
    }
	}
</script>
