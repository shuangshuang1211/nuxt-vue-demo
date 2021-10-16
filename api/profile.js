import { request } from '../plugins/request'

// get a user profile
export const getUserProfile = (username) => request({
  method: 'GET',
  url: `/api/profiles/${username}`,
})
// follow a user
export const followUser = (username) => request({
  method: 'POST',
  url: `/api/profiles/${username}/follow`,
})

// cancel follow a user
export const deleteFollowUser = (username) => request({
  method: 'DELETE',
  url: `/api/profiles/${username}/follow`,
})
