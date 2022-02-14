<template>
  <span class="apc-loading" ref="loading"><u class="icon" v-html-xss="loading"></u></span>
</template>
<script>
  import loading from '../../../assets/svg/loading';
	export default{
		name: 'apc-loading',
    data() {
			return {
				loading
      }
    }
	}
</script>
