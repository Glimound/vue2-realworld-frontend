<template>
  <div class="row">
    <div v-if="isAuthenticated" class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form">
        <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div class="card-footer">
          <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
          <button class="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>

      <div class="card">
        <div class="card-block">
          <p class="card-text">
            With supporting text below as a natural lead-in to additional content.
          </p>
        </div>
        <div class="card-footer">
          <a href="/profile/author" class="comment-author">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
          </a>
          &nbsp;
          <a href="/profile/jacob-schmidt" class="comment-author">Jacob Schmidt</a>
          <span class="date-posted">Dec 29th</span>
        </div>
      </div>

      <div class="card">
        <div class="card-block">
          <p class="card-text">
            With supporting text below as a natural lead-in to additional content.
          </p>
        </div>
        <div class="card-footer">
          <a href="/profile/author" class="comment-author">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
          </a>
          &nbsp;
          <a href="/profile/jacob-schmidt" class="comment-author">Jacob Schmidt</a>
          <span class="date-posted">Dec 29th</span>
          <span class="mod-options">
            <i class="ion-trash-a"></i>
          </span>
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
  export default {
    name: 'ArticleComment',
    computed: {
      ...mapState(['isAuthenticated'])
    }
  }
</script>

<style>

</style>