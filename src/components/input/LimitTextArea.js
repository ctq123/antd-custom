import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import styles from './LimitTextArea.less'

const { TextArea } = Input

/***
 * 显示最大输入字符数
 * maxLength：200（默认）
 */
class LimitTextArea extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      val: ''
    }
  }

  /** form组件中，该函数会被getFieldDecorator的回调trigger覆盖 */
  handleChange = (e) => {
    const val = e.target.value
    this.setState({
      val
    })
  }

  render () {
    const { sep, maxLength, value, ...restProps } = this.props
    const max = maxLength > 0 ? maxLength : 200
    /** form组件中，value有值 */
    const arr = (value || this.state.val).split(sep)
    const len = arr.length > max ? max : arr.length
    /**截取最大字符串 */
    const val = arr.slice(0, len).join(sep)
    const n = val ? len : 0
    const suffix = `${n}/${max}`

    return (
      <div className={styles.block}>
        <TextArea 
          onChange={ e => this.handleChange(e) } 
          value={val}
          { ...restProps }
          />
        <span className={styles.counter}>{suffix}</span>
      </div>
    )
  }
}

LimitTextArea.propTypes = {
  sep: PropTypes.oneOf(['', '\n', ','])
}

LimitTextArea.defaultProps = {
  /** 分割符 */
  sep: ''
}

export default LimitTextArea