// db.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/population-test');

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
  avatar: String,
  captcha: String,
  company: String,
  create_time: String,
  desc: Array,
  email: String,
  money: String,
  password: String,
  phone: String,
  prefix: String,
  residence: Array,
  title: String,
  token: String,
  user_type: {
    type: Number,
    require: true,
  },
  username: String,
});

const chatSchema = mongoose.Schema({});

// 根据schema生成model
const UsersModel = mongoose.model('Users', userSchema);
const ChatsModel = mongoose.model('chats', chatSchema);

const models = {
  user: UsersModel,
  chat: ChatsModel,
};

module.exports = models;
