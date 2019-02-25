import axios from 'axios';
import * as React from 'react';

export default class AuthRoute extends React.Component<{}, {}> {
  public componentDidMount() {
    // 获取用户信息: 是否登录
    // 现在的url地址 是否需要用户登录
    // 用户身份判断: 管理员和客户的跳转是不一样的
    // 用户是否完善个人信息
    axios.get('/users/info').then(res => {
      console.log(res);
    });
  }

  public render() {
    return null;
  }
}
