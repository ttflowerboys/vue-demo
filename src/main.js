import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import routes from './router/'

import stores from './store/store'



Vue.use(VueRouter);
Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了


const router=new VueRouter({
	mode:'history',
	scrollBehavior (to, from, savedPosition) {
	  return {y : 0}
	},
	routes
});

new Vue({
  el: '#app',
  router,
  store:stores,
  render: h => h(App)
})
