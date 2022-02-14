<template>
  <div>
    <h1 class="h1">文本域</h1>
    <div class="textareas">
      <label>1.基础样式</label>
      <div class="item">
        <apc-textarea :options="option" @check="check0" @focus="focus" @blur="blur"></apc-textarea>
      </div>
      <label>2.状态：聚焦(focus)</label>
      <div class="item">
        <apc-textarea :options="option0" ></apc-textarea>
      </div>
      <label>3.状态：输入(type)</label>
      <div class="item">
        <apc-textarea :options="option1" ></apc-textarea>
      </div>
      <label>4.状态：禁止输入(disabled)</label>
      <div class="item">
        <apc-textarea :options="option2" ></apc-textarea>
      </div>
      <label>5.状态：显示(view)</label>
      <div class="item">
        <apc-textarea :options="option3" ></apc-textarea>
      </div>
      <label>6.验证：不为空</label>
      <div class="item">
        <apc-textarea :options="option" @check="check0"></apc-textarea>
      </div>
      <label>7.撤销（undo）</label>
      <div class="item">
        <apc-textarea :options="option4" @undo="undo" @blur="saveNewValue" @focus="saveOldValue"></apc-textarea>
      </div>
      <label>8.发表详细内容（图文混排，点击图片插入序号）</label>
      <div class="item" ref="item">
        <apc-textarea :options="option5" @focus="focus"></apc-textarea>
        <apc-btn :options="btn" @event="uploadInfo"></apc-btn>
      </div>
      <label>9.发表评论（图文不混排，点击图片删除图片）</label>
      <div class="item">
        <apc-textarea :options="option6" @focus="focus"></apc-textarea>
        <apc-btn :options="btn" @event="uploadComment"></apc-btn>
      </div>
      <label>10.插入表情</label>
      <div class="item" ref="emojiContent">
        <apc-textarea :options="option7" @focus="focus"></apc-textarea>
        <apc-btn :options="btn" @event="uploadEmoji" v-show="!option7.showEmoji"></apc-btn>
      </div>
    </div>
  </div>
