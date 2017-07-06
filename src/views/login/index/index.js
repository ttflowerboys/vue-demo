import Vue from 'vue'
import App from './indexApp'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import store from 'src/store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
