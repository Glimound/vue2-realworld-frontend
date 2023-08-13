<template>
  <div v-if="isLoading" class="article-preview">
    Loading articles...
  </div>
  <div v-else>
    <div v-for="(article, index) in globalArticles" :key="index" class="article-preview">
      <div class="article-meta">
        <a href="/profile/eric-simons"><img :src="article.author.image" /></a>
        <div class="info">
          <a href="/profile/eric-simons" class="author">{{article.author.username}}</a>
          <span class="date">待修改</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right">
          <i class="ion-heart"></i> {{article.favoritesCount}}
        </button>
      </div>
      <a href="/article/how-to-build-webapps-that-scale" class="preview-link">
        <h1>{{article.title}}</h1>
        <p>{{article.description}}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li v-for="(tag, index) in article.tagList" :key="index" class="tag-default tag-pill tag-outline">{{tag}}</li>
        </ul>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArticlePreview',
    computed: {
      //todo: 需考虑获取的文章数量为0的情况：数组长度为0
      isLoading() {
        return !this.globalArticles.length
      }
    },
    props: {
      globalArticles: {
        type: Array,
        require: true
      }
    }
  }
</script>

<style>

</style>