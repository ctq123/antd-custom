import axios from 'axios'

export async function getUserPermList(payload) {
  return axios.get('/api/auth/list', {
    params: payload
  }).then(resp => {
    return Promise.resolve(resp)
  }).catch(e => {
    return null
  })
}