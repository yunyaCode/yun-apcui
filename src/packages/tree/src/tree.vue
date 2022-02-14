<template>
    <div class="apc-tree" :cls="cls">
        <label>{{title}}</label>
        <ul>
            <li v-for="(item, index) in tree" :class="['t1'+(index+1),'e',{'c':status[index].status?status[index].status:false}]">
                <a class="te_i" :class="'t1'+(index+1)" @click="onOff(index,item.url)">
                  <u v-if="status[index].tree" class="icon"><Fold></Fold></u>{{item.title+'asdasd'}}
                </a>
                <ul v-if="status[index].status?status[index].status:false">
                    <li v-for="(item1, index1) in item.tree" :class="['t2'+(index1+1),'e',{'c':status[index].tree[index1].status?status[index].tree[index1].status:false}]">
                        <a class="te_i"  :class="['t2'+(index1+1)]" @click="onOff(index,index1,item1.url)">
                            <u v-if="status[index].tree[index1].tree" class="icon" v-html-xss="svg"></u>{{item1.title}}
                        </a>
                        <ul v-if="status[index].tree[index1].status?status[index].tree[index1].status:false">
                            <li v-for="(item2, index2) in item1.tree" :class="['t3'+(index2+1)]">
                                <a class="te_i" :class="['t3'+(index2+1)]" @click="event(index,index1,index2,item2.url)">
                                    <u class="icon"></u>{{item2.title}}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
	/**
	 * apc-tree
   * Created by lvxianfu on 2017/4/20.
	 * @module components/树
	 * @desc 树
	 * @param {string} [title] - 标题
	 * @param {string} [cls] - 自定义样式
	 * @param {array} [tree] - 树的级别
	 * @example
     * methods: {
        event(...type) { //事件索引
           console.log(type)
         }
       }
	 *  data: {
        title: '树',
        tree: [
          {
            title: '父级一',
            url: '# //路由
          },
          {
            title: '父级二',
            tree: [
              {
                title: '子级一',
                url: '#
              },
              {
                title: '子级二',
                tree: [
                  {
                    title: '孙级一',
                    url: '#
                  },
                  {
                    title: '孙级二',
                    url: '#
                  }
                ]
              }
            ]
          }
        ]
      }

     * @example
     * <apc-tree :title="data.title" :tree="data.tree"/>
	 */
import Fold from '../../fold/src/fold.vue';
export default {
  name: 'apc-tree',
  data() {
    return {
      status: this.tree
    };
  },
  props: {
    title: String,
    tree: Array,
    svg: String,
    cls: String
  },
  components:{
      Fold
  },
  methods: {
    onOff(...index) {
      if (index.length === 3) {
        if (!this.status[index[0]].tree[index[1]].status) {
          this.$set(this.status[index[0]].tree[index[1]], 'status', true);
        } else {
          this.status[index[0]].tree[index[1]].status = false;
        }
        this.$emit('event', index[0], index[1]);
        if (index[2]) {
          this.$router.push({path: index[2]});
        }
      } else {
        if (!this.status[index[0]].status) {
          this.$set(this.status[index[0]], 'status', true);
        } else {
          this.status[index[0]].status = false;
        }
        if (index[1]) {
          this.$router.push({path: index[1]});
        }
        this.$emit('event', index[0]);
      }
    },
    event(...index) {
      if (index[3]) {
        this.$router.push({path: index[3]});
      }
      this.$emit('event', index[0], index[1], index[2]);
    }
  }
};
</script>
