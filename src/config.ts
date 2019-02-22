import axios from 'axios';

axios.interceptors.request.use(config => {
  // Toast.loading('加载中', 0);
  console.log('加载中');
  return config;
});

axios.interceptors.request.use(config => {
  console.log('加载结束');
  return config;
});
