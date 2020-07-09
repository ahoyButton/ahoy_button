import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/vuegithubbutton.js'
import './plugins/nutui'
import './assets/iconfont/iconfont.css'
import store from './store'
import i18n from './i18n'
import router from './router'
import 'animate.css'

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
