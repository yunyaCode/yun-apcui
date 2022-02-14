<template>
    <div v-if="newOptions.multi === true" class="apc-checkbox multi" :class="cls">
        <label>{{ newOptions.title }}</label>
        <a v-for="(option, index) in newOptions.options" :class="['cb_i','o'+(index+1),{'c':newOptions.checked.includes(option.value) }]" @click.stop="chooseMulti(option.value,option.key,index)" :value="option.value"><u class="icon" v-html-xss="icon" ></u>{{option.key}}</a>
    </div>
    <div v-else class="apc-checkbox" :class="cls">
        <label>{{ newOptions.title }}</label>
        <a v-for="(option, index) in newOptions.options" :class="['cb_i','o'+(index+1),{'c':newOptions.checked.includes(option.value) }]" @click.stop="chooseMulti(option.value,option.key,index)" :value="option.value"><u class="icon"></u>{{option.key}}</a>
    </div>
</template>
<script>
	/**
	 * apc-checkbox
   * Created by lvxianfu on 2017/4/20.
   * undated by dzh on 2017/6/5
	 * @module components/单，复选框
	 * @desc 单，复选框
	 * @param {string} [title] - 标题
	 * @param {Boolean} [multi] - 是否多选
	 * @param {array} [options] - 选项
	 * @param {String} [checked] - 单选或者多选默认选中
	 *
	 * @example
	 * <apc-checkbox :options="options"  @event="check" />
	 */
import icon from '../../../assets/svg/right';
export default {
  name: 'apc-checkbox',
  data() {
    return {
      icon: icon,
      defaultOptions:{
        title:'',
        options:[],
        checked:[],
        multi:false
      }
    };
  },
  props: {
    options: Object,
    disabled: Boolean,
    cls: String
  },
  methods: {
//    choose(value, key, index) {
//      if (this.disabled === true) {
//        return;
//      }
//      this.options.checked = value;
//      this.$emit('event', [value, key, index]);
//    },
    chooseMulti(value, key, index) {
      if (this.disabled === true) {
        return;
      }
      if(this.defaultOptions.multi === true){
        let length = this.options.checked.length;
        if (this.options.checked.includes(value)) {
          for (let index in this.options.checked) {
            if (this.options.checked[index] === value) {
              this.options.checked.splice(index, 1);
            }
          }
        } else {
          this.$set(this.options.checked, length, value);
        }
      }else{
        this.options.checked = [value];
      }

      this.$emit('event', [value, key, index]);
    }
  },
  computed: {
    newOptions() {
      return Object.assign(this.defaultOptions, this.options);
    }
  }
};
</script>
