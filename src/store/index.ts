import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducer as registerReducer } from '../containers/Register/store';
import { chat as chatMsg } from './chat.redux';
import { chatUser as chat } from './chatuser.redux';
import { userReducer as user } from './user.redux';

export interface IRootState {
  chatUser: any;
  register: any;
  user: any;
  chatMsg: any;
}

const reducer = combineReducers({
  // 供 test 页面使用的 registerReducer
  chat,
  chatMsg,
  register: registerReducer,
  user,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
