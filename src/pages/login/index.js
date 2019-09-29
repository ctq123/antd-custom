import React, { PureComponent } from 'react'
import { Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import './styles.css'

const FormItem = Form.Item
class LoginForm extends PureComponent {
  constructor(props) {
    super(props)
    console.log("props",props)
    this.state = {
      loginStatus: props.loginStatus
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loginStatus !== prevState.loginStatus) {
      return {
        loginStatus: nextProps.loginStatus,
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loginStatus) {
      this.goToPage('/app')
    }
  }

  goToPage = (path) => {
    const { history } = this.props
    history && path && history.push(path)
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type: 'login',
          payload: {
            ...values
          },
        })
      }
    });
  }
  
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <Form className='login-form' onSubmit={this.handleSubmit}>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
              initialValue: 'guest',
            })(
              <Input placeholder="Username" />,
            )}
          </FormItem>
          <FormItem hasFeedback>
          {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue: 'guest',
            })(
              <Input type="password" placeholder="Password" />,
            )}
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' loading={this.props.loading}>确定</Button>
            <p>
              <span>Username：guest</span>
              <span className='span-right'>Password：guest</span>
            </p>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const Login = Form.create()(LoginForm)

const mapStateToProp = state => {
  // 对应index.model.js中的name
  const { login } = state
  return login
}

const mapDispatchToProp = (dispatch) => {
  return { dispatch }
}

export default connect(mapStateToProp, mapDispatchToProp)(Login)
