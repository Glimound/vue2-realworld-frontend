<template>
  <div v-if="type === 'homePage'" class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-if="isAuthenticated" class="nav-item">
        <a :class="yourFeedClass" href="/" @click.prevent="changeTo('yourFeed')">Your Feed</a>
      </li>
      <li class="nav-item">
        <a :class="globalFeedClass" href="/" @click.prevent="changeTo('globalFeed')">Global Feed</a>
      </li>
      <li v-if="!!currentTag" class="nav-item">
        <a class="nav-link active" href="/" @click.prevent>
          <i class="ion-pound"></i> {{currentTag}}
        </a>
      </li>
    </ul>
  </div>
  <div v-else class="articles-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item">
        <a :class="myArticlesClass" href="/" @click.prevent="changeTo('myArticles')">My Articles</a>
      </li>
      <li class="nav-item">
        <a :class="favoritedArticlesClass" href="/" @click.prevent="changeTo('favoritedArticles')">Favorited Articles</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'ToggleBar',
    props: {
      type: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState(['isAuthenticated', 'currentTag', 'profile', 'toggleChecked']),
      toggleCheck() {
        // 设置默认选中
        if (this.toggleChecked === '')
          return this.isAuthenticated ? 'yourFeed' : 'globalFeed'
        else
          return this.toggleChecked
      },
      globalFeedClass() {
        return {
          'nav-link': true,
          active: !this.currentTag && (this.toggleCheck === 'globalFeed')
        }
      },
      yourFeedClass() {
        return {
          'nav-link': true,
          active: !this.currentTag && (this.toggleCheck === 'yourFeed')
        }
      },
      myArticlesClass() {
        return {
          'nav-link': true,
          active: this.toggleChecked === 'myArticles' || !this.toggleChecked
        }
      },
      favoritedArticlesClass() {
        return {
          'nav-link': true,
          active: this.toggleChecked === 'favoritedArticles'
        }
      }
    },
    methods: {
      clearTag() {
        this.$store.commit('clearCurrentTag')
        this.$store.commit('resetCurrentPagination')
        this.$store.commit('clearGlobalArticles')
      },
      changeTo(str) {
        switch (str) {
          case 'globalFeed':
            this.$store.commit('setToggleChecked', 'globalFeed')
            this.clearTag()
            this.$store.dispatch('getGlobalArticles', 0)
            break
          case 'yourFeed':
            this.$store.commit('setToggleChecked', 'yourFeed')
            this.clearTag()
            this.$store.dispatch('getGlobalArticlesByYourFeed', 0)
            break
          case 'myArticles':
            this.$store.commit('setToggleChecked', 'myArticles')
            this.$store.commit('resetCurrentPagination')
            this.$store.commit('clearGlobalArticles')
            this.$store.dispatch('getGlobalArticlesByUsername', {
              offset: 0,
              username: this.profile.username
            })
            break
          case 'favoritedArticles':
            this.$store.commit('setToggleChecked', 'favoritedArticles')
            this.$store.commit('resetCurrentPagination')
            this.$store.commit('clearGlobalArticles')
            this.$store.dispatch('getGlobalArticlesByFavorited', {
              offset: 0,
              username: this.profile.username
            })
            break
        }
      }
    },
    destroyed() {
      this.$store.commit('clearToggleChecked')
    }
  }
</script>

<style>

</style>