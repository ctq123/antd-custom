import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Pagination, Table } from 'antd'
import styles from './TableBlock.less'

/**
 * 对table组件和分页进行封装
 */
class TableBlock extends PureComponent {

  state = {
    /**table默认值，与原生API属性字段保持一致 */
    tableDefaultProps: {
      /**table数据 */
      dataSource: [],
      /**table头 */
      columns: [],
      /**table每行key值，默认为id */
      rowKey: 'id',
      /**table加载状态 */
      loading: false,
    },
    /**pagination默认值，与原生API属性字段保持一致 */
    paginationDefaultProps: {
      /**分页总条数 */
      total: 0,
      /**分页页码 */
      current: 1,
      /**分页每页页数 */
      pageSize: 10,
    },
  }

  onShowSizeChange = (cur_page, page_size) => {
    const { searchCB } = this.props
    searchCB({ 
      current: 1,
      pageSize: page_size 
    })
  }

  onPageChange = (page) => {
    const { searchCB, paginationProps } = this.props
    const { pageSize } = paginationProps
    searchCB({ 
      current: page,
      pageSize,
    })
  }

  render() {
    const { tableDefaultProps, paginationDefaultProps } = this.state
    const { tableProps, paginationProps, showTopBlock, leftTopNode, 
      showBottomBlock, leftBottomNode } = this.props
    const newTableProps = { ...tableDefaultProps, ...tableProps }
    const newPaginationProps = { ...paginationDefaultProps, ...paginationProps }
    
    return (
      <Fragment>
        {
          showTopBlock ?
          <div className={styles.between}>
            <div>{ leftTopNode }</div>
            <Pagination 
              showSizeChanger
              showTotal={total => `共 ${total} 条`} 
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              { ...paginationProps } />
          </div> : null
        }
        <Table bordered pagination={false} { ...newTableProps } />
        {
          showBottomBlock ?
          <div className={styles.between}>
            <div>{ leftBottomNode }</div>
            <Pagination 
              showSizeChanger
              showTotal={total => `共 ${total} 条`}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              { ...newPaginationProps } />
          </div> : null
        }
      </Fragment>
    )
  }
}

TableBlock.propTypes = {
  tableProps: PropTypes.object.isRequired,
  paginationProps: PropTypes.object.isRequired,
  searchCB: PropTypes.func.isRequired,
}

TableBlock.defaultProps = {
  /**table原生属性 */
  tableProps: {},
  /**分页原生属性 */
  paginationProps: {},
  /**分页查询回调 */
  searchCB: () => {},
  /**是否显示上分页区域 */
  showTopBlock: true,
  /**上分页-左上侧显示内容 */
  leftTopNode: null,
  /**是否显示下分页区域 */
  showBottomBlock: false,
  /**下分页-左下侧显示内容 */
  leftBottomNode: null,
}

export default TableBlock

