import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rd-form',
    name: 'rd-form',
    component: () => import('../views/test/rd-form.vue')
  },
  {
    path: '/rd-dialog',
    name: 'rd-dialog',
    component: () => import('../views/test/rd-dialog.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
