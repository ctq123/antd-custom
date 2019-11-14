/**
 * 获取有效属性，去除属性值前后空格
 * @param {*} obj 
 * @param {*} Excludes 需要剔除的无效属性值
 */
export function getValidProperty(obj, Excludes=[null, undefined, '']) {
  for(const key in obj) {
    const val = obj[key]
    // 去除前后空格
    if (typeof val === 'string') {
      obj[key] = val.trim()
    }
    // 判断是否合法
    if (Excludes.includes(obj[key])) {
      delete obj[key]
    }
  }
  return obj
}

/**
 * 检查值的长度或数值的有效范围
 * @param {*} val 值
 * @param {*} min 最小
 * @param {*} max 最大
 * @return 0: 有效，1: 过小，2: 过大
 */
export function checkValidValue(val, min=1, max=50) {
  let res = 0
  if (val === null || val === undefined) {
    return 1
  }
  const type = (typeof val)
  switch(type) {
    case 'string':
      res = val.length < min ? 1 : 0
      res = val.length > max ? 2 : 0
      break
    case 'number':
      res = val < min ? 1 : 0
      res = val > max ? 2 : 0
      break
  }
  return res
}

/**
 * 提取html标签内部的text内容
 * 即：过滤所有<?>尖括号中的内容
 * @param {} html 
 */
export function htmlText(html) {
  return html.replace(/<[^>]+>/igm, '')
}

/**
 * 判断html内容是否为空
 * @param {} html 
 */
export function htmlIsEmpty(html) {
  return !htmlText(html).replace(/[\s]/g, '')
}