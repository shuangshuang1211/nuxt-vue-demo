import { request } from '../plugins/request'

// get tag list
export const getTags = () => request({
  method: 'GET',
  url: '/api/tags'
})