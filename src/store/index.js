import Vue from 'vue'
import Vuex from 'vuex'
import { deleteJwtToken, getJwtToken, saveJwtToken } from '@/services/jwtServices'
import { ArticlesService, AuthenticationService, CommentsService, TagsService } from '@/services/apiServices'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: !!getJwtToken(),
    globalArticles: [],
    articlesCount: 0,
    // 此处article是异步fetch的，若未取到时内部无结构，直接访问其中某个属性会导致错误
    // article: {}
    article: {
      author: {}
    },
    comments: [],
    popularTags: [],
    currentTag: '',
    currentPagination: 1,
    errorMessages: {},
    currentUser: {}
  },
  getters: {
  },
  mutations: {
    setGlobalArticles(state, list) {
      state.globalArticles = list
    },
    setArticlesCount(state, num) {
      state.articlesCount = num
    },
    setArticle(state, obj) {
      state.article = obj
    },
    setComments(state, list) {
      state.comments = list
    },
    setPopularTags(state, list) {
      state.popularTags = list
    },
    setCurrentTag(state, str) {
      state.currentTag = str
    },
    setCurrentPagination(state, num) {
      state.currentPagination = num
    },
    setErrorMessages(state, obj) {
      state.errorMessages = obj
    },
    setCurrentUser(state, obj) {
      state.currentUser = obj
    },
    setAuthentication(state, str) {
      saveJwtToken(str)
      state.isAuthenticated = true
    },
    clearCurrentTag(state) {
      state.currentTag = ''
    },
    clearGlobalArticles(state) {
      state.globalArticles = [],
      state.articlesCount = 0
    },
    clearAuthentication(state) {
      deleteJwtToken()
      state.isAuthenticated = false
    },
    clearErrorMessages(state) {
      state.errorMessages = {}
    },
    clearPopularTags(state) {
      state.popularTags = []
    },
    resetCurrentPagination(state) {
      state.currentPagination = 1
    }
  },
  actions: {
    getGlobalArticles(context, offset) {
      ArticlesService.getArticles(offset).then(({data}) => {
        context.commit('setGlobalArticles', data.articles)
        context.commit('setArticlesCount', data.articlesCount)
      })
    },
    getGlobalArticlesByTag(context, params) {
      ArticlesService.getTaggedArticles(params.offset, params.tag).then(({data}) => {
        context.commit('setGlobalArticles', data.articles)
        context.commit('setArticlesCount', data.articlesCount)
      })
    },
    getArticle(context, slug) {
      ArticlesService.getArticle(slug).then(({data}) => {
        context.commit('setArticle', data.article)
      })
    },
    getComments(context, slug) {
      CommentsService.getComments(slug).then(({data}) => {
        context.commit('setComments', data.comments)
      })
    },
    getPopularTags(context) {
      TagsService.getPopularTags().then(({data}) => {
        context.commit('setPopularTags', data.tags)
      })
    },
    login(context, credential) {
      return new Promise((resolve) => {
        AuthenticationService.login(credential).then(({data}) => {
          context.commit('setCurrentUser', data.user)
          context.commit('setAuthentication', data.user.token)
          resolve()
        }).catch(({response}) => {
          context.commit('setErrorMessages', response.data.errors)
        })
      })
    }
  },
  modules: {
  }
})
