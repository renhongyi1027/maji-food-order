App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env: '您的环境ID', // 建议去云开发控制台复制环境ID填在这里
        traceUser: true,
        timeout: 10000 // 将超时时间延长至10秒
      });
    }
    this.globalData = {};
  }
});