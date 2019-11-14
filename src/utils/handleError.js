import { message, Modal } from 'antd'

/**
 * 沿用原vue系统getAjaxErrorMsg
 * 提取 Ajax 错误信息
 * @param {Object} error - Axios 生成的 error 对象
 */
export function getAjaxErrorMsg (error) {
  error = error || {}
  let errorMsg = ''
  if (error['firstErrorMessage'] && error['firstErrorMessage']['displayMessage']) {
    // 服务器提供的 error msg
    errorMsg = error['firstErrorMessage']['displayMessage']

  } else if (error.response) {
    // The request was made, but the server responded with a status code that falls out of the range of 2xx
    // http error
    errorMsg = error.response.status +' '+ error.response.statusText
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMsg = error.message
  }

  return errorMsg
}

/**
 * 沿用原vue系统ajaxErr
 * Ajax 请求失败信息处理函数
 * @param {string} label - ajax请求接口描述文案
 * @param {Object} errorObj - Axios 生成的 error 对象
 */
export function showMessageError (label='', errorObj) {
  const respErrMsg = getAjaxErrorMsg(errorObj)
  let errMsg = ''
  if (label && respErrMsg) {
    errMsg = `${label}: ${respErrMsg}`
  } else {
    errMsg = label || respErrMsg
  }
  message.error(errMsg)
}

/**
 * 成功提示
 * @param {*} successMsg 
 */
export function showMessageSuccess (successMsg) {
  message.success(successMsg)
}

/**
 * 警告提示
 * @param {*} warnMsg 
 */
export function showMessageWarn (warnMsg) {
  message.warning(warnMsg)
}

// 弹出框错误
export function showModalError(title='', errorObj) {
  Modal.error({
    title,
    content: getAjaxErrorMsg(errorObj)
  })
}