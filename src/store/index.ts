import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducer as loginReducer } from '../containers/Login/store';

const reducer = combineReducers({
  login: loginReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
