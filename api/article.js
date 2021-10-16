import { request } from '../plugins/request'

// get article list
export const getArticles = (params) => request({
  method: 'GET',
  url: '/api/articles',
  params
})
// get feed articles
export const getFeedArticles = (params) => request({
  method: 'GET',
  url: '/api/articles/feed',
  params
})

// article favorite
export const addFavorite = (slug) => request({
  method: 'POST',
  url: `/api/articles/${slug}/favorite`,
})

// article unfavorite
export const deleteFavorite = (slug) => request({
  method: 'DELETE',
  url: `/api/articles/${slug}/favorite`,
})

// get article  detail
export const getArticle = (slug) => request({
  method: 'GET',
  url: `/api/articles/${slug}`,
})

// get article comments
export const getComments = (slug) => request({
  method: 'GET',
  url: `/api/articles/${slug}/comments`,
})

// add article new comments
export const postComment = (slug, data) => request({
  method: 'POST',
  url: `/api/articles/${slug}/comments`,
  data
})

// delete a comment for article
export const deleteComment = (slug, id) => request({
  method: 'POST',
  url: `/api/articles/${slug}/comments/${id}`,
})

// add a new article
export const addNewArticle = (data) => request({
  method: 'POST',
  url: `/api/articles`,
  data
})

// update a article
export const updateArticle = (slug, data) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}

// delete a article
export const deleteArticle = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  })
}