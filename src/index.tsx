import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import store from './store'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { Router,Route } from 'react-router-dom';
import history from './utils/history';
import requestConfig from './utils/axiosRequestConfig'
import utils from './utils/utils'

import './assets/scss/Index.scss';


class Model extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const loginStateConfig=requestConfig.loginStateConfig;
    const config={
      param:{t: new Date().getTime()},
      callback:(response:any)=>{
        if(response.data.code==0){
          history.push('/home');
        }else{
          history.push('/');
        }
      }
    }
    const finalConfig={...loginStateConfig,...config};
    utils.axiosMethod(finalConfig);
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <Route exact={true} path="/" component={Login} />
        <Route exact={true} path="/home" component={App} />
      </div>
    )
  }
}

ReactDOM.render(
  // <Router>
  <Provider store={store}>
    <Router history={history}>
      <Model />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
