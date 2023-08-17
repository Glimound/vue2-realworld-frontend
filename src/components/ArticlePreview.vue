<template>
  <div v-if="isLoading" class="article-preview">
    Loading articles...
  </div>
  <div v-else>
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
</template>

<script>
  import ArticleMeta from '@/components/ArticleMeta'
  export default {
    name: 'ArticlePreview',
    components: {
      ArticleMeta
    },
    computed: {
      //todo: 需考虑获取的文章数量为0的情况：数组长度为0
      isLoading() {
        return !this.globalArticles.length
      }
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