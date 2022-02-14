<template>
  <div class="P apc-map" style="padding-top: 100px;">
    <apc-map :data="data" @cancel="cancel" @submit="submit"></apc-map>
  </div>
</template>
<script>
	export default{
		name: '',
    data() {
			return {
				data: {
          region: '',
          street: '',
          pois: ''
        }
      }
    },
    methods: {
      cancel() {
      	console.log('cancel')
      },
      submit() {
      	console.log('submit')
      },
      log() {
      	console.log(this.data)
      }
    }
	}
</script>
