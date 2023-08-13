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
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ArticlePreview from '@/components/ArticlePreview'
  import ThePagination from '@/components/ThePagination'
  import FeedToggle from '@/components/FeedToggle'
  import { mapState } from 'vuex'
  import store from '@/store'

  export default {
    name: 'HomePage',
    components: {
      ArticlePreview,
      ThePagination,
      FeedToggle
    },
    computed:{
      ...mapState(['globalArticles']),
      paginationNum() {
        //todo: 将此处的10解耦
        return Math.floor(store.state.articlesCount / 10)
      }
    },
    beforeMount() {
      store.dispatch('getGlobalArticles', 0)
    }
  
  }
</script>

<style>

</style>