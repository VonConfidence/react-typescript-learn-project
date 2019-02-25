import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthRoute from './components/AuthRoute/authroute';
import Login from './containers/Login';
import Register from './containers/Register';
import Test from './containers/Test/';
import store from './store';

import './App.css';
import './config';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AuthRoute />
            <Route path="/" exact={true} component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/test" component={Test} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
