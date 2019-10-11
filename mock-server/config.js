
exports.port = process.env.port || 8008

exports.dataFile = './mock-data'

exports.api = {
  // 获取增加量
  'GET /api/increment/async': 'home/increment.json',
  // 获取用户列表
  'GET /api/user/list?pageNum=*': 'user/user.json',
}