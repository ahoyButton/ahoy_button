import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Index',
      component: () => import('../views/Index'),
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
      component: () => import('../components/mobile/MobileApp'),
      children: [
        {
          path: 'main',
          component: () => import('../components/mobile/Buttons'),
          mate: {
            keepAlive: true
          }
        },
        {
          path: 'playlist',
          component: () => import('../components/mobile/PlayList'),
          mate: {
            keepAlive: true
          }
        },
        {
          path: 'aboutUs',
          component: () => import('../components/mobile/AboutUs')
        }
      ]
    }
]

const router = new VueRouter({
  routes
})

export default router
