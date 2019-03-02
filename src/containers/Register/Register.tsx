import {
  Avatar,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  Radio,
  Row,
  Select,
  Tooltip,
} from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';

import { IRootState } from '../../store/index';
import { IRegisterForm, register } from '../../store/user.redux';

import './register.less';

const { Option } = Select;

const residences = [
  {
    children: [
      {
        children: [
          {
            label: 'West Lake',
            value: 'xihu',
          },
        ],
        label: 'Hangzhou',
        value: 'hangzhou',
      },
    ],
    label: 'Zhejiang',
    value: 'zhejiang',
  },
  {
    children: [
      {
        children: [
          {
            label: 'Zhong Hua Men',
            value: 'zhonghuamen',
          },
        ],
        label: 'Nanjing',
        value: 'nanjing',
      },
    ],

    label: 'Jiangsu',
    value: 'jiangsu',
  },
];

interface IState {
  confirmDirty: boolean;
}

interface IProps {
  form: any;
  user: any;
  register: (formValues: IRegisterForm) => void;
}
class RegistrationForm extends React.Component<IProps, IState> {
  public state = {
    confirmDirty: false,
  };

  public compareToFirstPassword = (rule: any, value: string, callback: (str?: string) => void) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  public handleConfirmBlur: React.FocusEventHandler = (e: React.FocusEvent) => {
    const value: string = (e.target as HTMLInputElement).value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  public handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: Error, values: any) => {
      if (!err) {
        // 提交表单的数据对象:values
        console.log('Received values of form: ', values);
        this.props.register(values);
      }
    });
  };

  public validateToNextPassword = (rule: any, value: string, callback: () => void) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
        xs: { span: 24 },
      },
      wrapperCol: {
        sm: { span: 16 },
        xs: { span: 24 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        sm: {
          offset: 8,
          span: 16,
        },
        xs: {
          offset: 0,
          span: 24,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const {
      user: { redirectTo },
    } = this.props;

    return (
      <div className="register-container">
        <h2>注册页面 跳转: {redirectTo}</h2>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <div className="register-form-container">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label={
                <span>
                  用户名&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('username', {
                initialValue: 'confidence',
                rules: [
                  {
                    message: 'Please input your username!',
                    required: true,
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label={
                <span>
                  图像&nbsp;
                  <Tooltip title="输入资源地址">
                    <Avatar
                      icon="user"
                      size="small"
                      src="https://upload.jianshu.io/users/upload_avatars/6083454/ef5ee700-812a-4153-9317-9d26808bf01c.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120"
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('avatar', {
                initialValue:
                  'https://upload.jianshu.io/users/upload_avatars/6083454/ef5ee700-812a-4153-9317-9d26808bf01c.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120',
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="用户类型">
              {getFieldDecorator('user_type', {
                initialValue: 1,
                rules: [
                  {
                    message: 'Please choose user type!',
                    required: true,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}>普通用户</Radio>
                  <Radio value={0}>管理员</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="职称">
              {getFieldDecorator('title', {
                initialValue: '程序猿',
              })(
                <Radio.Group>
                  <Radio.Button value="其它">其它</Radio.Button>
                  <Radio.Button value="程序猿">程序猿</Radio.Button>
                  <Radio.Button value="低级工程师">低级工程师</Radio.Button>
                  <Radio.Button value="中级工程师">中级工程师</Radio.Button>
                  <Radio.Button value="高级工程师">高级工程师</Radio.Button>
                  <Radio.Button value="专家">专家</Radio.Button>
                  <Radio.Button value="科学家">科学家</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="邮箱">
              {getFieldDecorator('email', {
                initialValue: 'confidence@qq.com',
                rules: [
                  {
                    message: 'The input is not valid E-mail!',
                    type: 'email',
                  },
                  {
                    message: 'Please input your E-mail!',
                    required: true,
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="公司">
              {getFieldDecorator('company', {
                initialValue: 'HUST',
                rules: [
                  {
                    message: 'Please input your Company!',
                    required: true,
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="期望薪水/月">
              {getFieldDecorator('money', {
                initialValue: '1000$',
                rules: [
                  {
                    message: 'Please input your your money!',
                    required: true,
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="确认密码">
              {getFieldDecorator('confirm', {
                initialValue: '123',
                rules: [
                  {
                    message: 'Please confirm your password!',
                    required: true,
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
                initialValue: '123',
                rules: [
                  {
                    message: 'Please input your password!',
                    required: true,
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="居住地址">
              {getFieldDecorator('residence', {
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [
                  {
                    message: 'Please select your habitual residence!',
                    required: true,
                    type: 'array',
                  },
                ],
              })(<Cascader options={residences} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="电话号码">
              {getFieldDecorator('phone', {
                initialValue: '130',
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="职业标签">
              {getFieldDecorator('desc', {
                initialValue: ['javascript', 'typescript'],
                rules: [{ required: true, message: 'Please select your labels!', type: 'array' }],
              })(
                <Select mode="multiple" placeholder="Please select favourite job labels">
                  <Option value="javascript">Javascript</Option>
                  <Option value="nodejs">Nodejs</Option>
                  <Option value="react">React</Option>
                  <Option value="es6">ES6</Option>
                  <Option value="typescript">TypeScript</Option>
                  <Option value="Koa2">koa2</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="验证码"
              extra="点击获取验证码, 稍后将会发送至你的邮箱."
            >
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('captcha', {
                    initialValue: '1234',
                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                  })(<Input />)}
                </Col>
                <Col span={12}>
                  <Button>获取</Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  我已经阅读 <a href="">协议</a>
                </Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  register: (values: IRegisterForm) => dispatch(register(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
