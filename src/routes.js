import Vue from 'vue';
import Router from 'vue-router';
import nav from './nav.vue';
import config from './configAll.json';

Vue.use(Router);
let routes = config.map(item => {
  return {
    name: item.name,
    path: '/'+item.name,
    meta: {
      title: item.desc
    },
    component: r => require.ensure([], () => r(require(`./example/${item.name}.vue`)), 'item.name'),
  }
});

routes.push({
  name: 'index',
  path: '',
  meta:{
    title: 'apc-ui'
  },
  component: nav
});

export default new Router({
	// mode: 'history',
	routes
})
