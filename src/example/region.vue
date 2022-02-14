<template>
  <div class="region">
    <apc-region :options="options" @back="back" @choose="choose"></apc-region>
  </div>
</template>
<script>
  import turnPage from '../../src/mixins/turnPage';
	export default{
		name: '',
    mixins: [turnPage],
    data() {
			return {
        options: [
          {
          	show: true,
            title: '选择省',
            cls: '',
            options: {
            	checked: [],
              options: [
                {
                  key: '北京',
                  value: 'a'
                },
                {
                  key: '上海',
                  value: 'b'
                },
                {
                  key: '浙江',
                  value: 'c'
                }
              ]
            }
          }
        ]
      }
    },
    methods: {
      back(index) {
      	console.log(index);
      },
      choose(param, index) {
      	this.options.push({
          show: true,
          title: '选择市',
          cls:'',
          options: {
            checked: [],
            options: [
              {
                key: '杭州',
                value: 'a'
              },
              {
                key: '宁波',
                value: 'b'
              },
              {
                key: '温州',
                value: 'c'
              }
            ]
          }
        });
        this.prev(index + 1, index, 'options');
      }
    }
	}
</script>
<style>
  .iR-leave-active {
    transform: translate3d(0, 0, 0) !important;
  }

  .iR-leave-to {
    transform: translate3d(-100%, 0, 0) !important;
  }

  .iR-enter-active {
    transform: translate3d(100%, 0, 0) !important;
  }

  .iR-enter-to {
    transform: translate3d(0, 0, 0) !important;
  }

  .iL-leave-active {
    transform: translate3d(0, 0, 0) !important;
  }

  .iL-leave-to {
    transform: translate3d(100%, 0, 0) !important;
  }

  .iL-enter-active {
    transform: translate3d(-100%, 0, 0) !important;
  }

  .iL-enter-to {
    transform: translate3d(0, 0, 0) !important;
  }

  .region .apc-btn{
    width: 100px;
    min-height: 100px;
    display: block;
    background: red;
  }
</style>
