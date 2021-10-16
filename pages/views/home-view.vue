<template>

  <div class="home-page">

      <div class="banner">
          <div class="container">
              <h1 class="logo-font">conduit</h1>
              <p>A place to share your knowledge.</p>
          </div>
      </div>

      <div class="container page">
          <div class="row">

              <div class="col-md-9">
                  <div class="feed-toggle">
                      <ul class="nav nav-pills outline-active">
                          <li class="nav-item">
                              <nuxt-link class="nav-link" exact :to="{name: 'home', query: { tab: 'your-feed' }}" :class="{active: tab === 'your-feed'}">
                                Your Feed
                              </nuxt-link>
                          </li>
                          <li class="nav-item">
                            <nuxt-link class="nav-link" exact :to="{name: 'home', query: { tab: 'global-feed' }}" :class="{active: tab === 'global-feed'}">
                              Global Feed
                            </nuxt-link>
                          </li>
                          <li class="nav-item" v-if="tab === 'tag'">
                            <nuxt-link class="nav-link" exact :to="{name: 'home', query: { tab: 'tag' }}" :class="{active: tab === 'tag'}">
                              #{{ tag }}
                            </nuxt-link>
                          </li>
                      </ul>
                  </div>
                  <article-list :articles="articles" :rootPath="'home'" :totalPage="totalPage" :currPage="page" :query="{tag: $route.query.tag, tab: tab}"/>
                  <!-- <hr /> -->

                  <!-- 分页列表 -->
                  <!-- <nav>
                    <ul class="pagination">
                      <li
                        class="page-item"
                        :class="{
                          active: item === page
                        }"
                        v-for="item in totalPage"
                        :key="item"
                      >
                        <nuxt-link
                          class="page-link"
                          :to="{
                            name: 'home',
                            query: {
                              page: item,
                              tag: $route.query.tag,
                              tab: tab
                            }
                          }"
                        >{{ item }}</nuxt-link>
                      </li>
                    </ul>
                  </nav> -->
                  <!-- <div class="article-preview" v-for="article in articles" :key="article.slug">
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
                      </nuxt-link>
                  </div> -->

              </div>

              <div class="col-md-3">
                  <div class="sidebar">
                      <p>Popular Tags</p>

                      <div class="tag-list">
                        <nuxt-link v-for="tag in tags" class="tag-pill tag-default" :to="{name: 'home', query: { tab: 'tag', tag: tag }}" :key="tag">
                          {{ tag }}
                        </nuxt-link>
                      </div>
                  </div>
              </div>

          </div>
      </div>

  </div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '../../api/article'
import { getTags } from '../../api/tags'
import ArticleList from '../../components/article-list'

export default {
  name: 'HomeView',
  components: {
    ArticleList
  },
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData ({ query, params, store}) {
    console.log('query', query, 'params', params)
    let page = Number.parseInt(query.page || 1)
    let limit = 2
    let tag = query.tag
    let tab = query.tab || 'global-feed'
    const loadArticles = store.state.user && tab === 'your-feed' ?
      getFeedArticles : getArticles
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])
    const {data: {articles, articlesCount}} = articleRes
    const {data: {tags}} = tagRes

    articles.forEach((article) => article.favoriteDisabled = false)

    console.log('home_articleList', articles, 'articlesCount', articlesCount)
    const totalPage = Math.ceil(articlesCount / limit)

    return {
      articles,
      articlesCount,
      tags,
      tab,
      page,
      limit,
      tag,
      totalPage
    }
  },
  methods: {
    // async favoriteHandler (article) {
    //   // console.log('article', article)
    //   article.favoriteDisabled = true
    //   if (article.favorited) {
    //     await deleteFavorite(article.slug)
    //     article.favoritesCount -= 1
    //     article.favorited = false
    //   } else {
    //     await addFavorite(article.slug)
    //     article.favoritesCount += 1
    //     article.favorited = true
    //   }
    //   article.favoriteDisabled = false
    // }
  }
}
</script>

<style>

</style>