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
      ...mapState(['currentTag', 'currentPagination'])
    },
    methods: {
      changePageTo(num) {
        if (!this.currentTag)
          this.$store.dispatch('getGlobalArticles', (num - 1) * 10)
        else
          this.$store.dispatch('getGlobalArticlesByTag', {
            offset: (num - 1) * 10,
            tag: this.currentTag
          })
        // todo: tag间切换时vuex的数据未清空
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