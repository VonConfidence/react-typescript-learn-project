import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './containers/Login/index';
import Register from './containers/Register/Register';
import store from './store';

import './App.css';
import './config';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/" exact={true} component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
