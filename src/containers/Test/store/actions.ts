import axios from 'axios';
import { Dispatch } from 'redux';
import { CHANGE_REGISTER_STATUS } from './constants';

const changeList = (registerStatus: string) => ({
  registerStatus,
  type: CHANGE_REGISTER_STATUS,
});

export const changeRegisterActions = () => (dispatch: Dispatch<any>) =>
  axios.get('/fetchNews').then(response => {
    const {
      data: {
        data: {
          result: { data: list },
        },
      },
    } = response;
    console.log(list);
    // 需要将list新闻数据保存在redux中, reducer会接收到这个type_Action
    dispatch(changeList('LOADING_CHANGE_REGISTER_STATUS_FETCH'));
  });
