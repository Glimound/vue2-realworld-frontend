<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link to="/register">Need an account?</router-link>
          </p>

          <ul  class="error-messages">
            <li v-for="(value, name, index) in errorMessages" :key="index">
              <span v-for="(msg, index) in value" :key="index">{{name}} {{msg}}</span>
            </li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input v-model="email" class="form-control form-control-lg" type="email" placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password" />
            </fieldset>
            <button @click.prevent="login" class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: "",
        password: ""
      }
    },
    computed: {
      ...mapState(['errorMessages', 'currentUser'])
    },
    methods: {
      login() {
        this.$store.dispatch('login', {
          'email': this.email,
          'password': this.password
        }).then(() => {
          this.$router.replace({ name: 'homePage' })
        })
      }
    },
    destroyed() {
      this.$store.commit('clearErrorMessages')
    }
  }
</script>

<style>

</style>