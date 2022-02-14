<template>
  <div class="apc-clip" :class="cls">
    <div class="origin ">
      <!-- <span class="from mb "> -->
      <a class="upload" v-html-xss="svg" @click="choose"></a>
      <input class="file" type="file" ref="file" accept="image/jpeg,image/png" @change="preview"/>
      <!-- </span> -->
      <div class="img" style="position: relative;" :style="[{'background-image':`url(${imgUrl})`}]"></div>
    </div>
    <div class="preview " style="">
      <div class="p200"></div>
      <div class="p100"></div>
      <div class="p50"></div>
      <div class="p20"></div>
    </div>
  </div>
</template>
<script>
  import svg from '../../../assets/svg/cloudUpload';
	export default{
		name: 'apc-clip',
    data() {
      return {
        svg: svg,
        imgUrl: ''
      }
    },
    props: {
			cls: String
    },
    methods: {
      choose() {
      	this.$refs.file.click();
      },
      preview() {

      }
    }
	}
</script>
