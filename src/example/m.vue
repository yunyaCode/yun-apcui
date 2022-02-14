<template>
  <div>
    <h1 class="h1">模态窗口</h1>
    <div class="input">
      <button @click="open(0)">基础样式</button>
      <button @click="open(1)">窗口被锁定的</button>
    </div>
    <apc-m :options="options0">
      <div slot="mHtml">我是测试</div>
    </apc-m>
    <apc-m :options="options1" ref="options1">
      <div slot="mHtml">
        <p>窗口被锁定</p>
        <button @click="close(1)">点击关闭窗口</button>
      </div>
    </apc-m>
  </div>
</template>
<script>
	export default{
		name: '',
    data() {
			return {
				options0: {
					direction: 'iU',
          open: false,
          height: '100px',
          cls: 'apcM'
        },
        options1: {
          direction: 'iU',
          open: false,
          height: '100px',
          cls: 'apcM',
          lock: true
        }
      }
    },
    methods: {
      open(index) {
        if (index === 0) {
        	this.options0.open = true;
        }
        if (index === 1) {
          this.options1.open = true;
        }
      },
      close(index) {
      	if (index === 1) {
      		this.$refs.options1.close();
        }
      }
    }
	}
</script>
<style>
  .apcM{
    position: absolute;
  }
  .apcM .B{
    top:100px;
  }
</style>
