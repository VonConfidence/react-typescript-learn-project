import { Button } from 'antd';
import * as React from 'react';
import Logo from './../../components/Logo';

export interface IProps {
  registerStatus: string;
  changeRegisterStatus: () => void;
}

export default class Register extends React.Component<IProps, {}> {
  public handleRegisterStatus = (event: React.MouseEvent) => {
    console.log(this.props);
    const { changeRegisterStatus } = this.props;
    changeRegisterStatus();
  };

  public render() {
    const { registerStatus } = this.props;
    return (
      <div>
        <Logo />
        <h2>登录页面</h2>
        <Button type="primary" onClick={this.handleRegisterStatus}>
          登录状态{registerStatus}
        </Button>
      </div>
    );
  }
}
