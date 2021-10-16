<template>

  <div class="profile-page">

    <div class="user-info">
        <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                    <img :src="profile.image" class="user-img"/>
                    <h4>{{ profile.username }}</h4>
                    <p>
                      {{ profile.bio }}
                    </p>
                    <button v-if="profile.username !== user.username" :disabled="disableBtn" class="btn btn-sm btn-outline-secondary action-btn" @click="followUserHandler">
                        <i class="ion-plus-round"></i>
                        &nbsp;
                        {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }}
                    </button>
                    <button v-else class="btn btn-sm btn-outline-secondary action-btn" @click="editProfileHandler">
                        <i class="ion-edit"></i>
                        &nbsp;
                        Edit {{ profile.username }} Profile Settings
                    </button>
                </div>

            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                    <ul class="nav nav-pills outline-active">
                        <li class="nav-item">
                            <nuxt-link exact class="nav-link" :class="{active: tab === 'my-articles'}" :to="{name: 'profile', query: { tab: 'my-articles' }}">My Articles</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link exact class="nav-link" :class="{active: tab === 'favorited-articles'}" :to="{name: 'profile', query: { tab: 'favorited-articles' }}">Favorited Articles</nuxt-link>
                        </li>
                    </ul>
                </div>

                <article-list :articles="articles" :rootPath="'profile'" :totalPage="totalPage" :currPage="currPage" :query="{tab: tab}"/>

            </div>

        </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserProfile, deleteFollowUser, followUser } from '../../api/profile'
import { getArticles } from '../../api/article'
import ArticleList from '../../components/article-list'

export default {
  name: 'UserProfile',
  middleware: 'authUser',
  watchQuery: ['tab', 'page'],
  components: {
    ArticleList
  },
  async asyncData ({params, query, store}) {
    console.log('params', params, 'query', query)
    const tab = query.tab || 'favorited-articles'
    const currPage = query.page || 1
    let limit = 5

    const res = await getUserProfile(params.username)
    let profile
    let articles, totalArticles
    if (res && res.status === 200) {
      const { data } = res
      profile = data.profile
      console.log('profile_info===>', data)
      let query = { limit, offset: (currPage - 1) * limit}
      const params = store.state.user && tab === 'my-articles' ?
        { author: profile.username, ...query} :
        { favorited: profile.username, ...query}
      const resArticles = await getArticles(params)
      if (resArticles && resArticles.status === 200) {
        articles = resArticles.data.articles
        totalArticles = resArticles.data.articlesCount
      }
    } else {
      console.log('get profile info failed')
    }
    const totalPage = Math.ceil(totalArticles / limit)
    console.log('profile_articles===>', articles)

    return {
      profile,
      tab,
      articles,
      totalPage,
      currPage: Number(currPage)
    }
  },
  data () {
    return {
      disableBtn: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async followUserHandler () {
      this.disableBtn = true
      if (!this.profile.following) {
        const res = await followUser(this.profile.username)
        // console.log('profile_follow===>', res)
        if (res.status === 200) {
          this.profile.following = true
        }
      } else {
        const res = await deleteFollowUser(this.profile.username)
        // console.log('profile_deleteFollow===>', res)
        if (res.status === 200) {
          this.profile.following = false
        }
      }
      this.disableBtn = false
    },
    editProfileHandler () {
      this.$router.push('/settings')
    }
  }
}
</script>

<style>

</style>