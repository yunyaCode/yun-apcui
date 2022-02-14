<template>
  <div class="P apc-region" :class="cls">
    <div class="C" :class="item.cls" v-for="(item, index) in options" v-if="item.show">
      <div class="H b">
        <a class="apc-btn back" @click="back(index)"><u class="icon" v-html-xss="backSvg"></u></a>
        <i class="txt">{{item.title}}</i>
      </div>
      <div class="U">
        <div class="L">
          <Radio cls="s1" :options="item.options" @event="choose($event, index)"></Radio>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   @module apc-region
   @param {options.<show> | <title> | <cls> | <options>} {object} apc-region组件的参数
   @example <apc-region :options="option"/>
   */
  import backSvg from '../../../assets/svg/arrow';
  import Radio from '../../checkbox/src/checkbox.vue';
  import Btn from '../../btn/src/btn.vue';
	export default{
		name: 'apc-region',
    data() {
			return {
        backSvg
      }
    },
    props: {
			options: Array,
      cls: String
    },
    components: {
      Radio,
      Btn
    },
    methods: {
      back(index) {
      	this.$emit('back', index)
      },
      choose(param, index) {
      	this.$emit('choose', param, index)
      }
    }
	}
</script>
