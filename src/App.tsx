import './assets/scss/App.scss';

import * as React from 'react';
import store from './store';
import history from './utils/history';
import { changeLoginState } from './actions/loginAction'
import requestConfig from './utils/axiosRequestConfig'
import utils from './utils/utils'
import { Button } from 'antd';
import TopModel from './component/TopModel'

import logo from './assets/image/logo.svg';

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.loginOutMethod = this.loginOutMethod.bind(this);
  }

  loginOutMethod() {
    const loginOutConfig = requestConfig.loginOutConfig;
    const config = {
      param: { t: new Date().getTime() },
      callback: (response: any) => {
        if (response.data.code == 0) {
          let unsubscribe = store.subscribe(() =>
            console.log(store.getState())
          );
          store.dispatch(changeLoginState());
          unsubscribe();
          history.push('/');
        }
      }
    }
    const finalConfig = { ...loginOutConfig, ...config };
    utils.axiosMethod(finalConfig);
  }

  render() {
    const classStr: string = `h1_class h2_class`;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h2 className={classStr}>React测试！！</h2>
        <Button onClick={this.loginOutMethod}>退出登录</Button>
        <TopModel />
      </div>
    );
  }
}

export default App;
