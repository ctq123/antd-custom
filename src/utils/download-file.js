import { message } from 'antd'
import XLSX from 'xlsx'

/**
 * 模拟点击a标签，访问url下载文件
 * @param {string} url - 文件下载地址
 * @param {string} filename - 待下载的文件名称
 */
export function downloadFileByUrl(url, filename) {
  let a = document.createElement("A")
  // rel属性旨在修复部分windows chrome69平台下，页面会跳转到下载地址的问题
  a.setAttribute('rel', 'noreferrer')
  a.href = url
  a.download = filename
  a.click()
}

/**
 * get请求获取返回字节流，下载文件
 * @param {string} url - 文件下载地址请求地址
 * @param {Object} params - 请求参数
 */
export function downloadFile(url, params, msg) {
  axios({
    method: 'get',
    url: url,
    params: params,
    timeout: 60000,
    responseType: 'blob'
  })
  .then(response => {
    if (response.status !== 200) return

    let blob = new Blob([response.data]);
    let disposition = response.headers['content-disposition']
    let [,filename, excelBoolean] = disposition.split(';')
    // let [,flag] = excelBoolean.split('=')
    // 转译以URL形式编码的文件名
    filename = decodeURI(filename.split('=')[1])
    let a = document.createElement("A")
    a.href = window.URL.createObjectURL(blob)
    a.download = filename
    a.click()
  })
  .catch(error => {
    message.error(`${msg}-${error}`)
  })
}

/**
 * 导出数据报表xlsx文件
 * 已注入所有Vue实例，
 * template模板里调用 $$outputXlsxFile
 * 组件方法里调用 this.$outputXlsxFile
 * 例：this.$outputXlsxFile([['字段1', '字段2'], [1, 2]], [{wch: 10}, {wch: 50}], '测试导出') 得到 测试导出.xlsx 文件
 * 第一个参数是导出的数组对象，第二个参数是设置字段宽度，第三个参数是文件名
 */
export const outputXlsxFile = (data, wscols, xlsxName) => {
  try {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data)
    ws['!cols'] = wscols
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, xlsxName)
    /* generate file and send to client */
    XLSX.writeFile(wb, xlsxName + ".xlsx")
  } catch(e) {
    throw e
  }
}
