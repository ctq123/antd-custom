import React, { useState } from 'react'
import { Button, Form, Icon } from 'antd'
import LimitTextArea from '@components/input/LimitTextArea'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import styles from './index.less'

const FormItem = Form.Item
const MAX = 1000

const ExchangeForm = (props) => {

  const handleExchange = (e) => {
    const { getFieldsValue, setFieldsValue } = props.form
    const { initData } = getFieldsValue()
    const data = []
    const res = (initData || '').split('\n')
                  .filter(item => item && item.trim() !== '')
                  .map(item => {
                    const arr = item.split('\t')
                    const row = arr && arr.length > 1 ? `"${arr[0]}": "${arr[1]}"` : `"${item}"`
                    data.push(row)
                  })
    setFieldsValue({'outData': data.length ? data.join(',\n') : '' })
  }
  
  const { getFieldDecorator, setFieldsValue } = props.form

  return (
    <aside className={styles.content}>
      <div className={styles.header}>
        <Breadcrumb />
        <div className={styles.title}>数据格式转换</div>
      </div>
      <div className={styles.body}>
        <div className={styles.tbody}>
          <h3>处理Excel翻译数据</h3>
          <hr />
          <Form className='form'>
            <FormItem>
              <div className={styles.flex}>
                <div className={styles.mleft}>
                  <div className={styles.space_between}>
                    <span>原始数据</span>
                    <span 
                      className={`${styles.btn_clear} pointer`} 
                      onClick={(e) => setFieldsValue({ initData: '' })}>
                      清空
                    </span>
                  </div>
                  <FormItem>
                    {getFieldDecorator('initData', {
                      rules: [{ required: false, whitespace: true }],
                      initialValue: '',
                    })(<LimitTextArea
                      rows={25}
                      sep={'\n'}
                      maxLength={MAX}
                      placeholder={ `一行一条数据，例：\n装入用户	Pack User\n装入时间	Pack Time` } />)}
                  </FormItem>
                </div>

                <div className={`${styles.mmiddle} ${styles.flexcol}`}>
                  <Button 
                    type="primary" 
                    onClick={handleExchange}>
                    转换 <Icon type="double-right" />
                  </Button>
                </div>

                <div className={styles.mright}>
                  <div className={styles.space_between}>
                    <span>转换结果</span>
                    <span 
                      className={`${styles.btn_clear} pointer`} 
                      onClick={(e) => setFieldsValue({ outData: '' })}>
                      清空
                    </span>
                  </div>
                  <FormItem>
                    {getFieldDecorator('outData', {
                      rules: [{ required: false, whitespace: true }],
                      initialValue: '',
                    })
                    (<LimitTextArea
                      rows={25}
                      sep={'\n'}
                      maxLength={MAX}
                      placeholder={`转换结果为：\n"装入用户": "Pack User",\n"装入时间": "Pack Time"`} />)}
                  </FormItem>
                </div>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </aside>
  )
}

export default Form.create()(ExchangeForm)