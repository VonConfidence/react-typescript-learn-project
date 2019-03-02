import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthRoute from './components/AuthRoute/authroute';
import DashBoard from './components/DashBoard/dashboard';
import AdminInfoPage from './containers/AdminInfo/admininfo';
import Login from './containers/Login';
import Register from './containers/Register';
import Test from './containers/Test/';
import UserInfoPage from './containers/UserInfo/userinfo';

import store from './store';

import './App.css';
import './config';

// const AdminPage: React.SFC<{}> = (props: any) => <div>AdminPage</div>;

// admin user me msg 四个页面
class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AuthRoute />
            <Route path="/" exact={true} component={Login} />
            {/* <Route path="/admin" component={AdminPage} /> */}
            <Route path="/admininfo" component={AdminInfoPage} />
            <Route path="/userinfo" component={UserInfoPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/test" component={Test} />
            <Route component={DashBoard} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
