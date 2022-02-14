<template>
    <div class="page-button">
        <h1 class="page-title">tree</h1>
        <div class="panel">
            <apc-tree :title="data.title" :tree="data.tree" @event="event" :svg="data.svg"/>
        </div>
    </div>
</template>

<script>
import esc from '../../src/assets/svg/esc';
export default {
  name: 'tree',
  data() {
    return {
      data: {
        title: '树',
        svg: esc,
        tree: [
          {
            title: '父级一',
//            url: '/fold'
          },
          {
            title: '父级二',
            tree: [
              {
                title: '子级一',
//                url: '/fold'
              },
              {
                title: '子级二',
                tree: [
                  {
                    title: '孙级一',
//                    url: '/fold'
                  },
                  {
                    title: '孙级二'
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    event(...type) {
      console.log(type);
    }
  }
};
</script>
