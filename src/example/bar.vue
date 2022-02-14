<template>
  <div>
    <apc-bar :options="option"></apc-bar>
    <apc-btn :options="btn" @event="show"></apc-btn>
  </div>
</template>
<script>
  export default{
    name: 'bar',
    data() {
    	return {
        cls:'green',
        option:{
          oWidth: 0,
        },
        btn: {
          text: '狂点这里',
        }
      }
    },
    methods: {
    	show() {
    		let timer, index=0;
    		let _this = this;
    		timer = setInterval(()=>{
    			index++;
    			_this.option.oWidth = index;
    			if(index>=100){
            _this.option.oWidth=index=0;
    				clearInterval(timer);
          }
        },1000);
      }
    }
  };
</script>
