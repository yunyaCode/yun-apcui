<template>
  <div class="C addr">
    <div class="H b">
      <apc-btn cls="back" @event="cancel" :svg="backSvg"></apc-btn>
      <i class="txt">添加地址</i>
    </div>
    <div class="U">
      <div class="L form">
        <apc-input cls="region s1" title="地区信息" placeholder="选择地区" :value="region" svgCls="to" :svg="addrSvg" @event="addressFocus" view @svgEvent="addAddress" ref="address"></apc-input>
        <apc-input cls="street s1" title="街道地址" placeholder="输入详细地址" ref="street" :value="street"></apc-input>
      </div>
    </div>
    <div class="o">
      <a class="apc-btn submit" @click="submit"></a>
      <a class="apc-btn cancel" @click="cancel"></a>
    </div>
  </div>
</template>
<script>
  import backSvg from '../../../src/assets/svg/arrow';
  import addrSvg from '../../../src/assets/svg/address';
	export default{
		name: 'addr',
    data() {
			return{
        backSvg: backSvg,
        width: '',
        paddingTop: '',
        addrSvg: addrSvg,
        searchMsg: []
      }
    },
    props: {
      region: String,
      street: String
    },
    created() {
      let width = document.body.clientWidth;
      this.$set(this, 'width', `${width}px`);
      this.$set(this, 'paddingTop', `${width/16*9+45}px`);
    },
    methods: {
      addAddress() {
        this.$set(this.$parent, 'tab', 'GetMap');
      },
      cancel() {
      	this.$emit('cancel');
      },
      submit() {
        this.$emit('submit');
      },
      addressFocus() {
        this.$emit('addressFocus')
      }
    }
	}
</script>
