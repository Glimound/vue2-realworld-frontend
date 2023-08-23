<template>
  <span>
    <span v-if="isOwn">
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-edit"></i> Edit Article
      </button>
      <button class="btn btn-sm btn-outline-danger">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>
    <span v-else>
      <!-- todo: 实现follow和favorite功能 -->
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp; Follow {{article.author.username}}
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
      </button>
    </span>
  </span>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'ArticleOperations',
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapState(['isAuthenticated', 'currentUser']),
      isOwn() {
        if (this.isAuthenticated) {
          if (this.article.author.username === this.currentUser.username)
            return true
        }
        return false
      }
    }
  }
</script>

<style>

</style>