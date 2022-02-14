<template>
  <div>
    <h1 class="h1">折叠</h1>
    <div class="apc-fold" :class="style">
      <ul>
        <apc-fold :model="model" key="index" v-for="(model,index) in tree"></apc-fold>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'fold',
    data() {
      return {
        style: 's1',
        tree: [
          {
            btnOption:{
              text:'按钮1'
            },
            title: 'item 1',
            expanded: true,
            children: [
              {
                title: 'item 1.1',
                expanded: false,
                open:true,
                children: [
                  {
                    title: 'item 1.1.1',
                    expanded: false,
                    children: [
                      {
                        title: 'item 1.1.1.1',
                        expanded: false,
                        children: []
                      }
                    ]
                  },
                  {
                    title: 'item 1.1.2',
                    expanded: false,
                    children: []
                  }
                ]
              },
              {
                title: 'item 1.2',
                expanded: false,
                children: []
              },
              {
                title: 'item 1.3',
                expanded: false,
                children: []
              }
            ]
          },
          {
            btnOption:{
              text:'按钮2'
            },
            title: 'item 2',
            expanded: false,
            children: [
              {
                title: 'item 2.1',
                expanded: false,
                children: [
                  {
                    title: 'item 2.1.1',
                    expanded: false,
                    children: []
                  },
                  {
                    title: 'item 2.1.2',
                    expanded: false,
                    children: [
                      {
                        title: 'item 2.1.2.1',
                        expanded: false,
                        children: []
                      },
                      {
                        title: 'item 2.1.2.2',
                        expanded: false,
                        children: []
                      }
                    ]
                  }
                ]
              },
              {
                title: 'item 2.2',
                expanded: false,
                children: []
              },
              {
                title: 'item 2.3',
                expanded: false,
                children: []
              }
            ]
          }
        ]
      };
    },
    methods: {
      event(...type) {
        console.log(type);
      }
    }
  };
</script>
