import React, { useState } from 'react'
import { Button, Form, Modal } from 'antd'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import LimitTextArea from '@components/input/LimitTextArea'
import utils from '@utils'
import styles from './index.less'

const FormItem = Form.Item

// 缺货率处理
const OutOfStock = (props) => {
 
  const handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        const { nos } = values
        const data = nos.replace(/\n/g, ',')
        Modal.confirm({
          title: '提醒',
          content: '你确认对以上采购单，不算入缺货率么?',
          okText: '确认',
          cancelText: '取消',
          onOk: () => { handleRequest(data) }
        })
      }
    })
  }

  const handleRequest = (values) => {
    const data = { purchaseOrderUuids: values }
    axios.post('/manager/operation_tools/oos_rate/exception_process', JSON.stringify(data))
    .then(resp => {
      utils.showMessageSuccess('操作成功！')
    })
    .catch(err => {
      utils.showModalError('操作失败', err)
    })
  }

  const { getFieldDecorator } = props.form

  return (
    <aside className={styles.content}>
      <div className={styles.header}>
        <Breadcrumb />
        <div className={styles.title}>缺货率处理</div>
      </div>
      <div className={styles.body}>
        <div className={styles.input_con}>
          <Form>
            <FormItem>
              {
                getFieldDecorator("nos", {
                  rules: [{ required: true, whitespace: true, message: '请输入采购单' }],
                })(
                <LimitTextArea 
                  autoSize={{ minRows: 18, maxRows: 25 }}
                  sep={'\n'}
                  maxLength={100}
                  placeholder="每行一个采购单" />)
              }
            </FormItem>
            <FormItem>
              <Button 
                type="primary" 
                htmlType="submit" 
                onClick={(e) => handleSubmit(e)}>
                  确认不算缺货
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className={styles.text_con}>
          <p className={styles.info}>1.每行一个采购单，每次最多100个</p>
          <p className={styles.info}>2.此功能仅针对供应商层级计算时剔除</p>
          <p className={styles.info}>3.请谨慎使用，非供应商原因导致的才能剔除</p>
        </div>
      </div>
    </aside>
  )
}

export default Form.create()(OutOfStock)