import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:HomePage
    },
    {
      name:'home',
      path:'/weather',
      component:HomePage
    },
    {
      name:'cityView',
      path:'/weather/:adcode',
      component:() => import('../views/cityView.vue')
    }
  ]
})

export default router
