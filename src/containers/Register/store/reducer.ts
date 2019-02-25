import { CHANGE_REGISTER_STATUS } from './constants';

interface IState {
  registerStatus: string;
}

const defaultState: IState = {
  registerStatus: 'Original_RegisterStatus',
};

export default (state: IState = defaultState, action: any) => {
  switch (action.type) {
    case CHANGE_REGISTER_STATUS:
      return { ...state, registerStatus: action.registerStatus };
    default:
      return state;
  }
};
