<template>
  <div class="row article-content">
    <div class="col-md-12">
      <!-- todo: content parser -->
      <p>{{article.body}}</p>
      <ul class="tag-list">
        <li v-for="(tag, index) in article.tagList" :key="index" class="tag-default tag-pill tag-outline">{{tag}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArticleContent',
    props: {
      article: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style>

</style>