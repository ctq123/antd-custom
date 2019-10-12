
exports.port = process.env.port || 8008

exports.dataFile = './mock-data'

exports.api = {
  // 登陆认证
  'POST /api/login': 'login/login.json',
  // 获取用户权限列表
  'GET /api/auth/list?username=*': 'app/permission.json',
  // 获取增加量
  'GET /api/increment/async': 'home/increment.json',
  // 获取用户列表
  'GET /api/user/list?pageNum=*': 'user/user.json',
}