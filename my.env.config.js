const local = require('./env.local.json')
const dev = require('./env.dev.json')
const test = require('./env.test.json')
const pre = require('./env.pre.json')
const prod = require('./env.prod.json')

// 注意local才是本地开发环境，dev是develop分支环境
module.exports = {
  local, dev, test, pre, prod
}
