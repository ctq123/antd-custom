import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import TableBlock from '@components/table/TableBlock'
import SearchForm from './SearchForm'
import styles from './index.less'

const Role = () => {

  const [ list, setList ] = useState([])
  const [ loading, setLoading ] = useState(false)
  /**查询信号searchFlag，只要发生变化就会发起查询 */
  const [ pagination, setPagination ] = useState({ searchFlag: false, current: 1, pageSize: 10, total: 0 })

  const columns = [
    {
      title: `角色名称`,
      dataIndex: 'name',
      width: 100,
      render: (text) => text ? text : 0
    },
    {
      title: `权限列表`,
      dataIndex: 'perms',
      width: 200,
    },
    {
      title: `创建人`,
      dataIndex: 'creator',
      width: 100,
    },
    {
      title: `创建时间`,
      dataIndex: 'createTime',
      width: 200,
      render(text) {
        return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''
      }
    },
    {
      title: `操作`,
      dataIndex: 'action',
      render: () => <a onClick={() => {}}>Delete</a>,
    },
  ]


  const handleResultCB = ({ loading, list, total, current }) => {
    if (loading !== undefined) setLoading(loading)
    if (list !== undefined) setList(list)
    if (total !== undefined) setPagination((data) => ({ ...data, total, current }))
  }

  const handleSearch = ({ current, pageSize }) => {
    setPagination(data => ({ ...data, current, pageSize, searchFlag: !data.searchFlag }))
  }

  const handleAdd = (e) => {
    console.log('click add')
  }

  const searchProps = {
    loading,
    onResultCB: handleResultCB,
    ...pagination,
  }

  const tableBlockProps = {
    tableProps: {
      dataSource: list,
      columns,
      loading,
    },
    paginationProps: pagination,
    searchCB: handleSearch,
    showBottomBlock: true,
    leftTopNode: <Button type="primary" onClick={(e) => handleAdd(e)}>新增</Button>
  }

  return (
      <aside className={styles.content}>
        <div className={styles.body}>
          <div className={styles.bread}>
            <Breadcrumb />
          </div>
          <SearchForm { ...searchProps } />
          <hr />
          <TableBlock { ...tableBlockProps } />
        </div>
    </aside>
  )
}

export default Role