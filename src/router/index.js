import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import LoginPage from '@/views/LoginPage'
import RegisterPage from '@/views/RegisterPage'
import EditorPage from '@/views/EditorPage'
import SettingsPage from '@/views/SettingsPage'
import ArticlePage from '@/views/ArticlePage'
import ProfilePage from '@/views/ProfilePage'
import store from '@/store'

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
    path: '/editor/:slug?',
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
  },
  {
    name: 'profilePage',
    path: '/profile/@:username',
    component: ProfilePage
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  // 若用户通过验证，但并无当前user信息（刷新/地址访问），则获取user信息
  if (store.state.isAuthenticated && Object.keys(store.state.currentUser).length === 0) {
    store.dispatch('getCurrentUser').then(() => {
      next()
    })
  } else {
    next()
  }
})
export default router
