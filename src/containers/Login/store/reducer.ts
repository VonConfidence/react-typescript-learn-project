import { CHANGE_LOGIN_STATUS } from './constants';

interface IState {
  loginStatus: string;
}

const defaultState: IState = {
  loginStatus: 'Original_LoginStatus',
};

export default (state: IState = defaultState, action: any) => {
  switch (action.type) {
    case CHANGE_LOGIN_STATUS:
      return { ...state, loginStatus: action.loginStatus };
    default:
      return state;
  }
};
