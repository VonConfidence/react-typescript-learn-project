import { Tabs } from 'antd';
import * as React from 'react';
// import { Route } from 'react-router';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import { Dispatch } from 'redux';
import Admin from '../Admin/admin';
import User from '../User/user';
import Me from './../PersonCenter/personcenter';

import { IRootState } from '../../store';

import './style.less';

const TabPane = Tabs.TabPane;

interface ITabItem {
  component: React.ComponentType;
  hide?: boolean;
  path: string;
  text: string;
  title: string;
}

interface IProps {
  user: any;
}

// const Admin: React.SFC<{}> = (props: any) => <div>管理员首页</div>;
// const User: React.SFC<{}> = (props: any) => <div>用户首页</div>;
const Msg: React.SFC<{}> = (props: any) => <div>消息列表</div>;
// const Me: React.SFC<{}> = (props: any) => <div>个人中心页面</div>;

class DashBoard extends React.Component<IProps & RouteComponentProps, any> {
  public tabsChange = (key: string) => {
    console.log('Change', key);
    this.props.history.push(key);
  };

  public render() {
    const {
      user: { user_type },
    } = this.props;
    console.log('dashboard', this.props);
    const tabConfigs: ITabItem[] = [
      {
        component: Admin,
        // 1表示用户 0表示管理员
        hide: user_type === 1,
        path: '/admin',
        text: '管理员',
        title: '用户列表',
      },
      {
        component: User,
        // 1表示用户 0表示管理员
        hide: user_type === 0,
        path: '/user',
        text: '用户',
        title: '管理员列表',
      },
      {
        component: Msg,
        path: '/msg',
        text: '消息',
        title: '消息列表',
      },
      {
        component: Me,
        path: '/me',
        text: '我',
        title: '个人中心',
      },
    ];
    const {
      location: { pathname },
    } = this.props;
    const matchCmp: any = tabConfigs.find((item: ITabItem) => item.path === pathname);
    if (!matchCmp) {
      return null;
    }
    return (
      <div className="dashboard-container">
        {/* <Route path="/user" component={Admin} />
        <Route path="/admin" component={User} /> */}
        <h2>{matchCmp.text}</h2>
        <main>
          <Tabs defaultActiveKey={matchCmp.path} onChange={this.tabsChange}>
            {tabConfigs
              .filter(tab => !tab.hide)
              .map(tab => (
                <TabPane tab={tab.title} key={tab.path}>
                  {<tab.component />}
                </TabPane>
              ))}
          </Tabs>
        </main>
        <h2>Footer</h2>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(withRouter(DashBoard));
