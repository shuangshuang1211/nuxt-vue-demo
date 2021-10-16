import { request } from '../plugins/request'

// user login
export const login = (data) => request({
  method: 'POST',
  url: 'api/users/login',
  data
})

// user register
export const register = (data) => request({
  method: 'POST',
  url: '/api/users',
  data
})

// update user profile
export const updateProfile = (data) => request({
  method: 'PUT',
  url: '/api/user',
  data
})