<template>
  <div>
    <h1 class="h1">checkbox</h1>
    <div style="padding: 0 20px;">
      <apc-checkbox cls="v" :options="demo1" @event="check"/>
      <apc-checkbox cls="v" disabled :options="demo2" />
      <apc-checkbox cls="v" :options="demo2"  @event="check"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'checkbox',
    data() {
      return {
        demo1: {
          title: '你好demo1',
          checked: ['b'],
          multi:false,
          options: [
            {
              key: '选项1',
              value: 'a'
            },
            {
              key: '选项1',
              value: 'b'
            },
            {
              key: '选项1',
              value: 'c'
            }
          ]
        },
        demo2: {
          title: '你好demo2',
          checked: [],
          multi:true,
          options: [
            {
              key: '选项1',
              value: 'a'
            },
            {
              key: '选项1',
              value: 'b'
            },
            {
              key: '选项1',
              value: 'c'
            }
          ]
        }
      };
    },
    methods: {
      check(...value) {
        console.log(this.demo2.checked);
      }
    }
  };
</script>
