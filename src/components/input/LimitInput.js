import React, { PureComponent } from 'react'
import { Input } from 'antd'

/***
 * 显示最大输入字符数
 * maxLength：50（默认）
 */
class LimitInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      val: ''
    }
  }

  componentDidMount() {
    const { suffix } = this.props
    if (suffix) {
      console.warn('LimitInput：用户自定义suffix属性将优先使用，显示最大输入字符数将失效!')
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
    const { suffix, maxLength, value, ...restProps } = this.props
    /** form组件中，value有值 */
    const val = value || this.state.val
    const max = maxLength > 0 ? maxLength : 50
    const len = val.length > max ? max : val.length

    return suffix ? 
    <Input { ...this.props } />
    :
    <Input 
      onChange={ e => this.handleChange(e) } 
      suffix={`${len}/${max}`}
      maxLength={max}
      value={val}
      { ...restProps }
      />
  }
}

export default LimitInput