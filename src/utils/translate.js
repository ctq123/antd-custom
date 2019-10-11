import React from 'react'
import { FormattedMessage } from 'react-intl'

/**
 * 国际化语言配置
 * 官网：https://github.com/formatjs/react-intl/blob/master/docs/Components.md
 * 博客：https://segmentfault.com/a/1190000005824920
 * 使用：https://www.jianshu.com/p/c57e000c2bbf
 */

export const translateText = (fmProps) => {
  return <FormattedMessage {...fmProps} />
}
