import { rejects } from "assert";

export async function login(payload) {
  // fetch, axios向后端发起请求，这里用setTimeout模拟异步
  return new Promise((resolve, rejects) => {
    if (payload) {
      console.log('payload', payload)
      const { username, password } = payload
      if (username === 'guest' && password === 'guest') {
        const data = { ...payload, success: true }
        setTimeout(() => {
          resolve(data)
        }, 1000)
      } else {
        setTimeout(() => {
          rejects(null)
        }, 1000)
      } 
    } else {
      rejects(null)
    }
  })
}