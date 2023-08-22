<template>
  <div>
    <div>
      <div v-for="(article, index) in globalArticles" :key="index" class="article-preview">
        <article-meta :article="article"/>
        <router-link :to="`/article/${article.slug}`" class="preview-link">
          <h1>{{article.title}}</h1>
          <p>{{article.description}}</p>
          <span>Read more...</span>
          <ul class="tag-list">
            <li v-for="(tag, index) in article.tagList" :key="index" class="tag-default tag-pill tag-outline">{{tag}}</li>
          </ul>
        </router-link>
      </div>
    </div>
    <div v-if="isLoading" class="article-preview">
      Loading articles...
    </div>
    <!-- 加载完但文章数量未0的情况 -->
    <div v-if="!isLoading && globalArticles.length === 0" class="article-preview">
      No articles are here... yet.
    </div>
  </div>
</template>

<script>
  import ArticleMeta from '@/components/ArticleMeta'
  import { mapState } from 'vuex'
  export default {
    name: 'ArticlePreview',
    components: {
      ArticleMeta
    },
    computed: {
      ...mapState(['isLoading'])
    },
    props: {
      globalArticles: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style>

</style>