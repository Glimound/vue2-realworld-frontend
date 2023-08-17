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

      <article-comment/>
    </div>
  </div>
</template>

<script>
  import ArticleMeta from '@/components/ArticleMeta'
  import ArticleContent from '@/components/ArticleContent'
  import ArticleComment from '@/components/ArticleComment'
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
    beforeMount() {
      this.$store.dispatch('getArticle', this.$route.params.slug)
    },
    destroyed() {
      this.$store.commit('setArticle', {})
    }
  }
</script>

<style>

</style>