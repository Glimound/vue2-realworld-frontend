import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import LoginPage from '@/views/LoginPage'
import RegisterPage from '@/views/RegisterPage'
import EditorPage from '@/views/EditorPage'
import SettingsPage from '@/views/SettingsPage'
import ArticlePage from '@/views/ArticlePage'

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
  },
  {
    name: 'editorPage',
    path: '/editor',
    component: EditorPage
  },
  {
    name: 'settingsPage',
    path: '/settings',
    component: SettingsPage
  },
  {
    name: 'articlePage',
    path: '/article/:slug',
    component: ArticlePage
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
