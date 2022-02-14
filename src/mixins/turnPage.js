/**
 @mixins turnPage
 @desc 页面切换动画，需要翻动的页面需要有cls(样式)，show(是否显示)的参数
 如:
 example1{
          cls: '',
          show: true
       }
 example2{
          cls: '',
          show: true
       }
 对应的页面上需要写:
 <div :class="example1.cls" v-show="example1.show"></div>
 <div :class="example2.cls" v-show="example2.show"></div>
 对应的翻页事件：
 this.nextPage('example2', 'example1')
 this.prevPage('example1', 'example2')

 page为to, from的上一级
 @function nextPage 翻下一页
 @function prevPage 翻上一页
 */
export default {
  methods: {
    nextPage(to, from, page) {
      let _this;
      if (page) {
        _this = this[page];
      } else {
        _this = this;
      }
      return new Promise((resolve)=>{
				_this[to].show = true;
        _this[from].cls = 'iR-leave-to';
        _this[to].cls = 'iR-enter-active';
        setTimeout(()=>{
          _this[to].cls = 'iR-enter-to';
        }, 100);
        setTimeout(function () {
          _this[from].cls = '';
          _this[to].cls = '';
          _this[from].show = false;
          resolve();
        }, 400);
      })
    },
    prevPage(to, from, page) {
      let _this;
      if (page) {
        _this = this[page];
      } else {
        _this = this;
      }
      return new Promise((resolve)=>{
				_this[to].show = true;
        _this[from].cls = 'iL-leave-to';
        _this[to].cls = 'iL-enter-active';
        setTimeout(()=>{
          _this[to].cls = 'iL-enter-to';
        }, 100);
        setTimeout(function () {
          _this[from].cls = '';
          _this[to].cls = '';
          _this[from].show = false;
          resolve();
        }, 400);
      })
    }
  }
};
