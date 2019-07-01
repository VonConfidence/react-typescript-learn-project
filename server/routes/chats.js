const router = require('koa-router')();
const uuidv1 = require('uuid/v1');
const Chat = require('../db.js').chat;

router.prefix('/chats');

router.get('/', async ctx => {
  const docs = await Chat.find({});
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

router.get('/list', async ctx => {
  const uid = ctx.session.uid;
  try {
    const docs = await Chat.find({ $or: [{ from: uid }, { to: uid }] });
    return (ctx.body = {
      statusCode: 0,
      msg: '',
      data: {
        msgs: docs,
      },
    });
  } catch (e) {
    return (ctx.body = {
      statusCode: 1,
      msg: '注册失败, 后端出错',
      err: e,
    });
  }
});

router.get('/bar', async ctx => {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