</template>
<script>
  import emoji_01 from '../../src/assets/svg/emoji/emoji_01';
  import emoji_02 from '../../src/assets/svg/emoji/emoji_02';
  import emoji_03 from '../../src/assets/svg/emoji/emoji_03';
  import emoji_04 from '../../src/assets/svg/emoji/emoji_04';
  import emoji_05 from '../../src/assets/svg/emoji/emoji_05';
  import emoji_06 from '../../src/assets/svg/emoji/emoji_06';
  import emoji_07 from '../../src/assets/svg/emoji/emoji_07';
  import emoji_08 from '../../src/assets/svg/emoji/emoji_08';
  import emoji_09 from '../../src/assets/svg/emoji/emoji_09';
  import emoji_10 from '../../src/assets/svg/emoji/emoji_10';
  import emoji_11 from '../../src/assets/svg/emoji/emoji_11';
  import emoji_12 from '../../src/assets/svg/emoji/emoji_12';
  import emoji_13 from '../../src/assets/svg/emoji/emoji_13';
  import emoji_14 from '../../src/assets/svg/emoji/emoji_14';
  import emoji_15 from '../../src/assets/svg/emoji/emoji_15';
  import emoji_16 from '../../src/assets/svg/emoji/emoji_16';
  import emoji_17 from '../../src/assets/svg/emoji/emoji_17';
  import emoji_18 from '../../src/assets/svg/emoji/emoji_18';
  import emoji_19 from '../../src/assets/svg/emoji/emoji_19';
  import emoji_20 from '../../src/assets/svg/emoji/emoji_20';

  export default{
    data(){
      return{
        oldValue: '',
        option:{
          type:'*',
          title:'课程介绍',
          placeholder:'输入课程介绍',
          tip:'输入规则的提示',
          error:'检测的错误信息',
          value:''
        },
        option0:{
          type:'*',
          title:'课程介绍',
          placeholder:'输入课程介绍',
          tip:'输入规则的提示',
          value:'',
          isFocus:true
        },
        option1:{
          type:'*',
          title:'课程介绍',
          placeholder:'输入课程介绍',
          tip:'输入规则的提示',
          value:'文本域内容',
          isType:true
        },
        option2:{
          type:'*',
          title:'课程介绍',
          placeholder:'输入课程介绍',
          tip:'输入规则的提示',
          value:'文本域内容',
          disabled:true
        },
        option3:{
          type:'*',
          title:'课程介绍',
          placeholder:'输入课程介绍',
          tip:'输入规则的提示',
          value:'文本域内容',
          view:true
        },
        option4:{
          type:'*',
          title:'课程介绍',
          placeholder:'输入课程介绍',
          tip:'输入规则的提示',
          value:'',
          isSave:false
        },
        option5:{
          type:'*',
          title:'课程介绍',
          placeholder:'输入课程介绍',
          tip:'输入规则的提示',
          value:'',
          isError: false,
          havePic:true,
          imgList:[],
          isInsert:true,
          isType:false,
        },
        option6:{
          type:'*',
          title:'课程介绍',
          placeholder:'输入课程介绍',
          tip:'输入规则的提示',
          value:'',
          isError: false,
          havePic:true,
          imgList:[],
          isInsert:false,
        },
        option7:{
          type:'*',
          title:'课程介绍',
          placeholder:'输入课程介绍',
          tip:'输入规则的提示',
          value:'',
          isError: false,
          havePic:true,
          imgList:[],
          isInsert:false,
          haveEmoji:true,
          showEmoji:false,
          emoji:[{name:"眨眼",svg:emoji_01},{name:"大笑",svg:emoji_02},{name:"难过",svg:emoji_03},{name:"微笑",svg:emoji_04},{name:"吐舌",svg:emoji_05},{name:"酷",svg:emoji_06},{name:"惊讶",svg:emoji_07},{name:"坏笑",svg:emoji_08},{name:"沮丧",svg:emoji_09},{name:"大哭",svg:emoji_10},{name:"害羞",svg:emoji_11},{name:"色",svg:emoji_12},{name:"恶魔",svg:emoji_13},{name:"天使",svg:emoji_14},{name:"疑惑",svg:emoji_15},{name:"闭嘴",svg:emoji_16},{name:"认真",svg:emoji_17},{name:"撇嘴",svg:emoji_18},{name:"调皮",svg:emoji_19},{name:"吐",svg:emoji_20}],
          isEmojinoPic:true,
        },
        btn:{
          text:'发布'
        }
      }
    },
    methods: {
      check0(status){
        if (status === 0) {
          this.option.error = '输入不能为空'
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
      focus(){
      },
      blur(){
        this.$emit('check', 0);
        if (this.option.value === '' || this.option.value.trim().length === 0) {
          this.option.isError = true;
          return;
        }
        this.option.isError = false;
      },
      uploadInfo(){
        let val=this.option5.value;
        this.$refs.item.innerHTML = '<p>'+val.replace(/【图片1】/g,`</p><br/><img src="${this.option5.imgList[0].file}"/><br/><p>`)
            .replace(/【图片2】/g,`</p><br/><img src="${this.option5.imgList[1].file}"/><br/><p>`)
            .replace(/【图片3】/g,`</p><br/><img src="${this.option5.imgList[2].file}"/><br/><p>`)
            .replace(/【图片4】/g,`</p><br/><img src="${this.option5.imgList[3].file}"/><br/><p>`)
            .replace(/【图片5】/g,`</p><br/><img src="${this.option5.imgList[4].file}"/><br/><p>`)
      },
      uploadComment(){
        alert('评论发布成功！');
      },
      uploadEmoji(){
        let newValue=this.option7.value;
        newValue=newValue.replace(/\n/g,"<br/>");
        for(let i in this.option7.emoji){
          let key="["+this.option7.emoji[i].name+"]";
            if(newValue.indexOf(key)>-1){
              let svg="<u class='icon'>"+item.svg+"</u>";
              newValue = newValue.replace(key,svg)
            }
        }
        this.$refs.emojiContent.innerHTML=newValue;
      }
    }
  }
</script>
<style>
  .textareas .item{
    width: 100%;
    height: 100%;
  }
  .textareas label{
    display: block;
    padding-bottom: 20px;
  }
</style>
