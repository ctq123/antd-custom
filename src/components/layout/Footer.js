import React, { PureComponent } from 'react'
import { Layout } from 'antd'
import styles from './Footer.less'

class Footer extends PureComponent {

  render() {
    return (
      <Layout.Footer className={styles.footer}>
        CLUB FACTORY ©2019 Created by Web Front-end Team
      </Layout.Footer>
    )
  }
}
export default Footer