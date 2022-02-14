import Vue from 'vue';
import App from './app.vue';
import router from './routes';
import Directive from './directive';
// import AlloyFinger from 'alloyfinger/alloy_finger';
// import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue';
// Vue.use(AlloyFingerVue, {
//   AlloyFinger
// });

import {install as Apc} from './index';
// import {install as Apc} from '../versions/edu/libs/apc-ui-edu';
Vue.use(Apc);

// import AMap from 'vue-amap';
// Vue.use(AMap);


// AMap.initAMapApiLoader({
//   key: '9c51c614e621d60ff40eb923077f3885',
//   plugin: ['AMap.Geolocation']
// });

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

new Directive(Vue);

new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App),
  router
});
