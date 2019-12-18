import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { VirtualTable } from 'ant-virtual-table'
import styles from './index.less'

const Virtual = () => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 100 })

  useEffect(() => {
    setLoading(true)
    // 模拟请求数据，实际中大数据是不可能一次性请求回来的，可采用分批请求
    const timeId = setTimeout(function() {
      setDataSource(generateData(1000000))
      setLoading(false)
    }, 300)
    return () => { clearTimeout(timeId) }
  }, [])

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      fixed: 'left',
      width: 100
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 100
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 100,
      render: (text) => {
        return text === 'male' ? '男' : '女'
      }
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    }
  ]

  const generateData = (count) => {
    const res = []
    const names = ['Tom', 'Marry', 'Jack', 'Lorry', 'Tanken', 'Salla']
    const sexs = ['male', 'female']
    for (let i = 0; i < count; i++) {
      let obj = {
        id: i,
        name: names[i % names.length] + i,
        sex: sexs[i % sexs.length],
        age: 15 + Math.round(10 * Math.random()),
        address: '浙江省杭州市西湖区华星时代广场2号楼'
      }
      res.push(obj)
    }
    return res
  }

  const onPageChange = (pageNum) => {
    setPagination((pre) => ({ ...pre, pageNum }))
  }

  const onShowSizeChange = (pageNum, pageSize) => {
    setPagination((pre) => ({ ...pre, pageNum: 1, pageSize }))
  }

  return (
    <aside className={styles.content}>
      <div className={styles.body}>
        <div className={styles.block}>
          <div className={styles.blick_item}>
            <div className={styles.title}>虚拟表格（展示大数据，暂不支持复杂表格结构，
              <a href="https://github.com/ctq123/ant-virtual-table">更多详情</a>）</div>
            <hr />
            <div className={styles.circles}>
              <VirtualTable
                columns={columns}
                dataSource={dataSource}
                rowKey='id'
                pagination={ false }
                scroll={{ y: 400 }}
                loading={loading}
                bordered
              />
              <Pagination
                size='small'
                total={dataSource.length}
                current={pagination.pageNum}
                pageSize={pagination.pageSize}
                showSizeChanger
                pageSizeOptions={['100', '500', '1000', '10000']}
                onShowSizeChange={onShowSizeChange}
                onChange={onPageChange}
                showTotal={() => `共 ${dataSource.length} 条`}
                className="pagination-right"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Virtual