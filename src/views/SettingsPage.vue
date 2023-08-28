<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <ul  class="error-messages">
            <li v-for="(value, name, index) in errorMessages" :key="index">
              <span v-for="(msg, index) in value" :key="index">{{name}} {{msg}}</span>
            </li>
          </ul>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input v-model="image" class="form-control" type="text" placeholder="URL of profile picture" />
              </fieldset>
              <fieldset class="form-group">
                <input v-model="username" class="form-control form-control-lg" type="text" placeholder="Your Name" />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="email" class="form-control form-control-lg" type="email" placeholder="Email" />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="newPassword"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                />
              </fieldset>
              <button @click.prevent="updateSettings" class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
          <hr />
          <button @click="logout" class="btn btn-outline-danger">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'SettingsPage',
    data() {
      return {
        image: '',
        username: '',
        bio: '',
        email: '',
        newPassword: ''
      }
    },
    computed: {
      ...mapState(['errorMessages', 'currentUser'])
    },
    methods: {
      updateSettings() {
        this.$store.dispatch('updateCurrentUser', {
          email: this.email,
          password: this.newPassword,
          username: this.username,
          bio: this.bio,
          image: this.image
        }).then((data) => {
          this.$router.push(`/profile/@${data.user.username}`)
        })
      },
      logout() {
        this.$store.commit('clearAuthentication')
        this.$store.commit('clearCurrentUser')
        this.$router.push({ name: 'homePage' })
      }
    },
    beforeMount() {
      this.email = this.currentUser.email,
      this.username = this.currentUser.username,
      this.bio = this.currentUser.bio,
      this.image = this.currentUser.image
    },
    destroyed() {
      this.$store.commit('clearErrorMessages')
    }
  }
</script>

<style>

</style>