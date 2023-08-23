import Vue from 'vue'
import Vuex from 'vuex'
import { deleteJwtToken, getJwtToken, saveJwtToken } from '@/services/jwtServices'
import { ArticlesService, AuthenticationService, CommentsService, TagsService, ProfileService } from '@/services/apiServices'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: !!getJwtToken(),
    isLoading: false,
    globalArticles: [],
    articlesCount: 0,
    article: {},
    comments: [],
    popularTags: [],
    currentTag: '',
    currentPagination: 1,
    errorMessages: {},
    currentUser: {},
    profile: {},
    toggleChecked: ''
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
    setLoading(state, boolean) {
      state.isLoading = boolean
    },
    setProfile(state, obj) {
      state.profile = obj
    },
    setProfileFollowing(state, boolean) {
      state.profile.following = boolean
    },
    setToggleChecked(state, str) {
      state.toggleChecked = str
    },
    clearCurrentTag(state) {
      state.currentTag = ''
    },
    clearGlobalArticles(state) {
      state.globalArticles = [],
      state.articlesCount = 0
    },
    clearArticle(state) {
      state.article = {
        author: {}
      }
    },
    clearAuthentication(state) {
      deleteJwtToken()
      state.isAuthenticated = false
    },
    clearCurrentUser(state) {
      state.currentUser = {}
    },
    clearErrorMessages(state) {
      state.errorMessages = {}
    },
    clearComments(state) {
      state.comments = []
    },
    clearPopularTags(state) {
      state.popularTags = []
    },
    clearProfile(state) {
      state.profile = {}
    },
    clearToggleChecked(state) {
      state.toggleChecked = ''
    },
    resetCurrentPagination(state) {
      state.currentPagination = 1
    },
    addComment(state, comment) {
      state.comments.unshift(comment)
    },
    deleteComment(state, num) {
      state.comments = state.comments.filter((comment) => {
        return comment.id != num
      })
    }
  },
  actions: {
    getGlobalArticles(context, offset) {
      context.commit('setLoading', true)
      ArticlesService.getArticles(offset).then(({data}) => {
        context.commit('setGlobalArticles', data.articles)
        context.commit('setArticlesCount', data.articlesCount)
        context.commit('setLoading', false)
      })
    },
    getGlobalArticlesByTag(context, params) {
      context.commit('setLoading', true)
      ArticlesService.getTaggedArticles(params.offset, params.tag).then(({data}) => {
        context.commit('setGlobalArticles', data.articles)
        context.commit('setArticlesCount', data.articlesCount)
        context.commit('setLoading', false)
      })
    },
    getGlobalArticlesByYourFeed(context, offset) {
      context.commit('setLoading', true)
      ArticlesService.getFeedArticles(offset).then(({data}) => {
        context.commit('setGlobalArticles', data.articles)
        context.commit('setArticlesCount', data.articlesCount)
        context.commit('setLoading', false)
      })
    },
    getGlobalArticlesByUsername(context, params) {
      context.commit('setLoading', true)
      ArticlesService.getUserArticles(params.offset, params.username).then(({data}) => {
        context.commit('setGlobalArticles', data.articles)
        context.commit('setArticlesCount', data.articlesCount)
        context.commit('setLoading', false)
      })
    },
    getGlobalArticlesByFavorited(context, params) {
      context.commit('setLoading', true)
      ArticlesService.getFavoritedArticles(params.offset, params.username).then(({data}) => {
        context.commit('setGlobalArticles', data.articles)
        context.commit('setArticlesCount', data.articlesCount)
        context.commit('setLoading', false)
      })
    },
    getArticle(context, slug) {
      return new Promise((resolve) => {
        ArticlesService.getArticle(slug).then(({data}) => {
          context.commit('setArticle', data.article)
          resolve()
        })
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
    getCurrentUser(context) {
      return new Promise((resolve) => {
        AuthenticationService.getCurrentUser().then(({data}) => {
          context.commit('setCurrentUser', data.user)
          resolve()
        })
      })
    },
    getProfile(context, username) {
      return new Promise((resolve) => {
        ProfileService.getProfile(username).then(({data}) => {
          context.commit('setProfile', data.profile)
          resolve()
        })
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
    },
    register(context, info) {
      return new Promise((resolve) => {
        AuthenticationService.register(info).then(({data}) => {
          context.commit('setCurrentUser', data.user)
          context.commit('setAuthentication', data.user.token)
          resolve()
        }).catch(({response}) => {
          context.commit('setErrorMessages', response.data.errors)
        })
      })
    },
    addComment(context, params) {
      CommentsService.postComment(params.slug, {
        body: params.comment
      }).then(({data}) => {
        context.commit('addComment', data.comment)
      })
    },
    deleteComment(context, params) {
      CommentsService.deleteComment(params.slug, params.id).then(() => {
        context.commit('deleteComment', params.id)
      })
    },
    follow(context, username) {
      ProfileService.followUser(username).then(() => {
        context.commit('setProfileFollowing', true)
      })
    },
    unfollow(context, username) {
      ProfileService.followUser(username).then(() => {
        context.commit('setProfileFollowing', false)
      })
    }
  },
  modules: {
  }
})
