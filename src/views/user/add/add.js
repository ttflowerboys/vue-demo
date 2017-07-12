import Vue from 'vue'
import App from './addApp'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import store from 'src/store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
