import axios from 'axios'

export async function login(payload) {
  // 模拟后端验证登陆名和密码，正式环境应该去掉
  if (payload.username != 'guest' || payload.password != 'guest') {
    return null
  }
  return axios.post('/api/login', {
    ...payload
  }).then(resp => {
    return Promise.resolve(resp)
  }).catch(e => {
    return null
  })
}