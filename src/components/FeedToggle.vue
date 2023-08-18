<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-if="isAuthenticated" class="nav-item">
        <a class="nav-link" href="">Your Feed</a>
      </li>
      <li class="nav-item">
        <a :class="globalFeedClass" href="/" @click.prevent="clearTag">Global Feed</a>
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
    computed: {
      ...mapState(['isAuthenticated', 'currentTag']),
      globalFeedClass() {
        return {
          'nav-link': true,
          active: !this.currentTag
        }
      }
    },
    methods: {
      clearTag() {
        this.$store.commit('clearCurrentTag')
        this.$store.commit('resetCurrentPagination')
        this.$store.commit('clearGlobalArticles')
        this.$store.dispatch('getGlobalArticles', 0)
      }
    }
  }
</script>

<style>

</style>