<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/login">Have an account?</router-link>
          </p>

          <ul  class="error-messages">
            <li v-for="(value, name, index) in errorMessages" :key="index">
              <span v-for="(msg, index) in value" :key="index">{{name}} {{msg}}</span>
            </li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input v-model="username" class="form-control form-control-lg" type="text" placeholder="Username" />
            </fieldset>
            <fieldset class="form-group">
              <input v-model="email" class="form-control form-control-lg" type="email" placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password" />
            </fieldset>
            <button @click.prevent="register" class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'RegisterPage',
    data() {
      return {
        username: '',
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapState(['errorMessages'])
    },
    methods: {
      register() {
        this.$store.dispatch('register', {
          'username': this.username,
          'email': this.email,
          'password': this.password
        }).then(() => {
          this.$router.replace({ name: 'homePage' })
        })
      },
      destroyed() {
        this.$store.commit('clearErrorMessages')
      }
    }
  }
</script>

<style>

</style>