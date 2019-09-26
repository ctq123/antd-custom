import React, { PureComponent } from 'react'
import { Layout } from 'antd'
import styles from './Footer.less'

class Footer extends PureComponent {

  render() {
    return (
      <Layout.Footer className={styles.footer}>
        Ant Design ©2018 Created by Ant UED
      </Layout.Footer>
    )
  }
}
export default Footer