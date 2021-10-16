<template>
  <div>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
          <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="'/profile/' + comment.author.username" class="comment-author">
            <img :src="comment.author.image" class="comment-author-img"/>
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="'/profile/' + comment.author.username" class="comment-author">{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span v-if="comment.author.username === user.username" class="mod-options" @click="deleteCommentHandler(comment)">
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getComments, deleteComment } from '../api/article'

export default {
  name: "ArticleComment",
  props: {
    article: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      comments: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted () {
    const data = await getComments(this.article.slug)
    if (data && data.status === 200) {
      const {data: {comments}} = data
      this.comments = comments
    } else {
      console.error('get comments failed')
    }
  },
  methods: {
    async deleteCommentHandler (comment) {
      const res = await deleteComment(this.article.slug, comment.id)
      if (res.status === 204) {
        // console.log('评论删除成功')
        this.comments = this.comments.filter((com) => com.id !== comment.id)
      }
    }
  }
}
</script>

<style>

</style>