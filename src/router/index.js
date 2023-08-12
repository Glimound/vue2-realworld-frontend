import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import LoginPage from '@/views/LoginPage'
import RegisterPage from '@/views/RegisterPage'

Vue.use(VueRouter)

const routes = [
  {
    name: 'homePage',
    path: '/',
    component: HomePage
  },
  {
    name: 'loginPage',
    path: '/login',
    component: LoginPage
  },
  {
    name: 'registerPage',
    path: '/register',
    component: RegisterPage
  }
]

const router = new VueRouter({
  routes
})

export default router
