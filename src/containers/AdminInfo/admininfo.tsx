import { Avatar, Breadcrumb, Button, Form, Icon, Input, Select, Tooltip } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IRootState } from '../../store';
import { IRegisterForm, IStoreState, updateUserInfo } from '../../store/user.redux';
import './style.less';

const { Option } = Select;

// interface IProps extends FormComponentProps {}
interface IProps {
  user: IStoreState;
  updateUserInfo: (values: IRegisterForm) => void;
}

class AdminPage extends React.Component<FormComponentProps & IProps & RouteComponentProps, any> {
  public handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: Error, values: IRegisterForm) => {
      if (!err) {
        // 提交表单的数据对象:values
        console.log('Received values of form: ', values);
        this.props.updateUserInfo(values);
      }
    });
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
      location: { pathname },
    } = this.props;
    return (
      <div className="container">
        {redirectTo && pathname !== redirectTo ? <Redirect to={redirectTo} /> : false}
        <header className="header">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>管理员信息完善</Breadcrumb.Item>
          </Breadcrumb>
        </header>
        <main>
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

            <Form.Item {...formItemLayout} label="电话号码">
              {getFieldDecorator('phone', {
                initialValue: '130',
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="招聘薪水/月">
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
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                完善信息
              </Button>
            </Form.Item>
          </Form>
        </main>
      </div>
    );
  }
}

const WrappedAdminInfoForm = Form.create({ name: 'adminpage' })(AdminPage);

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateUserInfo: (values: IRegisterForm) => dispatch(updateUserInfo(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedAdminInfoForm);

// export default WrappedAdminInfoForm;
