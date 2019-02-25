import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducer as registerReducer } from '../containers/Register/store';

const reducer = combineReducers({
  register: registerReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
