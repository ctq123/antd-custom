import { all, put, call, takeLatest  } from 'redux-saga/effects'

// 用于缓存所有effects函数
const sagas = []
// 读取所有.model.js结尾的文件
const models = require.context('../', true, /\.model\.js$/)

models.keys().map(path => {
  // 引入model
  // path = path.replace(/^(\.\/)/g, '')
  // const item = require('../' + path).default
  /**
   * 坑：记录下
   * 影响：打包分割，按需加载
   * 分析：webpack解析require('../'+path)等价于正则表达式/\.\.\/* /
   *      因此这一步会将src下所有目录文件引入main.js文件中
   *      另一种方法是改成异步引入，import('../'+path).then(item => {...})
   *      异步引入是不会影响打包分割，但会影响程序运行正确性（本文件生成saga是同步过程）
   */

  // 正确引入model文件姿势
  const item = models(path).default

  // 对每个model进行操作-处理对应的effects
  if (item && item.effects) {
    const { effects } = item
    for(let key in effects) {
      const watch = function* () {
        yield takeLatest(key, function*(obj) {
          // 第二个参数只传递了最常用的call,put进去，
          // 如果想用更多其他'redux-saga/effects'的API，可在各自model中自行引入
          try {
            yield effects[key](obj, { call, put })
          } catch(e) {
            // 统一处理effects抛出的错误
          }
        })
      }
      sagas.push(watch())
    }
  }
})

export default function *rootSaga() {
  yield all(sagas)
}