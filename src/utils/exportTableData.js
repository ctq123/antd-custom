import { outputXlsxFile } from '@utils/download-file'
import ReactDOMServer from 'react-dom/server' 
import { cloneDeep } from 'lodash'
import { message } from 'antd'

export function exportPageData(dataSource=[], columns=[], fileName='', excludeCols=['操作']) {
  try {
    if (!Array.isArray(dataSource) || !Array.isArray(columns)) {
      throw Error('数据格式不合法')
    }
    // 防止修改原数据
    let list = cloneDeep(dataSource)
    let cols = cloneDeep(columns)
    // 过滤不需要导出的列
    cols = cols.filter(item => !(excludeCols || []).includes(item.title))
    // 获取头部
    const header = getHeader(cols)
    const sheetStyle = getSheetStyle(cols)
    const content = getContent(list, cols)
    const data = [header].concat(content)
    if (header.length) {
      // console.log("data", data)
      outputXlsxFile(data, sheetStyle, fileName)
    } else {
      throw Error('数据为空！')
    }
  } catch(e) {
    message.error('导出失败！' + e)
  }
}

function getHeader(columns=[]) {
  return columns.map(item => (item.title))
}

function getContent(dataSource=[], columns=[]) {
  return dataSource.map(row => {
    let line = []
    columns.forEach(col => {
      const { dataIndex, render } = col || {}
      if (dataIndex) {
        let val = row[dataIndex]
        if (render) {
          const renderObj = render(val, row)
          if (renderObj.children) {
            val = renderObj.children
          } else {
            const reactHtml = ReactDOMServer.renderToString(renderObj)
            val = reactHtml
            .replace(/<(?:button|input)\s+value=(?:'([^']*)'|"([^"]*)")[^>]*>/g, `$1$2`)
            .replace(/<[^>]*>/g, '')
          }
        }
        // 纯数字做特殊处理，避免科学计数法和过大截取00的情况
        if (/^\d+$/.test(val)) {
          val = val + '\t'
        }
        line.push(val)
      }
    })
    return line
  })
}

function getSheetStyle(columns=[]) {
  return columns.map(item => ({ 'wch': (item.width || 200) / 10 }))
}