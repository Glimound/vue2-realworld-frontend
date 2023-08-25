<template>
  <span>
    <span v-if="isOwn">
      <button @click="editArticle" class="btn btn-sm btn-outline-secondary">
        <i class="ion-edit"></i> Edit Article
      </button>
      &nbsp;
      <button @click="deleteArticle" class="btn btn-sm btn-outline-danger">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>
    <span v-else>
      <!-- todo: 实现follow和favorite功能 -->
      <button v-if="article.author.following" @click="unfollow" class="btn btn-sm btn-secondary">
        <i class="ion-minus-round"></i>
        &nbsp; Unfollow {{article.author.username}}
      </button>
      <button v-else @click="follow" class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp; Follow {{article.author.username}}
      </button>

      &nbsp;&nbsp;

      <button v-if="article.favorited" @click="unfavorite" class="btn btn-sm btn-primary">
        <i class="ion-heart"></i>
        &nbsp; Unfavorite Post
      </button>
      <button v-else @click="favorite" class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
      </button>
    </span>
  </span>
</template>

<script>
  import { ArticlesService } from '@/services/apiServices'
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
    },
    methods: {
      editArticle() {
        this.$router.push({name: 'editorPage', params: this.article}) //todo: 传参
      },
      deleteArticle() {
        ArticlesService.deleteArticle(this.article.slug).then(() => {
          this.$router.push({name: 'homePage'})
        })
      },
      follow() {
        if (!this.isAuthenticated)
          this.$router.push({name: 'loginPage'})
        else
          this.$store.dispatch('follow', this.article.author.username)
      },
      unfollow() {
        this.$store.dispatch('unfollow', this.article.author.username)
      },
      favorite() {
        if (!this.isAuthenticated)
          this.$router.push({name: 'loginPage'})
        else
          this.$store.dispatch('changeFavorite', {
            slug: this.article.slug,
            changeTo: true
          })
      },
      unfavorite() {
        this.$store.dispatch('changeFavorite', {
          slug: this.article.slug,
          changeTo: false
        })
      }
    }
  }
</script>

<style>

</style>