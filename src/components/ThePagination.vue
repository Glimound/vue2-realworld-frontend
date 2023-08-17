<template>
  <ul class="pagination">
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
  export default {
    name: 'ThePagination',
    props: {
      paginationNum: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        currentPagination: 1
      }
    },
    methods: {
      changePageTo(num) {
        this.$store.dispatch('getGlobalArticles', num*10)
        this.currentPagination = num
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