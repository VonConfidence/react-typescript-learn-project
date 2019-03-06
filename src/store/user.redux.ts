import Axios from 'axios';
import { Dispatch } from 'redux';
import { getRedirectPath } from './../utils';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG: string = 'ERROR_MSG';
const LOAD_USER: string = 'LOAD_USER';
const USER_LOGOUT: string = 'USER_LOGOUT';

export interface ILoginForm {
  password: string;
  remember: boolean;
  username: string;
  user_type: number;
  avatar?: string;
}

export interface IRegisterForm {
  _id: string;
  agreement: string; // 是否同意协议
  avatar: string; // 图像
  captcha: string; // 验证码
  company: string; // 公司名称( 管理员才会用到)
  desc: string[]; // 描述
  email: string; // 邮箱
  password: string; // 密码
  phone: string; // 手机号码
  prefix: string; // 电话号码前缀
  residence: string[]; // 居住地址
  title: string; // 职称
  username: string; // 用户名
  user_type: number; // 用户类型
  money: string; // 管理员则是招聘薪水, 用户则是求职薪水
  token: string; // 用户唯一token值 暂时没有用到
}

interface IActionType {
  type: string;
  msg: string;
  payload?: any;
}

export interface IStoreState {
  isAuth: false;
  msg: string;
  redirectTo?: string;
  user?: object;
}

const initialState: IStoreState = {
  isAuth: false,
  // 表示用户表单问题出错信息提示
  msg: '',
  // 跳转路径
  redirectTo: '',
  // user: {},
};

// reducer
export function userReducer(state = initialState, action: IActionType) {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return {
        isAuth: true,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
      };
    }
    case LOGIN_SUCCESS: {
      return {
        isAuth: true,
        msg: '',
        ...action.payload,
        redirectTo: getRedirectPath(action.payload),
      };
    }
    case ERROR_MSG: {
      return { ...state, isAuth: false, msg: action.msg, redirectTo: '' };
    }
    case LOAD_USER: {
      console.log('action.payload', action.payload);
      return {
        // 登录信息
        isAuth: true,
        msg: '',
        // 用户信息
        ...action.payload,
        redirectTo: getRedirectPath(action.payload),
      };
    }
    case USER_LOGOUT: {
      return {
        // 登录信息
        isAuth: false,
        msg: '',
        redirectTo: '/login',
      };
    }
    default:
      break;
  }
  return state;
}

function loginSuccess(payload: ILoginForm) {
  return { type: LOGIN_SUCCESS, payload };
}

function registerSuccess(payload: IRegisterForm) {
  return { type: REGISTER_SUCCESS, payload };
}

function errorMsg(msg: string): IActionType {
  return { type: ERROR_MSG, msg };
}

function loadData(userinfo: IRegisterForm) {
  return { type: LOAD_USER, payload: userinfo };
}

function userLogout() {
  return { type: USER_LOGOUT, payload: {} };
}

// loginAction
export function login({ username, password, remember, user_type }: ILoginForm) {
  /*
  if (!username || !password || !user_type) {
    errorMsg('用户名或者密码必须输入');
  }
  */
  // 异步任务: 使用dispatch来处理
  return async (dispatch: Dispatch) => {
    const res = await Axios.post('/users/login', { username, password, user_type, remember });
    if (res.status === 200 && res.data.statusCode === 0) {
      dispatch(loginSuccess(res.data.data.user));
    } else {
      // 表示注册失败
      dispatch(errorMsg(res.data.msg));
    }
  };
}

// registerAction
export function register(registerFormValues: IRegisterForm) {
  // 同步任务: 直接返回一个 {type, msg}
  /*
  if (!username || !password || !email || !phone) {
    return errorMsg('用户名或者密码, 邮箱必须输入');
  }
  if (!agreement) {
    return errorMsg('协议必须同意');
  }
  if (captcha !== '1234') {
    return errorMsg('验证码不正确');
  }
  console.log('异步请求处理');
  */
  // 异步任务: 使用dispatch来处理
  return async (dispatch: Dispatch) => {
    const res = await Axios.post('/users/register', { ...registerFormValues });
    if (res.status === 200 && res.data.statusCode === 0) {
      dispatch(registerSuccess(res.data.data.user));
    } else {
      // 表示注册失败
      dispatch(errorMsg(res.data.msg));
    }
  };
}

// 加载用户数据 (直接url跳转到某个网站, cookie存在的情况下)
export function userInfo(user: IRegisterForm) {
  return async (dispatch: Dispatch) => {
    dispatch(loadData(user));
  };
  // return async (dispatch: Dispatch) => {
  //   const res = await Axios.get('/users/userinfo');
  //   if (res.status === 200 && res.data.statusCode === 0) {
  //     dispatch(loadData(res.data.user));
  //   } else {
  //     // 表示注册失败
  //     dispatch(errorMsg(res.data.msg));
  //   }
  // };
}

export function updateUserInfo(user: IRegisterForm) {
  return async (dispatch: Dispatch) => {
    const res = await Axios.post('/users/update', user);
    if (res.status === 200 && res.data.statusCode === 0) {
      dispatch(loadData(res.data.data.user));
    } else {
      // 表示修改失败
      dispatch(errorMsg(res.data.msg));
    }
  };
}

export function logout() {
  return async (dispatch: Dispatch) => {
    const res = await Axios.get('/users/logout');
    if (res.status === 200 && res.data.statusCode === 0) {
      dispatch(userLogout());
    } else {
      // 表示修改失败
      dispatch(errorMsg(res.data.msg));
    }
  };
}
