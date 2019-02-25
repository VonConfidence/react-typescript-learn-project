const router = require('koa-router')();

router.prefix('/users');

router.get('/', ctx => {
  ctx.body = 'this is a users response!';
});

router.get('/info', ctx => {
  ctx.body = {
    statusCode: 0,
    data: {},
  };
});

router.get('/bar', ctx => {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
