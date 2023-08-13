import Vue from 'vue'
import Vuex from 'vuex'
import { getJwtToken } from '@/services/jwtServices'
import { ArticlesService } from '@/services/apiServices'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: !!getJwtToken(),
    globalArticles: [],
    articlesCount: 0
  },
  getters: {
  },
  mutations: {
    setGlobalArticles(state, list) {
      state.globalArticles = list
    },
    setArticlesCount(state, num) {
      state.articlesCount = num
    }
  },
  actions: {
    getGlobalArticles(context, offset) {
      ArticlesService.getArticles(offset).then(({data}) => {
        context.commit('setGlobalArticles', data.articles)
        context.commit('setArticlesCount', data.articlesCount)
      })
    }
  },
  modules: {
  }
})
