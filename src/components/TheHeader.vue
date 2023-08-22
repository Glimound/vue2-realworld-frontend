<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <!-- 用户未通过鉴权的情况 -->
      <ul v-if="!isAuthencated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" exact-active-class="active" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" to="/login">Sign in</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" to="/register">Sign up</router-link>
        </li>
      </ul>
      <!-- 用户通过鉴权的情况 -->
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" exact-active-class="active" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" to="/editor"> <i class="ion-compose"></i>&nbsp;New Article </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" to="/settings"> <i class="ion-gear-a"></i>&nbsp;Settings </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="`/profile/@${currentUser.username}`">
            <img :src="currentUser.image" class="user-pic" />
            {{currentUser.username}}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'TheHeader',
    computed: {
      ...mapState(['currentUser']),
      isAuthencated() {
        return this.$store.state.isAuthenticated
      }
    }
  }
</script>

<style>

</style>