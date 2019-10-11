import React, { PureComponent } from 'react'
import { IntlProvider } from 'react-intl'
import { ConfigProvider } from 'antd'
import { connect } from 'react-redux'
// antd组件语言
import antd_en_US from 'antd/es/locale/en_US'
import antd_zh_CN from 'antd/es/locale/zh_CN'
// react-intel本地语言及其polyfill
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/dist/locale-data/en'
import '@formatjs/intl-relativetimeformat/dist/locale-data/zh'

// 业务自定义语言
import en_US from '@locales/en_US'
import zh_CN from '@locales/zh_CN'

// antd中的时间控件
import moment from 'moment'
import 'moment/locale/zh-cn'

const antdLocale = {
  'zh-CN': antd_zh_CN,
  'en-US': antd_en_US,
}

const messages = {
  'zh-CN': zh_CN,
  'en-US': en_US,
}
/**
 * 国际化语言配置
 * 官网：https://github.com/formatjs/react-intl/blob/master/docs/Components.md
 * 博客：https://segmentfault.com/a/1190000005824920
 */
class ReactIntlProvider extends PureComponent {

  render() {
    // console.log("ReactIntlProvider")
    const { language } = this.props
    const lang = language ? language.split('-')[0] : 'zh'
    moment.locale(lang)
    return (
      <IntlProvider locale={language} key={language} messages={messages[language]}>
        <ConfigProvider locale={antdLocale[language]}>
          { this.props.children }
        </ConfigProvider>
      </IntlProvider>
    )
  }
}

const mapStateToProp = (state) => {
  const { app } = state
  return app
}

export default connect(mapStateToProp, null)(ReactIntlProvider)
