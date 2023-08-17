<template>
  <div class="article-meta">
    <router-link :to="`/profile/@${article.author.username}`"><img :src="article.author.image" /></router-link>
    <div class="info">
      <router-link :to="`/profile/@${article.author.username}`" class="author">{{article.author.username}}</router-link>
      <span class="date">{{dateStr(article.createdAt)}}</span>
    </div>
    <ArticleOprations v-if="action" :article="article"/>
    <button v-else :class="btnClass">
      <i class="ion-heart"></i> {{article.favoritesCount}}
    </button>
  </div>
</template>

<script>
  import ArticleOprations from '@/components/ArticleOperations'
  import { daySuffix, parseDate, parseMonth } from '@/utils/dateParser'
  export default {
    name: 'ArticleMeta',
    components: {
      ArticleOprations
    },
    props: {
      article: {
        type: Object,
        required: true
      },
      action: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    computed: {
      btnClass() {
        return {
          btn: true,
          'btn-sm': true,
          'pull-xs-right': true,
          'btn-outline-primary': !this.article.favorited,
          'btn-primary': this.article.favorited
        }
      }
    },
    methods: {
      dateStr(str) {
        if (!str)
          return null
        if (this.action) {
          let date = parseDate(str)
          let day = (date.day[0] === '0') ? date.day[1] : date.day
          return `${parseMonth(date.month)} ${day}${daySuffix(date.day)}`
        } else {
          let date = parseDate(str)
          let month = parseMonth(date.month)
          return `${month} ${date.day}, ${date.year}`
        }
      }
    }
  }
</script>

<style>

</style>