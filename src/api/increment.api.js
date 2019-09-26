
export async function increment(payload) {
  const { data } = payload || {}
  // fetch, axios向后端发起请求，这里用setTimeout模拟异步
  return new Promise(resolve => {
    if (payload) {
      console.log('payload', payload)
      setTimeout(() => {
        resolve(payload)
      }, 1000)
    }
  })
}