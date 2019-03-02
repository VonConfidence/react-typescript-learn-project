import { Button, Checkbox, Form, Icon, Input, Radio } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { IRootState } from '../../store/index';
import { ILoginForm, IStoreState, login } from '../../store/user.redux';

import './login.less';
interface IProps {
  form: any;
  user: IStoreState;
  login: (formValues: ILoginForm) => void;
}

class NormalLoginForm extends React.Component<IProps & RouteComponentProps> {
  public handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: ILoginForm) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.login(values);
      }
    });
  };

  public handleRegister = (e: React.FormEvent) => {
    this.props.history.push('/register');
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const {
      user: { redirectTo },
    } = this.props;
    return (
      <div className="register-container">
        <h2 className="register-title">登录页面</h2>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item {...formItemLayout} label="用户名">
            {getFieldDecorator('username', {
              initialValue: 'confidence',
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="将作为登录昵称"
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              initialValue: '1234',
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="输入长度不小于六位的密码"
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="用户类型">
            {getFieldDecorator('user_type', {
              initialValue: 1,
            })(
              <Radio.Group>
                <Radio value={0}>管理员</Radio>
                <Radio value={1}>普通用户</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
            {getFieldDecorator('remember', {
              initialValue: true,
              valuePropName: 'checked',
            })(<Checkbox>记住密码?</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <Button type="primary" onClick={this.handleRegister} className="register-form-button">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  login: (values: ILoginForm) => dispatch(login(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
