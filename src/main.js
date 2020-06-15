import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/vuegithubbutton.js'
import './assets/iconfont/iconfont.css'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
