<template>
  <div class="apc-textarea"
       :class="[{f:newOptions.isFocus,t:newOptions.isType,d:newOptions.disabled,v:newOptions.view, emoji: newOptions.showEmoji},newOptions.type,newOptions.cls]"
       :style="[{height:`${allHeight}`}]">
    <label class="label">{{newOptions.title}}</label>
    <i class="ph" @click="tFocus">{{newOptions.placeholder}}</i>
    <div style="visibility:hidden;position: absolute;right: 0;"><p ref="shadow" class="shadow"></p></div>
    <textarea class="text" v-if="newOptions.disabled" disabled="disabled" v-model="textValue" ref="text"></textarea>
    <textarea class="text" v-else-if="newOptions.view" readonly="readonly" disabled="disabled" v-model="textValue"
              ref="text"></textarea>
    <textarea class="text" :autofocus="newOptions.autofocus" v-else @focus="focus" @blur="blur" v-model="textValue"
              ref="text" :style="[{height:`${oHeight}px`}]"></textarea>
    <span class="tip" v-show="!newOptions.disabled">{{newOptions.tip}}</span>
    <span class="save" v-if="newOptions.isSave">
          <u class="icon" v-html-xss="svg.right"></u>
          <i class="txt">已保存</i>
          <a class="undo" @click="undo">撤销保存</a>
        </span>
    <span class="apc-toast fail" v-if="newOptions.isError">
      <i class="txt">{{newOptions.error}}</i>
    </span>
    <div class="file" v-if="newOptions.havePic">
      <input type="file" id="file" class="none" multiple accept="image/jpeg, image/png" @change="chooseFile"
             ref="chooseFile">
      <div class="f item" v-for="(item,index) in newOptions.imgList"
           :style="[{backgroundImage: `url(${item.base64})`}]">
        <a class="zoom"></a>
        <a class="del" @click="del(index)"><u class="icon" v-html-xss="svg.wrong"></u></a>
        <a class="index" v-if="newOptions.isInsert" @click="clickImg(index)">{{index + 1}}</a>
      </div>
      <a class="f add none" @click="fileChoose" v-if="newOptions.imgList.length<5  && !newOptions.isEmojinoPic"><u
        class="icon" v-html-xss="svg.add"></u></a>
      <a class="emoji" :class="{c: newOptions.showEmoji}" v-if="newOptions.haveEmoji" @click="isEmoji"><u class="icon"
                                                                                                          v-html-xss="newOptions.emoji[0].svg"></u></a>
    </div>
    <div class="emoji" v-if="newOptions.showEmoji">
      <!--<a class="emoji close" @click="noEmoji"><u class="icon" v-html-xss="svg.wrong"></u></a>-->
      <a class="emoji" v-for="item in newOptions.emoji" @click="insert('['+item.name+']')"><u class="icon"
                                                                                              v-html-xss="item.svg"></u></a>
    </div>
    <span class="word">{{textValue.length}}</span>
  </div>
