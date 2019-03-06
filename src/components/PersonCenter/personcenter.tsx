import { Avatar, Button, Form, Icon, Input, Modal, Radio, Select, Tooltip } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { logout } from '../../store/user.redux';

interface IProps {
  user: any;
  form: any;
  logout: () => void;
}

interface IState {
  disabled: boolean;
}

const { Option } = Select;
const confirm = Modal.confirm;

class PersonCenter extends React.PureComponent<IProps, IState> {
  public state = {
    disabled: true,
  };

  public handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: Error, values: any) => {
      if (!err) {
        // 提交表单的数据对象:values
        console.log('Received values of form: ', values);
        // this.props.edit(values);
      }
    });
  };

  public handleEdit = (e: React.MouseEvent) => {
    this.setState({
      disabled: false,
    });
  };

  public handleLogout = () => {
    const { logout: logoutUser } = this.props;
    confirm({
      cancelText: '取消',
      content: '是否确认登出',
      okText: '确认退出',
      title: 'Do you Want to logout?',
      onOk() {
        logoutUser();
        // window.location.href = window.location.href;
      },
      onCancel() {
        console.log('你取消了登出操作');
      },
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { disabled } = this.state;

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
    const {
      user: {
        isAuth,
        avatar,
        company,
        desc,
        email,
        money,
        phone,
        prefix,
        title,
        username,
        redirectTo,
      },
    } = this.props;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: prefix,
    })(
      <Select style={{ width: 70 }} disabled={disabled}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <div>
        <h2>个人中心页</h2>
        {/* 根据用户是否进行了登出操作, 来进行跳转操作;  注意不能使用redirectTo属性, 因为在跳转到用户中心的时候, redirectTo已经存在了, 会跳转到/user */}
        {isAuth ? null : <Redirect to={redirectTo} />}
        {/* {redirectTo ? <Redirect to={redirectTo} /> : { isAuth }} */}
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
                initialValue: username,
                rules: [
                  {
                    message: 'Please input your username!',
                    required: true,
                    whitespace: true,
                  },
                ],
              })(<Input disabled={disabled} />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label={
                <span>
                  图像&nbsp;
                  <Tooltip title="输入资源地址">
                    <Avatar icon="user" size="small" src={avatar} />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('avatar', {
                initialValue: avatar,
              })(<Input disabled={disabled} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="职称">
              {getFieldDecorator('title', {
                initialValue: title,
              })(
                <Radio.Group disabled={disabled}>
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
                initialValue: email,
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
              })(<Input disabled={disabled} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="公司">
              {getFieldDecorator('company', {
                initialValue: company,
                rules: [
                  {
                    message: 'Please input your Company!',
                    required: true,
                  },
                ],
              })(<Input disabled={disabled} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="期望薪水/月">
              {getFieldDecorator('money', {
                initialValue: money,
                rules: [
                  {
                    message: 'Please input your your money!',
                    required: true,
                  },
                ],
              })(<Input disabled={disabled} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="电话号码">
              {getFieldDecorator('phone', {
                initialValue: phone,
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} disabled={disabled} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="职业标签">
              {getFieldDecorator('desc', {
                initialValue: desc,
                rules: [{ required: true, message: 'Please select your labels!', type: 'array' }],
              })(
                <Select
                  mode="multiple"
                  placeholder="Please select favourite job labels"
                  disabled={disabled}
                >
                  <Option value="javascript">Javascript</Option>
                  <Option value="nodejs">Nodejs</Option>
                  <Option value="react">React</Option>
                  <Option value="es6">ES6</Option>
                  <Option value="typescript">TypeScript</Option>
                  <Option value="Koa2">koa2</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <Button type="primary" onClick={this.handleEdit} style={{ marginLeft: '15px' }}>
                Edit
              </Button>
              <Button type="primary" onClick={this.handleLogout} style={{ marginLeft: '15px' }}>
                Logout
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  // register: (values: IRegisterForm) => dispatch(register(values)),
  // getChatList: (type: string) => dispatch(getUserList(type)),
  logout: () => dispatch(logout()),
});

const WrappedPersonCenterForm = Form.create({ name: 'register' })(PersonCenter);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedPersonCenterForm);
