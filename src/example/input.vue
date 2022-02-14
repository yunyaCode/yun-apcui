<template>
  <div>
    <h1 class="h1">输入框</h1>
    <div class="input">

      <label>1、基础样式</label>
      <div class="item">
        <apc-input :options="option"></apc-input>
      </div>

      <label>2、状态：聚焦（focus）</label>
      <div class="item">
        <apc-input :options="option0"></apc-input>
      </div>

      <label>3、状态：输入（type）</label>
      <div class="item">
        <apc-input :options="option1"></apc-input>
      </div>

      <label>4、状态：禁止输入（disable）</label>
      <div class="item">
        <apc-input :options="option2"></apc-input>
      </div>

      <label>5、状态：显示（view）</label>
      <div class="item">
        <apc-input :options="option3"></apc-input>
      </div>

      <label>6、验证</label>
      <div class="item">
        <apc-input :options="option" @blur="check"></apc-input>
      </div>

      <label>7、获得焦点</label>
      <div class="item">
        <apc-input :options="option" @focus="focus"></apc-input>
      </div>

      <label>8、撤销</label>
      <div class="item">
        <apc-input :options="option4" @undo="undo" @blur="saveNewValue"  @focus="saveOldValue"></apc-input>
      </div>

      <label>9、短信</label>
      <div class="item">
        <apc-input :options="option5" @sms="sms"></apc-input>
      </div>

      <label>10、图片</label>
      <div class="item">
        <apc-input :options="option6" @img="img"></apc-input>
      </div>

      <label>11、有小图标</label>
      <div class="item">
        <apc-input :options="option7"></apc-input>
      </div>
    </div>
  </div>
</template>
<script>
  import user from '../../src/assets/svg/user';
	export default{
		data() {
			return{
				index: 0,
        oldValue: '',
        option: {
          type: '*',
          cls: 'cls',
          title: '我是标题',
          placeholder: '我是占位',
          tip: '我是提示',
          value: ''
        },
        option0: {
          type: '*',
          title: '我是标题',
          placeholder: '我是占位',
          tip: '我是提示',
          value: '',
          isFocus: true
        },
        option1: {
          type: '*',
          title: '我是标题',
          placeholder: '我是占位',
          tip: '我是提示',
          value: '我是value',
          isType: true
        },
        option2: {
          type: '*',
          title: '我是标题',
          placeholder: '我是占位',
          tip: '我是提示',
          value: '我是value',
          disabled: true
        },
        option3: {
          type: '*',
          title: '我是标题',
          placeholder: '我是占位',
          tip: '我是提示',
          value: '我是value',
          view: true
        },
        option4: {
          type: '*',
          title: '我是标题',
          placeholder: '我是占位',
          tip: '我是提示',
          value: '我是value',
          isSave: false
        },
        option5: {
          type: 'sms',
          title: '我是标题',
          placeholder: '我是占位',
          tip: '我是提示',
          value: '我是value',
          isSms: false,
          smsText: "发送短信"
        },
        option6: {
          type: 'img',
          title: '我是标题',
          placeholder: '我是占位',
          tip: '我是提示',
          value: '我是value',
          imgStyle: "background: red"
        },
        option7: {
          type: 'img',
          title: '我是标题',
          placeholder: '我是占位',
          tip: '我是提示',
          value: '我是value',
          svg: user
        }
      }
    },
    methods: {
      check() {
      	alert('验证');
      },
      focus() {
      	if(this.index===0){
          this.index++;
          alert('你获得了焦点')
        }
      },
      saveOldValue() {
        this.oldValue = this.option4.value;
      },
      saveNewValue() {
      	this.option4.isSave = true;
      	let _this = this;
      	setTimeout(()=>{
      		_this.option4.isSave = false;
        },2000)
      },
      undo() {
        this.option4.value = this.oldValue;
        this.option4.isSave = false;
      },
      sms() {
      	this.option5.isSms = true;
      	let index = 0, _this = this;
      	let timer = setInterval(()=>{
          index++;
          _this.option5.smsText = index;
          if(index===60){
          	clearInterval(timer);
            _this.option5.smsText = '发好了';
          }
        },100)
      },
      img() {
        this.option6.imgStyle = 'background: yellow';
      }
    }
	}
</script>
<style>
  .cls{
    background: yellowgreen;
  }
</style>
