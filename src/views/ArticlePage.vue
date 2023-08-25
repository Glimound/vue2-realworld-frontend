<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <article-meta :article="article" :action="true"/>
      </div>
    </div>

    <div class="container page">
      <article-content :article="article"/>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" :action="true"/>
      </div>

      <article-comment :slug="article.slug"/>
    </div>
  </div>
</template>

<script>
  import ArticleMeta from '@/components/ArticleMeta'
  import ArticleContent from '@/components/ArticleContent'
  import ArticleComment from '@/components/ArticleComment'
  import store from '@/store'
  import { mapState } from 'vuex'


  export default {
    name: 'ArticlePage',
    components: {
      ArticleMeta,
      ArticleContent,
      ArticleComment
    },
    computed: {
      ...mapState(['article'])
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('getArticle', to.params.slug).then(() => {
        next()
      })
    },
    beforeRouteUpdate(to, from, next) {
      store.dispatch('getArticle', to.params.slug).then(() => {
        next()
      })
    },
    destroyed() {
      this.$store.commit('clearArticle')
    }
  }
</script>

<style>

</style>