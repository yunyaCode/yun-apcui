<template>
  <div class="apc-switch" :class="[cls,{v:vert}, sw]" @mouseenter="switchEnter" @mouseleave="switchLeave">
    <a v-for="(item,index) in newOptions.list" :key="index" :class="['sw'+(index+1),{c:checkIndex === index},item.cls]"
      class="sw_i" :style="[item.sty,{width:vert?'':`${cenWidth}%`},{height:vert?`${cenWidth}%`:''}]" @click="choose(index)"
      ref="span" @mouseenter="enter(index)">
      <u class="icon" v-if="item.svg" v-html-xss="item.svg"></u>
      <i class="txt">{{power || hideTxt ? '' : item.txt }} </i>
      <b class="n" v-if="item.num&&item.num>0">{{ item.num}}</b>
    </a>
    <span v-if="!power" class="sw_s "
      :class="[{'sw1':checkIndex<newOptions.list.length-1},{'end':checkIndex===newOptions.list.length-1}]"
      :style="[{width:vert?'':`${cenWidth}%`},{height:vert?`${cenWidth}%`:''},{left:'0'},{transform:`translate3d(${moveX},${moveY},0)`}]">
      <u class="icon"></u>
    </span>
    <span v-else class="sw_s "
      :class="[{'sw1':checkIndex<newOptions.list.length-1},{'end':checkIndex===newOptions.list.length-1}]"
      :style="[{width:'50%'},{left:'0'},{transform:`translate3d(${moveX},${moveY},0)`}]">
    </span>
  </div>
</template>
<script>
  /**
   @module apc-switch
   @param {options.<list> | <width> | <checked> | <length> } {object} apc-switch组件的参数
   @param {Number} [moveX] - x轴移动距离
   @param {Number} [moveY] - y轴移动距离
   @param {Number} [checkIndex] - 选中的index
   @param {Number} [cenWidth] - 宽度（百分比）
   @event choose 选择的回调事件
   @event go span移动
   @example<apc-switch :options="option" @choose="choose"/>
   */
  export default {
    name: 'apc-switch',
    data() {
      return {
        moveX: 0,
        moveY: 0,
        checkIndex: 0,
        // cenWidth: 0,
        defaultOptions: {
          list: [],
          width: '',
          checked: '',
          length: '',
        },
        sw: 'sw1'
      }
    },
    props: {
      options: Object,
      vert: Boolean,
      power: Boolean,
      cls: Array,
      hideTxt: Boolean
    },
    computed: {
      newOptions() {
        this.checkIndex = this.options.checked

        return Object.assign(this.defaultOptions, this.options)
      },
      cenWidth() {
        return 100 / this.options.list.length;
      }
    },
    methods: {
      /*
       rem(px){
       return px / (16/(16*0+1)) * 1;
       },
       */
      choose(index) {
        this.checkIndex = index
        this.sw = 'sw' + (parseInt(index) + 1)
        this.$emit('choose', index)
      },
      go(index) {
        this.checkIndex = index
        if (!this.vert && !this.power) {
          this.moveX = (this.$refs.span[0].offsetWidth - 0.5) * index + 'px'
        }
        if (!this.vert && this.power) {
          this.moveX = 100 * index + '%'
        }
        if (this.vert) {
          this.moveY = this.$refs.span[0].offsetHeight * index + 'px'
        }
      },
      enter(index) {
        this.$emit('enter', index);
      },
      switchEnter() {
        this.$emit('switchEnter');
      },
      switchLeave() {
        this.$emit('switchLeave');
      },
    },
    watch: {
      checkIndex(val) {
        let index = val && val !== '' ? val : 0
        this.go(index)
        //        this.options.checked = this.options.list[index].txt;
      }
    },
    created() {
      if (this.options.length) {
        this.options.list = []
        for (let i = 0; i < this.options.length; i++) {
          this.options.list.push({})
        }
        this.checkIndex = 0
      } else {
        this.options.list.map((item, index) => {
          if (item.txt === this.options.checked) {
            this.$set(this, 'checkIndex', parseInt(index))
            this.$set(this, 'moveX', this.options.width * index + 'px')
          }
        })
      }
    },
    // mounted() {
    //   this.cenWidth = 100 / this.options.list.length
    // }
  }

</script>
