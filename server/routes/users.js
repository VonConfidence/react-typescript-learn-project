const router = require('koa-router')();
const uuidv1 = require('uuid/v1');
const User = require('../db.js').user;

router.prefix('/users');

// mongoDB 查询的时候, 不需要返回出去的参数
const filter = {
  password: 0,
  __v: 0,
};

router.get('/', async ctx => {
  const docs = await User.find({});
  ctx.body = {
    // statusCode: 0 表示登录成功 statusCode:1 表示登录失败
    statusCode: 1,
    msg: '查询成功',
    users: docs,
  };

  /*
  await User.find({}, (err, docs) => {
    console.log(docs);
    ctx.body = {
      // statusCode: 0 表示登录成功 statusCode:1 表示登录失败
      statusCode: 1,
      msg: '查询成功',
      users: docs,
    };
  });
  */
});

router.get('/testadd', async ctx => {
  const newUser = new User({
    avatar:
      'https://upload.jianshu.io/users/upload_avatars/6083454/ef5ee700-812a-4153-9317-9d26808bf01c.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120',
    captcha: '1234',
    company: 'HUST',
    create_time: '2019/02/27 20:32:00',
    desc: ['javascript', 'react', 'es6'],
    email: '123@qq.com',
    money: '20000',
    password: '1234',
    phone: '130',
    prefix: '86',
    residence: ['zhejiang', 'hangzhou', 'xihu'],
    title: '低级工程师',
    token: 'test user',
    user_type: 1,
    username: 'confidence_2',
  });
  try {
    const user = await newUser.save();
    return (ctx.body = {
      statusCode: 0,
      msg: '注册成功',
      user,
    });
  } catch (e) {
    return (ctx.body = {
      statusCode: 1,
      msg: '注册失败, 后端出错',
      err: e,
    });
  }
});

async function findUserById(uid) {
  let msg = '查询出错';
  let statusCode = 1;
  let data = {};
  try {
    const findUser = await User.findOne({ _id: uid }, filter);
    if (!findUser) {
      msg = '当前用户不存在';
      statusCode = 1;
    } else {
      msg = '';
      statusCode = 0;
      data.user = findUser;
    }
  } catch (e) {
    msg = e.toString();
  }
  return {
    // statusCode: 0 表示登录成功 statusCode:1 表示登录失败(没有登录状态)
    statusCode,
    msg,
    data,
  };
}

async function updateUserById(uid, user) {
  let msg = '更新失败';
  let statusCode = 1;
  let data = {};
  try {
    const oldUser = await User.findByIdAndUpdate(uid, user);
    msg = '';
    statusCode = 0;
    data.user = { ...oldUser._doc, ...user, password: undefined };
    // data.user = { ...oldUser, ...user };
  } catch (e) {
    msg = e.toString();
  }
  return {
    // statusCode: 0 表示登录成功 statusCode:1 表示登录失败(没有登录状态)
    statusCode,
    msg,
    data,
  };
}

////////////////////////////////////////////////////////////////////////
router.get('/list', async ctx => {
  let {
    query: { type = 'users' },
  } = ctx.request;
  type = type === 'users' ? 1 : 0;
  try {
    const docs = await User.find({ user_type: type });
    return (ctx.body = {
      msg: '',
      statusCode: 0,
      data: {
        users: docs,
      },
    });
  } catch (e) {
    return (ctx.body = {
      msg: e.toString(),
      statusCode: 1,
      data: {},
    });
  }
});

router.post('/update', async ctx => {
  const uid = ctx.session.uid;
  const loginStatus = ctx.session.loginStatus;
  if (!uid || !loginStatus) {
    return {
      statusCode: 1,
      msg: '参数出错或者没有登录',
      data: {},
    };
  }
  // uid 存在
  const res = await updateUserById(uid, ctx.request.body);
  ctx.body = res;
});

router.get('/info', async ctx => {
  const loginStatus = ctx.session.loginStatus;
  let msg = '你还没有登录';
  let statusCode = 1;
  let data = {};

  // 如果登录状态为true的话
  if (loginStatus) {
    const uid = ctx.session.uid;
    try {
      const findUser = await User.findOne({ _id: uid }, filter);
      if (!findUser) {
        msg = '当前用户不存在';
        statusCode = 1;
      } else {
        msg = '';
        statusCode = 0;
        data.user = findUser;
      }
    } catch (e) {
      msg = e.toString();
    }
  }
  // 返回数据
  ctx.body = {
    // statusCode: 0 表示登录成功 statusCode:1 表示登录失败(没有登录状态)
    statusCode,
    msg,
    data,
  };
});

router.post('/login', async ctx => {
  const { agreement, username, user_type } = ctx.request.body;
  const findUser = await User.findOne({ agreement, username, user_type }, filter);
  if (!findUser) {
    return (ctx.body = {
      statusCode: 1,
      msg: '用户名或者密码错误',
    });
  }
  ctx.session.loginStatus = true;
  ctx.session.uid = findUser._id;
  ctx.body = {
    statusCode: 0,
    msg: '',
    data: { user: findUser },
  };
});

router.post('/register', async ctx => {
  // console.log(ctx.request.body);
  const { captcha, agreement, username } = ctx.request.body;

  // 基础信息校验
  if (captcha !== '1234') {
    return (ctx.body = {
      statusCode: 1,
      msg: '验证码错误',
    });
  }
  if (!agreement) {
    return (ctx.body = {
      statusCode: 1,
      msg: '必须同意用户协议',
    });
  }

  // 查找用户
  try {
    const findUser = await User.findOne({ username }, filter);
    if (findUser) {
      return (ctx.body = {
        statusCode: 1,
        msg: '用户名重复',
      });
    }
    // 创建用户
    const newUser = await User.create({
      ...ctx.request.body,
      token: uuidv1(),
    });
    ctx.session.loginStatus = true;
    ctx.session.uid = newUser._id;
    return (ctx.body = {
      statusCode: 0,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return (ctx.body = {
      statusCode: 1,
      msg: '注册失败, 后端出错',
      error,
    });
  }
});

router.get('/logout', async ctx => {
  ctx.session = null;
  ctx.body = {
    statusCode: 0,
    msg: '',
    data: {},
  };
});

router.get('/bar', async ctx => {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
