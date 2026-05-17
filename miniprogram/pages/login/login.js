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

    // 模拟登录逻辑
    // 后续可以配合云函数实现真正的权限控制
    setTimeout(() => {
      wx.hideLoading();
      if ((username === 'staff' && password === '123456') || (username === 'admin' && password === 'admin888')) {
        wx.setStorageSync('isLogin', true);
        wx.setStorageSync('username', username);
        wx.setStorageSync('role', username === 'admin' ? 'admin' : 'staff');
        
        wx.reLaunch({
          url: '/pages/index/index'
        });
      } else {
        wx.showToast({ title: '账号或密码错误', icon: 'none' });
      }
    }, 1000);
  }
});