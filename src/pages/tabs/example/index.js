import React from 'react'
import { Button } from 'antd'
import { translateText } from '@utils/translate'
import Connect from '@components/hoc/Connect'
import utils from '@utils'
import styles from './index.less'

const Example = (props) => {

  const onIncrement = (e) => {
    props.dispatch({
      type: 'example/increment',
      payload: 10,
    })
  } 

  const onIncrementAsync = (e) => {
    props.dispatch({
      type: 'example/increment/async',
      payload: {
        data: 20,
      },
    })
  }

  return (
    <aside className={styles.content}>
      <div className={styles.body}>
        <Button type='primary' onClick={onIncrement}>{ translateText({ id: 'sync +10' }) }</Button>
        <Button type='primary' onClick={onIncrementAsync} loading={props.loading}>{ translateText({ id: 'async +20' }) }</Button>
        <h4>count: { props.count }</h4>

        <p>
          { translateText({ id: 'Here is a permission related button' }) }
          {
            utils.checkAccessPermission('module.adminButton') ?
            <Button type='primary'>{ translateText({ id: 'You have super permissions' }) }</Button>
            : null
          }
        </p>
      </div>
    </aside>
  )
}

export default Connect(Example, ({ example }) => (example))