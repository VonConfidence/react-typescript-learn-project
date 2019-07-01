const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session');

const index = require('./routes/index');
const users = require('./routes/users');
const chats = require('./routes/chats');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.keys = ['some secret hurr']; /*cookie的签名*/
const CONFIG = {
  key: 'koa:sess' /** 默认 */,
  maxAge: 86400000 /*  cookie的过期时间 ms */,
  overwrite: true /** (boolean) can overwrite or not (default true)    没有效果，默认 */,
  httpOnly: true /**  true 表示只有服务器端可以获取cookie */,
  signed: true /** 默认 签名 */,
  rolling: true /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */,
  renew: true /** (boolean) renew session when session is nearly expired      【需要修改】*/,
};
app.use(session(CONFIG, app));

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(chats.routes(), chats.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