</template>
<script>
  /**
   @module apc-textarea
   @param {options.<type> | <cls> | <title> | <tip> | <error> | <isFocus> | <isSms> | <svg> | <isSave> | <isError> | <isType> | <placeholder> | <value> | <disabled> | <view> | <havePic>} {object} apc-textarea组件的参数
   @param {String} [textValue] - apc-textarea输入框的value值
   @param {Array} [svg] - 图标
   @param {String} [oHeight] - 高度
   @param {Boolean} [isType] - 是否输入
   @event undo - 撤销的回调事件
   @event focus - 聚焦的事件
   @event blur - 失去焦点的事件
   @event tFocus - 点击placeholder聚焦textarea的事件
   @event insert - 插入图片的事件
   @event autoHeight - 自动高度的事件
   @example <apc-textarea :options="option"/>
   */
  import ApcBtn from '../../../packages/btn/src/btn.vue'
  import right from '../../../assets/svg/right'
  import add from '../../../assets/svg/add'
  import wrong from '../../../assets/svg/wrong'

  export default {
    name: 'apc-textarea',
    props: {
      options: Object,
      canAutoHeight: {default: false, type: Boolean}
    },
    data() {
      return {
        svg: {right, add, wrong},
        textValue: this.options.value,
        oHeight: this.canAutoHeight ? null : (this.options.havePic ? 180 : 150),
        isType: false,
        startPosition: 0,
        endPosition: 0,
        defaultOptions: {
          autofocus: false,
          imgList: [],
          cls: '',
          type: '',
          value: '',
          title: '',
          placeholder: '',
          tip: '',
          error: '',
          svg: '',
          insertValue: '',
          havePic: false,
          view: false,
          disabled: false,
          isFocus: false,
          isSave: false,
          isError: false,
          isType: false,
          isInsert: true,
          haveEmoji: false,
          showEmoji: false,
          emoji: [],
          isEmojinoPic: false,
        }
      }
    },
    components: {
      ApcBtn
    },
    methods: {
      rem(px) {
        DevLog.log('px===', px)
        return px / (16 / (16 * 0 + 1)) * 1;
      },
      isEmoji() {
        this.options.showEmoji = !this.options.showEmoji
        setTimeout(function () {
          // alert(document.getElementById('apc-textarea').offsetHeight)
        }, 500)
      },
      noEmoji() {
        this.options.showEmoji = false
      },
      clickImg(index) {
        if (this.options.isInsert) {
          this.insert('【图片' + (index + 1) + '】')
        } else {
          this.del(index)
        }
      },
      insert(value) {
        this.focus()
        let text = this.$refs.text
        if (text.selectionStart || text.selectionStart === '0') {
          this.startPosition = text.selectionStart
          this.endPosition = text.selectionEnd
        }
        if (!this.textValue) {
          this.textValue = value
        } else {
          this.textValue = this.textValue.slice(0, this.startPosition) + value + this.textValue.slice(this.endPosition, this.textValue.length)
        }
        this.options.value = this.textValue

//设置光标位置，但没有用
//        if(text.setSelectionRange) {
//            //ie
//          text.setSelectionRange(this.startPosition+value.length, this.endPosition+value.length);
//        }else if (text.createTextRange) {
//            //firefox
//          let range = text.createTextRange();
//          range.collapse(true);
//          range.moveEnd('character', this.startPosition+value.length);
//          range.moveStart('character', this.endPosition+value.length);
//          range.select();
//        }
        this.isError = false
        this.blur()
      },
      chooseFile(e) {
        this.options.isError = false
        this.options.error = ' '
        let files = Array.from(e.target.files)
        if (files.length === 0) return
        if (files.length > 5) {
          this.options.isError = true
          this.options.error = this.options.error + '最多选择五张图片！'
          return
        }
        let accpet = ''
        let sizeOver = ''
        let _this = this
        for (let f in files) {
          //判断格式
          if (files[f].type !== 'image/jpeg' && files[f].type !== 'image/png') {
            accpet += files[f].name + ','
            this.options.error = this.options.error + '图片文件格式不正确！'
//            this.options.error = this.options.error + accpet.slice(0, -1) + '文件格式不正确！';
            this.options.isError = true
          }
          //判断大小
          let size = files[f].size / 1024
          if (size > 500) {
            sizeOver += files[f].name + ','
//            this.options.error = this.options.error + sizeOver.slice(0 ,-1) + '文件大于 500kb！';
            this.options.error = this.options.error + '图片文件过大，请重新选择！'
            this.options.isError = true
          }
          //通过fileReader 来读取数据
          if (!this.options.isError) {
            let fileReader = new FileReader()
            fileReader.readAsDataURL(files[f])
            fileReader.onload = function () {
              _this.options.imgList.push({
                file: files[f],
                base64: fileReader.result,
                name: files[f].name.split('.')[0]
              })
            }
          }
        }
      },
      fileChoose() {
        this.options.isError = false
        this.options.error = ' '
        this.$refs.chooseFile.value = ''
        this.$refs.chooseFile.click()
        if (navigator.userAgent.toLowerCase().indexOf('mobile') > -1 && navigator.userAgent.toLowerCase().indexOf('ipad') === -1) {
          document.getElementById('file').click();
        }
      },
      del(index) {
        this.focus()
        this.$refs.chooseFile.value = ''
        this.options.imgList.splice(index, 1)
        let key = '【图片' + (parseInt(index) + 1) + '】'
        let value = this.options.value.split(key).join('')
        let values = value.split('【图片')
        for (let i in values) {
          if (parseInt(i) !== 0) {
            if (values[i]) {
              if (parseInt(values[i].charAt(0)) > (parseInt(index) + 1)) {
                values[i] = parseInt(values[i].charAt(0)) - 1 + '】'
              }
              values[i] = '【图片' + values[i]
            }
          }
        }
        this.options.value = values.join('')
        this.textValue = this.options.value
        this.blur()
      },
      undo() {
        this.$emit('undo')
      },
      focus() {
        this.options.showEmoji = false
        this.$set(this.options, 'isFocus', true)
        this.$emit('focus')
      },
      blur() {
        this.$set(this.options, 'isFocus', false)
        this.$emit('blur')
      },
      tFocus() {
        this.$refs.text.focus()
      },
      autoHeight() {
        this.$refs.shadow.innerHTML = this.textValue.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/'/g, '&#039;')
          .replace(/"/g, '&quot;')
          .replace(/ /g, '&nbsp;')
          .replace(/((&nbsp;)*)&nbsp;/g, '$1 ')
          .replace(/\n/g, '<br />')
          .replace(/<br \/>[ ]*$/, '<br />&nbsp;')
          .replace(/<br \/> /g, '<br />&nbsp;')

        if (this.canAutoHeight) return
        this.oHeight = this.options.havePic ? 30 + this.$refs.shadow.offsetHeight : this.$refs.shadow.offsetHeight
      }
    },
    watch: {
      textValue(value) {
        this.options.value = value
        if (value.length > 0) {
          this.options.isType = true
        } else {
          this.options.isType = false
        }
        this.autoHeight()
        this.$emit('changeEvent', this.textValue)
      }
    },
    computed: {
      newOptions() {
        this.textValue = this.options.value
        return Object.assign(this.defaultOptions, this.options)
      },
      allHeight() {
        if (this.canAutoHeight) return
        let height = (this.options.havePic ? this.options.isInsert ? this.oHeight + 140 : this.oHeight + 70 : this.oHeight) + 'px'
        return this.newOptions.showEmoji ? height : height + '!important'
      }
    },
    mounted() {
      if (this.options.isFocus === true) {
        this.$refs.text.focus()
      }
    }
  }
</script>
