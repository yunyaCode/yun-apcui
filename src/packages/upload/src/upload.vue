<template>
  <div class="file apc-file" :class="cls">
    <input id="file" type="file" class="none" multiple="" ref="file">
    <div class="f" @click="choose">
      <a class="add"><u v-html-xss="svg"></u></a>
    </div>
    <div class="mo">
      <apc-btn cls="back" text="返回" @event="back"></apc-btn>
      <apc-btn cls="upload" text="上传" @event="upload"></apc-btn>
    </div>
  </div>
</template>
<script>
  import svg from '../../../assets/svg/add';
	export default{
    name: 'apc-upload',
    data() {
			return{
				svg: svg
      }
    },
    props: {
			cls: String
    },
    methods: {
      back() {
      	this.$emit('back');
      },
      upload() {
        this.$emit('upload');
      },
      choose() {
      	this.$refs.file.click();
      }
    }
	}
</script>
