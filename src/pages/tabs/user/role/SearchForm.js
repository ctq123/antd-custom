import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'antd'
import utils from '@utils'
import LimitInput from '@components/input/LimitInput'

const FormItem = Form.Item

const SearchForm = (props) => {

  const [ formData, setFormData ] = useState({})

  useEffect(() => {
    handleSearch()
  }, [ props.searchFlag ])

  const submitSearch = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
      if (!err) {
        setFormData(values)
        handleSearch({ pageNum: 1, ...values })
      } else {
        setFormData({})
      }
    })
  }

  const handleSearch = (data = {}) => {
    const { current: pageNum, pageSize, onResultCB } = props
    
    let params = {
      pageNum,
      pageSize,
      ...formData,
      ...data
    }

    onResultCB && onResultCB({ loading: true })

    axios.get('/api/role/list', { params })
    .then(resp => {
      // console.log("resp", resp)
      const { rows, totalCount } = resp || {}
      if (rows) {
        onResultCB && onResultCB({ 
          list: rows,
          total: totalCount,
          current: params.pageNum,
        })
      }
    })
    .catch(err => {
      utils.showMessageError('查询权限列表失败', err)
    })
    .finally(()=> {
      onResultCB && onResultCB({ loading: false })
    })
  }

  const { form, loading } = props
  const { getFieldDecorator } = form

  return (
    <Form className='form' onSubmit={submitSearch}>
      <Row gutter={24}>
        <Col span={8}>
          <FormItem label={`名称`}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: `名称不能为空`,
                  whitespace: true,
                },
              ],
            })(<LimitInput placeholder={'请输入名称'} />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={''}>
            <Button type="primary" htmlType="submit" loading={loading}>Search</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(SearchForm)