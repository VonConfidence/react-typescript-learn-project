import axios from 'axios';
import { Dispatch } from 'redux';
import { CHANGE_LOGIN_STATUS } from './constants';

const changeList = (loginStatus: string) => ({
  loginStatus,
  type: CHANGE_LOGIN_STATUS,
});

export const changeLoginStatusAction = () => (dispatch: Dispatch<any>) =>
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
    dispatch(changeList('CHANGE_LOGIN_STATUS_FETCH'));
  });
