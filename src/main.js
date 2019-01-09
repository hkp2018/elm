// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/mycss.css'
import store from './store/index'
import Icon from 'vue-svg-icon/Icon.vue'
Vue.use(Mint)
Vue.config.productionTip = false
Vue.component('icon',Icon)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
