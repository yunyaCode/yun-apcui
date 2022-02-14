<template>
    <div>
      <h1 class="h1">切换</h1>
      <apc-switch :options="option" @choose="choose"/>
      <apc-switch :options="optionV" @choose="choose" vert/>
      <apc-switch :options="option" @choose="choose" cls="s1"/>
      <apc-switch :options="option" @choose="choose" cls="s2"/>
      <apc-switch :options="option" @choose="choose" cls="s3"/>
      <apc-switch :options="option" @choose="choose" cls="s4"/>
      <apc-switch :options="option5" @choose="choose" cls="s5" power/>
      <apc-switch :options="option6" cls="s10"/>
    </div>
</template>
<script>
import userIcon from '../../src/assets/svg/user';
export default {
  data() {
  	return {
  	    option:{
          list:[
            {txt: '选项1'},
            {txt: '选项2', svg: userIcon},
            {txt: '选项3', svg: userIcon},
            {txt: '选项4', svg: userIcon}
          ],
          checked: '选项1',
          width:'100',
        },
  	    optionV:{
          list:[
            {txt: '选项1'},
            {txt: '选项2', svg: userIcon},
            {txt: '选项3', svg: userIcon},
            {txt: '选项4', svg: userIcon}
          ],
          checked: '选项1',
          width:'10',
        },
  	    option5:{
          list:[
            {txt: '选项1'},
            {txt: '选项2'}
          ],
          checked: '选项1',
          width:'50',
        },
  	    option6:{
          width:'100',
          length:4
        }
    }
  },
  methods: {
    choose(index) {
      this.option.checked=index;
      console.log(index);
      console.log(this.option)
    }
  },
};
</script>
