import Axios from 'axios';
import { Dispatch } from 'redux';
import { IRegisterForm } from './user.redux';

const USER_LIST = 'USER_LIST';

interface IState {
  userList: IRegisterForm[];
}

const initState = {
  userList: [],
};

export function chatUser(state: IState = initState, action: any) {
  switch (action.type) {
    case USER_LIST: {
      return { ...state, userList: action.payload };
    }
    default: {
      return state;
    }
  }
}

function userList(data: IRegisterForm[]) {
  return { type: USER_LIST, payload: data };
}

export function getUserList(type: string) {
  return async (dispatch: Dispatch) => {
    const res = await Axios.get(`/users/list?type=${type}`);
    if (res.status === 200 && res.data.statusCode === 0) {
      dispatch(userList(res.data.data.users));
    }
  };
}
