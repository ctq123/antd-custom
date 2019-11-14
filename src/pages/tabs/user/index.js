import React, { PureComponent } from 'react'
import { Table, Pagination, Button } from 'antd'
import { injectIntl } from 'react-intl'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import { exportPageData } from '@utils/exportTableData'
import SearchForm from './searchForm'
import styles from './index.less'

class User extends PureComponent {
  constructor(props) {
    super(props)
    const { intl } = props
    this.state = {
      columns: [
        {
          title: `${intl.formatMessage({ id: 'createTime' })}`,
          dataIndex: 'createTime',
          width: 200,
          sorter: (a, b) => a.createTime - b.createTime,
          render(text) {
            return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''
          }
        },
        {
          title: `${intl.formatMessage({ id: 'name' })}`,
          dataIndex: 'name',
          width: 100,
          render: (text) => text ? text : 0
        },
        {
          title: `${intl.formatMessage({ id: 'type' })}`,
          dataIndex: 'type',
          width: 100,
        },
        {
          title: `${intl.formatMessage({ id: 'code' })}`,
          dataIndex: 'supplierUuid',
          width: 100,
        },
        {
          title: `${intl.formatMessage({ id: 'action' })}`,
          dataIndex: 'action',
          render: () => <a onClick={() => {}}>Delete</a>,
        },
      ],
      data: [],
      loading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    }
  }

  componentDidMount() {
    this.callFormSearch()
  }

  onShowSizeChange = (cur_page, page_size) => {
    // console.log(cur_page, page_size)
    const { pagination } = this.state
    this.setState({
      pagination: {
        ...pagination,
        pageNum: 1,
        pageSize: page_size
      }
    }, () => { this.callFormSearch() })
  }

  onChange = (page) => {
    // console.log(page)
    const { pagination } = this.state
    this.setState({
      pagination: {
        ...pagination,
        pageNum: page,
      }
    }, () => { this.callFormSearch() })
  }

  callFormSearch = (data = {}) => {
    this.form && this.form.handleSearch(data)
  }

  handleReaultCB = (resp = {}) => {
    this.setState({
      ...resp
    })
  }

  handleLoadingCB = (loading) => {
    this.setState({ loading })
  }

  exportData = (e) => {
    const { data, columns } = this.state
    exportPageData(data, columns, '用户管理')
  }


  render() {
    const { data, columns, loading, pagination } = this.state
    const { intl } = this.props
    const formProps = {
      loading,
      pagination,
      onReaultCB: this.handleReaultCB,
      onLoadingCB: this.handleLoadingCB
    }

    return (
      <aside className={styles.content}>
        <div className={styles.body}>
          <div className={styles.bread}>
            <Breadcrumb />
          </div>
          <SearchForm wrappedComponentRef={(form) => this.form = form} { ...formProps } />
          <hr />
          <div className={styles.flex}>
            <Button type="primary" onClick={(e) => this.exportData(e)}>导出当前页</Button>
            <Pagination 
              className='pagination-right'
              showSizeChanger
              showTotal={total => `${intl.formatMessage({id: 'total items'}, { value: total })}`}
              current={pagination.pageNum} 
              total={pagination.total} 
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onChange} />
          </div>
          <Table bordered pagination={false} columns={columns} dataSource={data} rowKey='id' loading={loading} />
        </div>
      </aside>
    )
  }
}

export default injectIntl(User)