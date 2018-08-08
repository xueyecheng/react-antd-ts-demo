import * as React from 'react';
import './assets/scss/Login.scss';
import store from './store'
import { changeLoginState } from './actions/loginAction'
import utils from './utils/utils'
import requestConfig from './utils/axiosRequestConfig'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import history from './utils/history';


const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loginForm: {
        username: '',
        password: ''
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleInputChange(event: any): void {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const tempObj = { ...this.state['loginForm'] };
    tempObj[name] = value;
    this.setState({
      loginForm: tempObj
    })
  }

  submitForm(e: any) {
    e.preventDefault();
    this.props['form'].validateFields((err: any, values: any) => {
      if (!err) {
        let doLoginConfig = requestConfig.doLoginConfig;
        let config = {
          data: { t: new Date().getTime(), ...this.state['loginForm'] },
          callback: (response: any) => {
            if (response.data.code == 0) {
              let unsubscribe = store.subscribe(() =>
                console.log(store.getState())
              );
              store.dispatch(changeLoginState());
              unsubscribe();
              history.push('/home?userId='+response.data.code);
            }
          }
        }
        let finalConfig = { ...doLoginConfig, ...config };
        utils.axiosMethod(finalConfig);
      }
    });
  }

  render(): any {
    const { getFieldDecorator } = this.props['form'];
    return (
      <Form onSubmit={this.submitForm} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名', whitespace: true }],
          })(
            <Input name='username' onChange={this.handleInputChange} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码', whitespace: true }],
          })(
            <Input name='password' onChange={this.handleInputChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox style={{ color: 'white' }}>记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <a href="">前往注册</a>
        </FormItem>
      </Form>
    );
  }
}

const LoginFormComponent = Form.create()(LoginForm);

class Login extends React.Component {
  render() {
    return (
      <div className="loginMain">
        <div className="login">
          <h2 style={{ color: 'white', textAlign: 'center' }}>用户登录</h2>
          <LoginFormComponent />
        </div>
      </div>
    );
  }
}

export default Login;
