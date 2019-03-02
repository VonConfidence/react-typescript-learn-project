interface IUser {
  // user_type:0 管理员 1:普通用户
  user_type: number;
  avatar: string;
}

export function getRedirectPath({ user_type, avatar }: IUser): string {
  // 根据用户的信息, 返回跳转地址
  // user.user_type /admin /user
  // user.avatar /admininfo /userinfo
  let url = user_type === 0 ? '/admin' : '/user';
  if (!avatar) {
    // 如果没有头像, 需要用户补充用户信息
    url = `${url}info`;
  }
  return url;
}
