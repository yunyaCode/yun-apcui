<template>
  <div>
    <apc-load more refresh @refresh="refreshEvent" @more="moreEvent" :status="status" ref="load">
      <div>哈哈哈哈</div>
      <div>哈哈哈哈</div>
      <div>哈哈哈哈</div>
      <div>哈哈哈哈</div>
      <div>哈哈哈哈</div>
      <div>哈哈哈哈</div>
      <div>哈哈哈哈</div>
      <div>哈哈哈哈</div>
      <div>哈哈哈哈</div>
    </apc-load>
  </div>

</template>
<script>
  export default{
    name: 'loadMore',
    data() {
    	return{
    		status: {
          over: false
        }
      }
    },
    methods: {
      moreEvent() {
      	let _this = this;
        setTimeout(() => {
          _this.status.over = true;
        }, 3000);
      },
      refreshEvent() {
        let _this = this;
        setTimeout(() => {
          _this.status.over = true;
        }, 3000);
      }
    }
  };
</script>
