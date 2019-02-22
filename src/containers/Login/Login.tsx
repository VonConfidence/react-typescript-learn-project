import * as React from 'react';
import Logo from './../../components/Logo';

export interface IProps {
  loginStatus: string;
  changeLoginStatus: () => void;
}

export default class Login extends React.Component<IProps, {}> {
  public handleLoginStatus = () => {
    const { changeLoginStatus } = this.props;
    changeLoginStatus();
  };

  public render() {
    const { loginStatus } = this.props;
    return (
      <div>
        <Logo />
        <h2>登录页面</h2>
        <p onClick={this.handleLoginStatus}>登录状态{loginStatus}</p>
      </div>
    );
  }
}
