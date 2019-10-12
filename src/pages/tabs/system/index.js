import React from 'react'
import { Button } from 'antd'
import { translateText } from '@utils/translate'
import { checkAccessPermission } from '@utils/permission'

const System = () => {
  return (
    <aside>
      <h3>System page</h3>
      <p>
        { translateText({ id: 'Here is a permission related button' }) }
        {
          checkAccessPermission('module.adminButton') ?
          <Button type='primary'>{ translateText({ id: 'You have super permissions' }) }</Button>
          : null
        }
      </p>
    </aside>
  )
}

export default System