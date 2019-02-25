// db.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/koa-db');

const db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', () => {
  console.log('数据库连接出错！');
});
db.on('open', () => {
  console.log('数据库连接成功！');
});

// 声明schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  create_time: Date,
});
// 根据schema生成model
const User = mongoose.model('User', userSchema);

module.exports = User;
