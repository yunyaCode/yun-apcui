<template>
  <li class="e" :class="{'c':this.model.expanded?this.model.expanded:false}">
    <a @click="toggle" class="fd_i"><u v-if="model.children.length" class="icon" v-html-xss="icon"></u>{{model.title}} <span v-if='model.children.length'>[{{model.expanded ? '-' : '+'}}]</span></a>
    <apc-btn :options="model.btnOption" @event="btnEvent"></apc-btn>
　　<!--isFolder判断是否存在子级改变图标-->
    <ul v-if='model.children.length && model.expanded'>
      <apc-fold key="index"  v-for="(cel,index) in model.children" :model="cel"></apc-fold>
    </ul>
  </li>
</template>
<script>
	/**
	 * apc-fold
   * Created by lvxianfu on 2017/4/20.
   * updated by dzh on 2017/6/6
	 * @module components/折叠
	 * @desc 折叠
	 * @param {string} [apcstyle=''] - 定制样式  ''默认   's1'定制样式
	 * @param {string} [title] - 标题
	 * @param {string} [cls] - 自定义样式
	 * @param {array} [model.children] - 折叠数据
	 * @param {function} [toggle] - 折叠触发的事件
   * @param {Boolean} [expanded]   是否展开
	 *
	 * @example
	 * <apc-fold  :model="model" key="index" v-for="(model,index) in tree"></apc-fold>
   *
   */
import icon from '../../../assets/svg/esc';
export default {
  name: 'apc-fold',
  data() {
    return {
      icon:icon,
    };
  },
  props: {
    model:Object,
  },
  computed: {
    folder() {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle() {
      if(this.model.children.length) {
        this.model.expanded = !this.model.expanded
      }

    },
    btnEvent(...type) {
//      console.log(type);
    }
  }
};
</script>
