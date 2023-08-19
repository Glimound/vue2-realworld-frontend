<template>
  <div class="row">
    <div v-if="isAuthenticated" class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form">
        <div class="card-block">
          <textarea v-model="comment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div class="card-footer">
          <img :src="currentUser.image" class="comment-author-img" />
          <button @click.prevent="postComment" class="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>

      <div v-for="comment in comments" :key="comment.id" class="card">
        <div class="card-block">
          <p class="card-text">
            {{comment.body}}
          </p>
        </div>
        <div class="card-footer">
          <router-link :to="`/profile/@${comment.author.username}`" class="comment-author">
            <img :src="comment.author.image" class="comment-author-img" />
          </router-link>
          &nbsp;
          <router-link :to="`/profile/@${comment.author.username}`" class="comment-author">{{comment.author.username}}</router-link>
          <span class="date-posted">{{dateStr(comment.createdAt)}}</span>
          <span v-if="isOwn(comment)" class="mod-options"><i @click="deleteComment(comment.id)" class="ion-trash-a"></i></span>
        </div>
      </div>
    </div>

    <div v-else class="col-xs-12 col-md-8 offset-md-2">
      <router-link to="/login">Sign in</router-link>
        or 
      <router-link to="/register">sign up</router-link>
        to add comments on this article.
    </div>
  </div>
  
</template>

<script>
  import { mapState } from 'vuex'
  import { daySuffix, parseDate, parseMonth } from '@/utils/dateParser'
  export default {
    name: 'ArticleComment',
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        comment: ''
      }
    },
    computed: {
      ...mapState(['isAuthenticated', 'comments', 'currentUser'])
    },
    methods: {
      dateStr(str) {
        if (!str)
          return null
        if (this.action) {
          let date = parseDate(str)
          let day = (date.day[0] === '0') ? date.day[1] : date.day
          return `${parseMonth(date.month)} ${day}${daySuffix(date.day)}`
        } else {
          let date = parseDate(str)
          let month = parseMonth(date.month)
          return `${month} ${date.day}, ${date.year}`
        }
      },
      isOwn(comment) {
        if (comment.author.username === this.currentUser.username)
          return true
        else
          return false
      },
      deleteComment(id) {
        this.$store.dispatch('deleteComment', {
          slug: this.slug,
          id: id
        })
      },
      postComment() {
        this.$store.dispatch('addComment', {
          slug: this.slug,
          comment: this.comment
        })
        this.comment = ''
      }
    },
    beforeMount() {
      this.$store.dispatch('getComments', this.slug)
    },
    destroyed() {
      this.$store.commit('clearComments')
    }
  }
</script>

<style>

</style>