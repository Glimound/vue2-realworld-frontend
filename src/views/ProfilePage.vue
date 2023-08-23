<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
              {{profile.bio}}
            </p>
            <button
              v-if="profile.username === currentUser.username"
              @click="routeToSettingsPage"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </button>
            <button
              v-else-if="profile.following === false"
              @click="follow"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{profile.username}}
            </button>
            <button
              v-else
              @click="unfollow"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-minus-round"></i>
              &nbsp; Unfollow {{profile.username}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <toggle-bar type="profilePage"/>

          <article-preview :globalArticles="globalArticles"/>

          <the-pagination :paginationNum="paginationNum"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import ToggleBar from '@/components/ToggleBar'
  import ArticlePreview from '@/components/ArticlePreview'
  import ThePagination from '@/components/ThePagination'
  import { mapState } from 'vuex'

  export default {
    name: 'ProfilePage',
    components: {
      ToggleBar,
      ArticlePreview,
      ThePagination
    },
    computed: {
      ...mapState(['profile', 'currentUser', 'globalArticles', 'isAuthenticated']),
      paginationNum() {
        //todo: 将此处的10解耦
        return Math.ceil((this.$store.state.articlesCount - 1) / 10)
      }
    },
    methods: {
      routeToSettingsPage() {
        this.$router.push({name: 'settingsPage'})
      },
      follow() {
        if (this.isAuthenticated)
          this.$store.dispatch('follow', this.profile.username)
        else
          this.$router.push({name: 'loginPage'})
      },
      unfollow() {
        this.$store.dispatch('unfollow', this.profile.username)
      }
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('getProfile', to.params.username).then(() => {
        next()
      })
    },
    beforeRouteUpdate(to, from, next) {
      store.dispatch('getProfile', to.params.username).then(() => {
        next()
      })
    },
    beforeMount() {
      this.$store.dispatch('getGlobalArticlesByUsername', {
        offset: 0,
        username: this.profile.username
      })
    },
    destroyed() {
      this.$store.commit('clearProfile')
      this.$store.commit('clearGlobalArticles')
    }
  }
</script>

<style>

</style>