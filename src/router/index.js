import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  }
]

const router = new VueRouter({
  routes
})

export default router
