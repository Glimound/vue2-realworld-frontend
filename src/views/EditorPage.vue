<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul  class="error-messages">
            <li v-for="(value, name, index) in errorMessages" :key="index">
              <span v-for="(msg, index) in value" :key="index">{{name}} {{msg}}</span>
            </li>
          </ul>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input v-model="title" type="text" class="form-control form-control-lg" placeholder="Article Title" />
              </fieldset>
              <fieldset class="form-group">
                <input v-model="description" type="text" class="form-control" placeholder="What's this article about?" />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="tagInput" @keyup.enter="addTag" type="text" class="form-control" placeholder="Enter tags" />
                <div class="tag-list">
                  <span v-for="(tag, index) in tagList" :key="index" class="tag-default tag-pill">
                    <i @click="removeTag(index)" class="ion-close-round"></i> {{tag}}
                  </span>
                </div>
              </fieldset>
              <button @click.prevent="publish" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import { mapState } from 'vuex'

  export default {
    name: 'EditorPage',
    data() {
      return {
        title: '',
        description: '',
        body: '',
        tagList: [],
        tagInput: ''
      }
    },
    computed: {
      ...mapState(['errorMessages', 'article', 'isAuthenticated', 'currentUser'])
    },
    methods: {
      publish() {
        // article为空（新建文章的情况）
        if (Object.keys(this.article).length === 0) {
          this.$store.dispatch('createArticle', {
            article: {
              title: this.title,
              description: this.description,
              body: this.body,
              tagList: this.tagList
            }
          }).then((data) => {
            this.$store.commit('clearArticle')
            this.$router.push(`/article/${data.article.slug}`)
          })
        } else {
          this.$store.dispatch('updateArticle', {
            slug: this.article.slug,
            post: {
              article: {
                title: this.title,
                description: this.description,
                body: this.body,
                tagList: this.tagList
              }
            }
          }).then((data) => {
            this.$store.commit('clearArticle')
            this.$router.push(`/article/${data.article.slug}`)
          })
        }
      },
      addTag() {
        this.tagList.push(this.tagInput)
        this.tagInput = ''
      },
      removeTag(index) {
        this.tagList.splice(index, 1)
      }
    },
    beforeRouteEnter(to, from, next) {
      // 若有slug，则获取该slug对应的article
      if (to.params.slug) {
        store.dispatch('getArticle', to.params.slug).then(() => {
          // 已登录且该文章作者为自己
          if (store.state.isAuthenticated && store.state.currentUser.username === store.state.article.author.username) {
            next(vm => {
              vm.title = store.state.article.title
              vm.description = store.state.article.description
              vm.body = store.state.article.body
              vm.tagList = store.state.article.tagList
            })
          } else {
            store.commit('clearArticle')
            next('/')
          }
        })
      } else {
        next()
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (to.params.slug) {
        this.$store.dispatch('getArticle', to.params.slug).then(() => {
          if (this.isAuthenticated && this.currentUser.username === this.article.author.username) {
            this.title = this.article.title
            this.description = this.article.description
            this.body = this.article.body
            this.tagList = this.article.tagList
            next()
          } else {
            this.$store.commit('clearArticle')
            next('/')
          }
        })
      } else {
        // 清除原有的article和data保存的数据
        this.$store.commit('clearArticle')
        this.title = '',
        this.description = '',
        this.body = '',
        this.tagList = []
        next()
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit('clearArticle')
      next()
    },
    destroyed() {
      this.$store.commit('clearErrorMessages')
    }
  }
</script>

<style>

</style>