<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-show="isAuthenticated" class="nav-item">
        <a class="nav-link" href="">Your Feed</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="">Global Feed</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'FeedToggle',
    computed: {
      ...mapState(['isAuthenticated'])
    }
  }
</script>

<style>

</style>