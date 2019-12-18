import React, { PureComponent } from 'react'
import { Form, Row, Col, Button, Select } from 'antd'
import { injectIntl } from 'react-intl'
import LimitInput from '@components/input/LimitInput'
import utils from '@utils'
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
    const { onResultCB, pagination } = this.props
    const { current:pageNum, pageSize } = pagination
    const formData = this.formData || {}
    onResultCB && onResultCB({ loading: true })
    
    let params = {
      pageNum,
      pageSize,
      ...formData,
      ...data
    }

    axios.get('/api/user/list', { params })
    .then(resp => {
      // console.log("resp", resp)
      const { rows, totalCount } = resp || {}
      if (rows) {
        onResultCB && onResultCB({ 
          data: rows,
          pagination: {
            current: params.pageNum,
            pageSize: params.pageSize,
            total: totalCount
          }
        })
      }
    })
    .catch(err => {
      utils.showMessageError('查询用户列表失败', err)
    })
    .finally(()=> {
      onResultCB && onResultCB({ loading: false })
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
              })(<LimitInput placeholder={`${intl.formatMessage({ id: 'Enter Code' })}`} />)}
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