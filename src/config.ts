import { message } from 'antd';
import axios from 'axios';

let hideLoading: () => void = () => {
  console.log('加载结束');
};

axios.interceptors.request.use(config => {
  hideLoading = message.loading('加载中...', 0);
  return config;
});

axios.interceptors.response.use(config => {
  hideLoading();
  return config;
});
