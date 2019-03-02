import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IRootState } from '../../store/index';
import { IRegisterForm, userInfo } from '../../store/user.redux';

// 函数式组件的使用
// v16.7起，由于hooks的加入，函数式组件也可以使用state，所以这个命名不准确。
// 新的react声明文件里，也定义了React.FC类型^_^
const NullCmp: React.SFC<{}> = props => null;

/*
interface IProps {
  user?: IRegisterForm;
  loadUserInfo?: () => void;
}
*/

class AuthRoute extends React.Component<any, any> {
  public componentDidMount() {
    // 获取用户信息: 是否登录
    // 现在的url地址 是否需要用户登录
    const publist: string[] = ['/login', '/register'];
    const {
      location: { pathname },
      history,
    } = this.props;
    if (publist.indexOf(pathname) >= 0) {
      console.log('当前页面直接使用', pathname);
      return;
    }
    // 用户身份判断: 管理员和客户的跳转是不一样的
    // 用户是否完善个人信息
    console.log('当前页面需要登录权限', pathname);
    axios.get('/users/info').then(res => {
      if (res.status === 200) {
        if (res.data.statusCode === 0) {
          // 表示用户已经登录
          // console.log('用户登录成功', res.data.data.user);
          this.props.loadUserInfo(res.data.data.user as IRegisterForm);
        } else {
          // console.log('用户登录失败', this.props);
          history.replace('/login');
        }
      } else {
        console.log('用户没有登录');
        history.replace('/login');
      }
    });
  }

  public render() {
    // console.log(this.props.user);
    console.log('render user', this.props.user);
    return <NullCmp />;
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  loadUserInfo: (user: IRegisterForm) => dispatch(userInfo(user)),
  // login: (values: ILoginForm) => dispatch(login(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthRoute));
// export default AuthRoute;
