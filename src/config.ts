import { message, notification } from 'antd';
import axios from 'axios';

let hideLoading: () => void;

axios.defaults.headers.common.withCredentials = true;
axios.defaults.headers.common.crossDomain = true;
axios.defaults.timeout = 5000;

axios.interceptors.request.use(config => {
  // 防止一个网站有多个请求的时候, 多个loading状态
  if (hideLoading) {
    hideLoading();
    return config;
  }
  hideLoading = message.loading('加载中...', 0);
  return config;
});

axios.interceptors.response.use(response => {
  hideLoading();
  const {
    data: { msg, statusCode = 0 },
  } = response;
  switch (statusCode) {
    // 注册失败
    case 1: {
      notification.warning({
        description: msg,
        duration: 2,
        message: '警告',
      });
    }
    default: {
      break;
    }
  }
  return response;
});
