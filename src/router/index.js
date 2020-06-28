import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/pc',
      name: 'pc',
      component: () => import('../components/pc/PCApp')
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: () => import('../components/mobile/MobileApp')
    }
]

const router = new VueRouter({
  routes
})

export default router
