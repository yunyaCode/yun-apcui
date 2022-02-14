<template>
  <span class="apc-confirm" :class="[{c: show}]">
    <a :class="cls" @click="action" :id="id">{{content}}<slot name="icon"></slot></a>
    <span class="confirm" v-if="show">
        <i class="txt"></i>
        <a class="no" @click="show = false"></a>
        <a class="yes" @click="ensure"></a>
    </span>
  </span>
</template>
<script>
export default{
  name: 'apc-confirm',
  data() {
    return {
      show: false,
    };
  },
  props: {
    id: String, // 用来判断点击哪个按钮（必填）
    cls: Array, // a标签的样式
    content: String, // a标签的内容
  },
  methods: {
    // 点击按钮
    action() {
      this.$emit('action');
      this.show = true;
      let that = this;
      document.body.addEventListener('click', function(e) {
        if (e.target.parentElement) {
          if (e.target !== document.getElementById(that.id) && (e.target.parentElement && e.target.parentElement.parentElement !== document.getElementById(that.id))) {
            that.cancel();
          }
        } else {
          if (e.target !== document.getElementById(that.id) && (e.target.parentNode && e.target.parentNode.parentNode !== document.getElementById(that.id))) {
            that.cancel();
          }
        }
      });
    },
    // 确定
    ensure() {
      this.$emit('ensure');
      this.show = false;
    },
    // 取消
    cancel() {
      this.$emit('cancel');
      this.show = false;
      document.body.removeEventListener('click', this.cancel);
    },
  },
};
</script>
