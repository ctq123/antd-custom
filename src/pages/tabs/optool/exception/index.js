import React from 'react'
import { translateText } from '@utils/translate'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import styles from './index.less'

// 异常处理
const ExceptionHandle = (props) => {

  const handleRedirect = (type) => {
    const { history } = props
    if (history) {
      switch(type) {
        case 'outstock':
          history.push('/app/optool/exceptionHandle/outstock')
          break
        case 'sign':
          history.push('/app/optool/exceptionHandle/sign')
          break
        default:
          break
      }
    }
  }

  return (
    <aside className={styles.content}>
      <div className={styles.header}>
        <Breadcrumb />
        <div className={styles.title}>异常处理</div>
      </div>
      <div className={styles.body}>
        <div className={`${styles.card} pointer`} onClick={() => handleRedirect('outstock')}>缺货率处理</div>
        <div className={`${styles.card} pointer`} onClick={() => handleRedirect('sign')}>签收率处理</div>
      </div>
    </aside>
  )
}

export default ExceptionHandle