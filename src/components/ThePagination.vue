<template>
  <ul v-if="paginationNum > 1" class="pagination">
    <li 
      v-for="n in paginationNum"
      :key="n"
      :class="pageItemClass(n)"
      @click.prevent="changePageTo(n)"
    >
      <a class="page-link" href="">{{n}}</a>
    </li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'ThePagination',
    props: {
      paginationNum: {
        type: Number,
        required: true
      }
    },
    computed: {
      ...mapState(['currentTag', 'currentPagination', 'profile', 'toggleChecked'])
    },
    methods: {
      changePageTo(num) {
        if (this.currentTag)
          this.$store.dispatch('getGlobalArticlesByTag', {
            offset: (num - 1) * 10,
            tag: this.currentTag
          })
        else if (!!this.profile && this.toggleChecked === 'myArticles')
          this.$store.dispatch('getGlobalArticlesByUsername', {
            offset: (num - 1) * 10,
            username: this.profile.username
          })
        else if (!!this.profile && this.toggleChecked === 'favoritedArticles')
          this.$store.dispatch('getGlobalArticlesByFavorited', {
            offset: (num - 1) * 10,
            username: this.profile.username
          })
        else
          this.$store.dispatch('getGlobalArticles', (num - 1) * 10)
        this.$store.commit('setCurrentPagination', num)
      },
      pageItemClass(n) {
        return {
          'page-item': true,
          active: n === this.currentPagination
        }
      }
    }
  }
</script>

<style>

</style>