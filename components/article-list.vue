<template>
  <div>
    <div v-if="articles.length > 0">
      <div class="article-preview" v-for="article in articles" :key="article.slug">
        <div class="article-meta">
          <nuxt-link :to="'/profile/' + article.author.username">
            <img :src="article.author.image"/>
          </nuxt-link>
            <div class="info">
                <nuxt-link class="author" :to="{name: 'profile', params: { username: article.author.username }}">
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MM DD, YYYY')}}</span>
            </div>
            <button
              class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{active: article.favorited}"
              @click="favoriteHandler(article)"
              :disabled="article.favoriteDisabled"
            >
                  <i class="ion-heart"></i> {{ article.favoritesCount}}
            </button>
        </div>
        <nuxt-link class="preview-link" :to="'/article/' + article.slug">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <ul class="tag-list" v-if="article.tagList.length > 0">
            <li v-for="(tag, index) in article.tagList" :key="index" class="tag-default tag-pill tag-outline">{{ tag }}</li>
          </ul>
          <slot></slot>
        </nuxt-link>
      </div>
      <hr />
      <pagination v-if="totalPage && rootPath" :rootPath="rootPath" :query="query" :totalPage="totalPage" :currPage="currPage"/>
    </div>
    <div v-else class="article-preview">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite } from '../api/article'
import Pagination from './pagination'

export default {
  name: 'ArticleList',
  components: {
    Pagination
  },
  props: {
    articles: {
      type: Array,
      required: true
    },
    totalPage: {
      type: Number,
    },
    rootPath: {
      type: String,
    },
    query: Object,
    currPage: Number
  },
  computed: {
    // isShowList: function () {return this.articles.length > 0}
  },
  mounted () {
  },
  methods: {
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
    }
  }
}
</script>

<style>

</style>