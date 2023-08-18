<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <p v-if="isLoading">Loading tags...</p>
    <div v-else class="tag-list">
      <a
        v-for="(tag, index) in popularTags"
        :key="index"
        @click.prevent="filterArticles(tag)"
        href=""
        class="tag-pill tag-default"
      >
        {{tag}}
      </a>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'TagList',
    computed: {
      ...mapState(['popularTags']),
      isLoading() {
        return !this.popularTags.length
      }
    },
    methods: {
      filterArticles(tag) {
        this.$store.commit('clearGlobalArticles')
        this.$store.dispatch('getGlobalArticlesByTag', {
          offset: 0,
          tag: tag
        })
        this.$store.commit('setCurrentTag', tag)
        this.$store.commit('resetCurrentPagination')
      }
    },
    beforeMount() {
      this.$store.dispatch('getPopularTags')
    }
  }
</script>

<style>

</style>