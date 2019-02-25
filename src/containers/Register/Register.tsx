import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Select,
  Tooltip,
} from 'antd';
import * as React from 'react';

import './register.less';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

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
  autoCompleteResult: any[];
}

interface IProps {
  form: any;
}

class RegistrationForm extends React.Component<IProps, IState> {
  public state = {
    autoCompleteResult: [],
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
    this.props.form.validateFieldsAndScroll((err: Error, values: any[]) => {
      if (!err) {
        console.log('Received values of form: ', values);
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

  public handleWebsiteChange = (value: string) => {
    let autoCompleteResult: string[];
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div className="register-container">
        <h2>注册页面</h2>
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
                rules: [
                  { required: true, message: 'Please input your username!', whitespace: true },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="邮箱">
              {getFieldDecorator('email', {
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
            <Form.Item {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
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
            <Form.Item {...formItemLayout} label="确认密码">
              {getFieldDecorator('confirm', {
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
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="网站">
              {getFieldDecorator('website', {
                rules: [{ required: true, message: 'Please input website!' }],
              })(
                <AutoComplete
                  dataSource={websiteOptions}
                  onChange={this.handleWebsiteChange}
                  placeholder="website"
                >
                  <Input />
                </AutoComplete>
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

export default WrappedRegistrationForm;
