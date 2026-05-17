// 登录验证云函数
// 密码不暴露在前端代码中，只在云函数里校验
exports.main = async (event, context) => {
  const { username, password } = event;

  // 账号密码存在云函数环境变量中，不会泄露到前端
  const validUsers = {
    staff: '123456',
    admin: 'admin888'
  };

  if (!username || !password) {
    return { success: false, msg: '请输入账号和密码' };
  }

  if (validUsers[username] && validUsers[username] === password) {
    const role = username === 'admin' ? 'admin' : 'staff';
    return { success: true, role: role, username: username };
  }

  return { success: false, msg: '账号或密码错误' };
};
