import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import { injectIntl } from 'react-intl'
import axios from 'axios'
import styles from './index.less'

const FormItem = Form.Item
const { Option } = Select

class SearchFormClass extends PureComponent {

  submitSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
      if (!err) {
        this.formData = values 
        this.handleSearch({ pageNum: 1 })
      } else {
        this.formData = null
      }
    })
  }

  handleSearch = (data = {}) => {
    const { onReaultCB, pagination } = this.props
    const { pageNum, pageSize } = pagination
    const formData = this.formData || {}
    onReaultCB && onReaultCB({ loading: true })
    
    let params = {
      pageNum,
      pageSize,
      ...formData,
      ...data
    }

    axios.get('/api/user/list', { params })
    .then(resp => {
      // console.log("resp", resp)
      const { success, model, totalRecord } = (resp && resp.data) || {}
      if (success && model) {
        onReaultCB && onReaultCB({ 
          data: model,
          pagination: {
            ...pagination,
            total: totalRecord
          }
        })
      }
    })
    .finally(()=> {
      onReaultCB && onReaultCB({ loading: false })
    })
  }


  render() {
    const { form, loading, intl } = this.props
    const { getFieldDecorator } = form
    const col = 3

    return (
      <Form className={styles.form} onSubmit={this.submitSearch}>
        <Row gutter={24}>
          <Col span={24/col}>
            <FormItem label={`${intl.formatMessage({ id: 'code' })}`}>
              {getFieldDecorator('code', {
                rules: [
                  {
                    required: true,
                    message: `${intl.formatMessage({ id: 'Code cannot be empty' })}`,
                  },
                ],
              })(<Input placeholder={`${intl.formatMessage({ id: 'Enter Code' })}`} allowClear />)}
            </FormItem>
          </Col>
          <Col span={24/col}>
            <FormItem label={`${intl.formatMessage({ id: 'type' })}`}>
            {getFieldDecorator('type', {})(
                <Select placeholder={`${intl.formatMessage({ id: 'Choose Type' })}`} allowClear>
                  <Option value="inconer">inconer</Option>
                  <Option value="outconer">outconer</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={24/col}>
            <FormItem label={''}>
              <Button type="primary" htmlType="submit" loading={loading}>Search</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

const SearchForm = Form.create()(SearchFormClass)

export default injectIntl(SearchForm)