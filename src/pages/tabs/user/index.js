import React, { PureComponent } from 'react'
import { Table, Pagination } from 'antd'
import moment from 'moment'
import axios from 'axios'
import { injectIntl } from 'react-intl'

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
          title: `${intl.formatMessage({ id: 'amount' })}`,
          dataIndex: 'spNum',
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
          render: () => <a>Delete</a>,
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
    this.getUserList()
  }

  getUserList() {
    const { pagination } = this.state
    this.setState({
      loading: true
    })
    let data = {
      ...pagination
    }

    axios({
      method: 'get',
      url: '/api/user/list',
      params: data
    })
    .then(resp => {
      // console.log("resp", resp)
      const { success, model, totalRecord } = (resp && resp.data) || {}
      if (success && model) {
        this.setState({
          data: model,
          pagination: {
            ...pagination,
            total: totalRecord
          }
        })
      }
    })
    .finally(()=> {
      this.setState({
        loading: false
      })
    })
  }

  onShowSizeChange = (cur_page, page_size) => {
    // console.log(cur_page, page_size)
    const { pagination } = this.state
    this.setState({
      pagination: {
        ...pagination,
        pageNum: cur_page,
        pageSize: page_size
      }
    })
  }

  onChange = (page) => {
    // console.log(page)
    const { pagination } = this.state
    this.setState({
      pagination: {
        ...pagination,
        pageNum: page,
      }
    })
  }


  render() {
    const { data, columns, loading, pagination } = this.state
    const { intl } = this.props

    return (
      <aside>
        <Table bordered pagination={false} columns={columns} dataSource={data} rowKey='id' loading={loading} />
        <Pagination 
          className='pagination-right'
          showSizeChanger
          showTotal={total => `${intl.formatMessage({id: 'total items'}, { value: total })}`}
          current={pagination.pageNum} 
          total={pagination.total} 
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onChange} />
      </aside>
    )
  }
}

export default injectIntl(User)