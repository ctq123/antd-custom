import React from 'react'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import styles from './index.less'

const Role = () => {
  return (
      <aside className={styles.content}>
        <div className={styles.body}>
          <div className={styles.bread}>
            <Breadcrumb />
          </div>
          Role Page
        </div>
    </aside>
  )
}

export default Role