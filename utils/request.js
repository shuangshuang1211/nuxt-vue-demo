import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})
