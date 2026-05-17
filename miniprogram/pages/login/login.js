Page({
  data: {
    username: '',
    password: '',
    showPassword: false
  },

  onUsernameInput: function(e) {
    this.setData({ username: e.detail.value });
  },

  onPasswordInput: function(e) {
    this.setData({ password: e.detail.value });
  },

  toggleShowPassword: function() {
    this.setData({
      showPassword: !this.data.showPassword
    });
  },

  handleLogin: function() {
    const { username, password } = this.data;

    if (!username || !password) {
      wx.showToast({ title: '请输入账号密码', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '验证中...' });

    // 调用云函数验证，密码不暴露在前端
    wx.cloud.callFunction({
      name: 'login',
      data: { username, password }
    }).then(res => {
      wx.hideLoading();
      const result = res.result;
      if (result.success) {
        wx.setStorageSync('isLogin', true);
        wx.setStorageSync('username', result.username);
        wx.setStorageSync('role', result.role);

        wx.reLaunch({
          url: '/pages/index/index'
        });
      } else {
        wx.showToast({ title: result.msg || '账号或密码错误', icon: 'none' });
      }
    }).catch(err => {
      wx.hideLoading();
      console.error('云函数调用失败', err);
      wx.showToast({ title: '登录服务异常，请稍后重试', icon: 'none' });
    });
  }
});
