import axios from 'axios'

export async function increment(payload) {
  return axios({
    url: '/api/increment/async',
    method: 'get',
  }).then(resp => {
    return Promise.resolve(resp)
  }).catch(e => {
    return null
  })
}