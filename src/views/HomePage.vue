<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">

          <toggle-bar type="homePage"/>

          <article-preview :globalArticles="globalArticles"/>

          <the-pagination :paginationNum="paginationNum"/>

        </div>

        <div class="col-md-3">
          <tag-list/>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ArticlePreview from '@/components/ArticlePreview'
  import ThePagination from '@/components/ThePagination'
  import ToggleBar from '@/components/ToggleBar'
  import TagList from '@/components/TagList'
  import { mapState } from 'vuex'

  export default {
    name: 'HomePage',
    components: {
      ArticlePreview,
      ThePagination,
      ToggleBar,
      TagList
    },
    computed:{
      ...mapState(['globalArticles', 'isAuthenticated']),
      paginationNum() {
        //todo: 将此处的10解耦
        return Math.ceil((this.$store.state.articlesCount - 1) / 10)
      }
    },
    beforeMount() {
      if (this.isAuthenticated)
        this.$store.dispatch('getGlobalArticlesByYourFeed', 0)
      else
        this.$store.dispatch('getGlobalArticles', 0)
    },
    destroyed() {
      this.$store.commit('clearCurrentTag')
      this.$store.commit('clearPopularTags')
      this.$store.commit('clearGlobalArticles')
      this.$store.commit('resetCurrentPagination')
    }
  }
</script>

<style>

</style>