<template >
  <div class="article-meta" v-if="article && article.author">
    <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}">
      <img :src="article.author.image"/>
    </nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{name: 'profile', params: {username: article.author.username}}">
        {{ article.author.username }}
      </nuxt-link>
        <span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>
    <template v-if="user.username !== article.author.username">
      <button class="btn btn-sm btn-outline-secondary" :class="{active: !!article.author.following}" @click="followHandler">
        <i class="ion-plus-round"></i>

        &nbsp;
        Follow {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{active: article.favorited}"
        @click="favoriteHandler(article)"
        :disabled="article.favoriteDisabled"
      >
          <i class="ion-heart"></i>
          &nbsp;
          Favorite <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
    <template v-else>
      <nuxt-link class="btn btn-outline-secondary btn-sm" :to="'/article/'+ article.slug" >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <!-- :disabled="article.favoriteDisabled" -->
      <button
        class="btn btn-outline-danger btn-sm"
        @click="deleteArticleHandler"
      >
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article
      </button>
    </template>
</div>
</template>

<script>
import { followUser, deleteFollowUser } from '../api/profile'
import { addFavorite, deleteFavorite, deleteArticle } from '../api/article'
import { mapState } from 'vuex'


export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async followHandler () {
      if (!this.article.author.following) {
        const res = await followUser(this.article.author.username)
        console.log('follow===>', res)
        if (res.status === 200) {
          this.article.author.following = true
        }
      } else {
        const res = await deleteFollowUser(this.article.author.username)
        console.log('deleteFollow===>', res)
        if (res.status === 200) {
          this.article.author.following = false
        }
      }
    },
    async favoriteHandler (article) {
      // console.log('article', article)
      article.favoriteDisabled = true
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favoritesCount -= 1
        article.favorited = false
      } else {
        await addFavorite(article.slug)
        article.favoritesCount += 1
        article.favorited = true
      }
      article.favoriteDisabled = false
    },
    async deleteArticleHandler () {
      const deletData = await deleteArticle(this.article.slug)
      if (!deletData.data || deletData.status === 204) {
        this.$router.push(`/profile/${this.user.username}`)
      }
    }
  }
}
</script>

<style>

</style>