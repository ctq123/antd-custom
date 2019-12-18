import React, { PureComponent } from 'react'
import { Button } from 'antd'
import { injectIntl } from 'react-intl'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import utils from '@utils'
import TableBlock from '@components/table/TableBlock'
import SearchForm from './SearchForm'
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
        current: 1,
        pageSize: 10,
        total: 0,
      },
    }
  }

  componentDidMount() {
    this.callFormSearch()
  }

  handleSearch = ({ current, pageSize }) => {
    const { pagination } = this.state
    this.setState({
      pagination: {
        ...pagination,
        current,
        pageSize,
      }
    }, () => { this.callFormSearch() })
  }

  callFormSearch = (data = {}) => {
    this.form && this.form.handleSearch(data)
  }

  handleReaultCB = ({ loading, data, pagination }) => {
    if (loading !== undefined) {
      this.setState({ loading })
    }
    if (data !== undefined) {
      this.setState({ data, pagination })
    }
  }

  handleLoadingCB = (loading) => {
    this.setState({ loading })
  }

  exportData = (e) => {
    const { data, columns } = this.state
    utils.exportPageData(data, columns, '用户管理')
  }


  render() {
    const { data, columns, loading, pagination } = this.state
    const formProps = {
      loading,
      pagination,
      onResultCB: this.handleReaultCB,
    }

    const tableBlockProps = {
      tableProps: {
        dataSource: data,
        columns,
        loading,
      },
      paginationProps: pagination,
      searchCB: this.handleSearch,
      leftTopNode: <Button type="primary" onClick={(e) => exportData(e)}>导出当前页</Button>
    }

    return (
      <aside className={styles.content}>
        <div className={styles.body}>
          <div className={styles.bread}>
            <Breadcrumb />
          </div>
          <SearchForm wrappedComponentRef={(form) => this.form = form} { ...formProps } />
          <hr />
          <TableBlock { ...tableBlockProps } />
        </div>
      </aside>
    )
  }
}

export default injectIntl(User)