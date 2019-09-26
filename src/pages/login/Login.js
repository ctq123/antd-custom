import React, { PureComponent } from 'react'
import { Form, Input, Button } from 'antd'
import './Login.css'

const FormItem = Form.Item
class LoginForm extends PureComponent {
  constructor(props) {
    super(props)
    console.log("props",props)
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, history } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { username, password } = values
        if (username === 'guest' && password === 'guest') {
          history.push('/app')
        }
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
            <Button type='primary' htmlType='submit'>确定</Button>
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

export default Login
