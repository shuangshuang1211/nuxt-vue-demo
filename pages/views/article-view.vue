<template>
  <div class="article-page">

      <div class="banner">
          <div class="container">

              <h1>{{ article.title }}</h1>
              <article-meta :article="article"/>

          </div>
      </div>

      <div class="container page">

          <div class="row article-content">
            <div class="col-md-12" v-html="article.body"></div>
            <hr/>
            <ul class="tag-list">
              <li class="tag-default tag-pill tag-outline" v-for="(tag, index) in article.tagList" :key="index">
                {{ tag }}
              </li>
            </ul>
          </div>

          <hr/>

          <div class="article-actions">
            <article-meta :article="article"/>
          </div>

          <div class="row">

              <div class="col-xs-12 col-md-8 offset-md-2">

                  <form class="card comment-form">
                      <div class="card-block">
                          <textarea v-model="newComment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                      </div>
                      <div class="card-footer">
                          <img :src="user.image" class="comment-author-img"/>
                          <button class="btn btn-sm btn-primary" @click="postCommentHandler">
                            Post Comment
                          </button>
                      </div>
                  </form>

                  <article-comment :article="article" />

              </div>

          </div>
      </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import { getArticle, postComment } from '../../api/article'
import ArticleMeta from '../../components/article-meta'
import ArticleComment from '../../components/article-comment'
import { mapState } from 'vuex'


export default {
  name: 'Article',
  components: {
    ArticleMeta,
    ArticleComment
  },
  data() {
    return {
      newComment: ""
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async asyncData ({ params }) {
    const {data, status} = await getArticle(params.slug)
    // console.log('data_article', data);
    let article
    if (data && status === 200) {
      article = data.article
      const md = new MarkdownIt()
      article.body = md.render(article.body || '')
    } else {
      console.error('get article failed')
    }
    return {
      article
    }
  },
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  },
  methods: {
    async postCommentHandler () {
      // console.log('newComment', this.newComment)
      const data = await postComment(this.article.slug, {comment: {body: this.newComment}})
      if (data && data.status === 200) {
        // console.log('xiugai comments')
      }
    }
  }
}
</script>

<style>

</style>