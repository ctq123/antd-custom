import React, { PureComponent } from 'react'
import { Layout } from 'antd'

class Footer extends PureComponent {

  render() {
    const styles = {
      textAlign: 'center',
      padding: 0,
      paddingBottom: 24
    }
    return (
      <Layout.Footer style={styles}>
        Ant Design ©2018 Created by Ant UED
      </Layout.Footer>
    )
  }
}
export default Footer