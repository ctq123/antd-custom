
exports.port = process.env.port || 8008

exports.dataFile = './mock-data'

exports.api = {
  // 获取用户权限列表
  'POST /api/token/check': 'app/permission.json',
  // 异常处理-缺货率处理
  'POST /manager/operation_tools/oos_rate/exception_process': 'optool/outstock.json',
  // 异常处理-签收率处理
  'POST /manager/operation_tools/t4_stock_rate/exception_process': 'optool/sign.json',
  // 获取图表1
  'GET /api/chart1': 'home/chart1.json',
  // 获取图表2
  'GET /api/chart2': 'home/chart2.json',
  // 获取增加量
  'GET /api/increment/async': 'home/increment.json',
  // 获取用户列表
  'GET /api/user/list?pageNum=*': 'user/user.json',
  
}