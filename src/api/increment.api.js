
export async function increment(payload) {
  const { data } = payload || {}
  return new Promise(resolve => {
    if (payload) {
      console.log('payload', payload)
      setTimeout(() => {
        resolve(payload)
      }, 1000)
    }
  })
}