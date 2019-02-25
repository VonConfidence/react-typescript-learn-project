import { Button, Checkbox, Form, Icon, Input, Radio } from 'antd';
import * as React from 'react';

import './login.less';
interface IProps {
  form: any;
  history: any;
}

interface IFormValues {
  password: string;
  remember: boolean;
  username: string;
}

class NormalLoginForm extends React.Component<IProps> {
  public handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: IFormValues) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  public handleRegister = (e: React.FormEvent) => {
    this.props.history.push('/register');
    console.log('跳转到history');
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div className="register-container">
        <h2 className="register-title">登录页面</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item {...formItemLayout} label="用户名">
            {getFieldDecorator('username', {
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
            {getFieldDecorator('user_type')(
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

export default WrappedNormalLoginForm;
