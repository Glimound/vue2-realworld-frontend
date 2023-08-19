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

          <feed-toggle/>

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
  import FeedToggle from '@/components/FeedToggle'
  import TagList from '@/components/TagList'
  import { mapState } from 'vuex'

  export default {
    name: 'HomePage',
    components: {
      ArticlePreview,
      ThePagination,
      FeedToggle,
      TagList
    },
    computed:{
      ...mapState(['globalArticles']),
      paginationNum() {
        //todo: 将此处的10解耦
        return Math.ceil((this.$store.state.articlesCount -1) / 10)
      }
    },
    beforeMount() {
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