<template>
  <span>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{article.author.username}}
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
    </button>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-edit"></i> Edit Article
    </button>
    <button class="btn btn-sm btn-outline-danger">
      <i class="ion-trash-a"></i> Delete Article
    </button>
  </span>
</template>

<script>
  export default {
    name: 'ArticleOperations',
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