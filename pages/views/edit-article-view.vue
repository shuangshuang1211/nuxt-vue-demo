<template>
  <div class="editor-page">
      <div class="container page">
          <div class="row">

              <div class="col-md-10 offset-md-1 col-xs-12">
                  <form>
                      <fieldset>
                          <fieldset class="form-group">
                              <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
                          </fieldset>
                          <fieldset class="form-group">
                              <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
                          </fieldset>
                          <fieldset class="form-group">
                              <textarea v-model="article.body" class="form-control" rows="8"
                                        placeholder="Write your article (in markdown)"></textarea>
                          </fieldset>
                          <fieldset class="form-group">
                              <input v-model="article.tagList" type="text" class="form-control" placeholder="Enter tags, please separated by commas, eg: tag1,tag2">
                              <div class="tag-list"></div>
                          </fieldset>
                          <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="addNewArticleHandler">
                              {{ this.isUpdateArticle ? 'Update Article' : 'Publish Article' }}
                          </button>
                      </fieldset>
                  </form>
              </div>

          </div>
      </div>
  </div>
</template>

<script>
import { addNewArticle, updateArticle, getArticle } from '../../api/article'

export default {
  middleware: 'authUser',
  name: 'EditArticle',
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: ''
      },
    }
  },
  async mounted () {
    if (this.$route.params.slug) {
      const {data, status} = await getArticle(this.$route.params.slug)
      if (status === 200 && data) {
        // console.log('data.article===>', data.article, data.article.tagList.join(','))
        this.article = {...data.article, tagList: data.article.tagList.join(',')}
      }
    }
  },
  computed: {
    isUpdateArticle: function() {
      return !!this.$route.params.slug && this.article.slug
    }
  },
  methods: {
    async addNewArticleHandler () {
      let res
      if (this.isUpdateArticle) {
        res = await updateArticle(this.article.slug, {
          article: {
            title: this.article.title,
            description: this.article.description,
            body: this.article.body,
            // ...this.article,
            tagList: this.article.tagList.split(',')
          }
        })
      } else {
        res = await addNewArticle({
          article: {
            ...this.article,
            tagList: this.article.tagList.split(',')
          }
        })
      }
      if (res && res.status === 200) {
      this.$router.push(`/article/${res.data.article.slug}`)
      }
    }
  }
}
</script>

<style>

</style>