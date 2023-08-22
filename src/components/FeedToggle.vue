<template>
  <div class="feed-toggle">
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
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'FeedToggle',
    props: {
      type: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        checked: ''
      }
    },
    computed: {
      ...mapState(['isAuthenticated', 'currentTag']),
      toggleCheck() {
        // 设置默认选中
        if (this.checked === '')
          return this.isAuthenticated ? 'yourFeed' : 'globalFeed'
        else
          return this.checked
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
            this.checked = 'globalFeed'
            this.clearTag()
            this.$store.dispatch('getGlobalArticles', 0)
            break
          case 'yourFeed':
            this.checked = 'yourFeed'
            this.clearTag()
            this.$store.dispatch('getGlobalArticlesByYourFeed', 0)
            break
        }
      }
    }
  }
</script>

<style>

</style>