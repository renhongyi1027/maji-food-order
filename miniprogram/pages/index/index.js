Page({
  data: {
    categories: [
      {
        name: '蔬菜类',
        isOpen: true,
        items: [
          { name: '土豆', unit: '斤', count: 0 },
          { name: '冬瓜', unit: '斤', count: 0 },
          { name: '白菜', unit: '斤', count: 0 },
          { name: '豆芽', unit: '斤', count: 0 },
          { name: '莲藕', unit: '斤', count: 0 },
          { name: '上海青', unit: '斤', count: 0 },
          { name: '中国空心菜', unit: '斤', count: 0 },
          { name: '金针菇', unit: '斤', count: 0 },
          { name: '杏鲍菇', unit: '斤', count: 0 },
          { name: '西兰花', unit: '斤', count: 0 },
          { name: '菜花', unit: '斤', count: 0 },
          { name: '大蒜', unit: '斤', count: 0 },
          { name: '小葱', unit: '斤', count: 0 },
          { name: '红洋葱', unit: '斤', count: 0 },
          { name: '香菜', unit: '斤', count: 0 },
          { name: '大葱', unit: '斤', count: 0 },
          { name: '姜', unit: '斤', count: 0 },
          { name: '小米辣', unit: '斤', count: 0 },
          { name: '向日葵苗', unit: '斤', count: 0 },
          { name: '胡萝卜', unit: '斤', count: 0 },
          { name: '黄瓜', unit: '斤', count: 0 },
          { name: '蔬菜粒(冻)', unit: '袋', count: 0 },
          { name: '玉兰片(笋片)', unit: '袋', count: 0 },
          { name: '蟹味菇', unit: '袋', count: 0 }
        ]
      },
      {
        name: '肉类、海鲜类',
        isOpen: true,
        items: [
          { name: '猪五花', unit: '斤', count: 0 },
          { name: '猪里脊', unit: '斤', count: 0 },
          { name: '本地牛肉', unit: '斤', count: 0 },
          { name: '肥牛', unit: '斤', count: 0 },
          { name: '鸡肉', unit: '斤', count: 0 },
          { name: '百叶', unit: '斤', count: 0 },
          { name: '鸡翅', unit: '斤', count: 0 },
          { name: '虾', unit: '斤', count: 0 },
          { name: '鱿鱼花', unit: '斤', count: 0 },
          { name: '巴沙鱼', unit: '斤', count: 0 },
          { name: '蟹棒', unit: '袋', count: 0 },
          { name: '鱼子丸', unit: '袋', count: 0 },
          { name: '潮汕牛肉丸', unit: '袋', count: 0 },
          { name: '泰国牛肉丸', unit: '袋', count: 0 },
          { name: '牛棒骨', unit: '斤', count: 0 },
          { name: '鸡架', unit: '斤', count: 0 },
          { name: '牛骨', unit: '斤', count: 0 },
          { name: '鸭肠', unit: '斤', count: 0 },
          { name: '午餐肉', unit: '罐', count: 0 },
          { name: '火腿肠', unit: '袋', count: 0 },
          { name: '猪血', unit: '盒', count: 0 },
          { name: '腊肠', unit: '斤', count: 0 },
          { name: '鱿鱼须', unit: '斤', count: 0 },
          { name: '墨鱼丸', unit: '袋', count: 0 },
          { name: '龙虾丸', unit: '袋', count: 0 }
        ]
      },
      {
        name: '调味料',
        isOpen: false,
        items: [
          { name: '油', unit: '桶', count: 0 },
          { name: '盐', unit: '袋', count: 0 },
          { name: '老抽', unit: '瓶', count: 0 },
          { name: '生抽', unit: '瓶', count: 0 },
          { name: '味精', unit: '袋', count: 0 },
          { name: '中国鸡精', unit: '袋', count: 0 },
          { name: '泰国鸡精', unit: '袋', count: 0 },
          { name: '陈醋', unit: '瓶', count: 0 },
          { name: '白醋', unit: '瓶', count: 0 },
          { name: '豆瓣酱', unit: '罐', count: 0 },
          { name: '辣椒油', unit: '罐', count: 0 },
          { name: '麻油', unit: '瓶', count: 0 },
          { name: '白砂糖', unit: '袋', count: 0 },
          { name: '芝麻油(香油)', unit: '瓶', count: 0 },
          { name: '红糖', unit: '袋', count: 0 },
          { name: '蚝油', unit: '瓶', count: 0 },
          { name: '柠檬汁', unit: '瓶', count: 0 },
          { name: '火锅底料', unit: '袋', count: 0 },
          { name: '火锅底料(无牛油)', unit: '袋', count: 0 },
          { name: '甜面酱', unit: '罐', count: 0 },
          { name: '料酒', unit: '瓶', count: 0 },
          { name: '芝麻酱（大桶）', unit: '桶', count: 0 },
          { name: '韭菜花', unit: '瓶', count: 0 },
          { name: '灯笼椒', unit: '瓶', count: 0 },
          { name: '酱豆腐', unit: '瓶', count: 0 },
          { name: '芝麻', unit: '袋', count: 0 },
          { name: '老干妈', unit: '瓶', count: 0 },
          { name: '孜然粉', unit: '袋', count: 0 },
          { name: '十三香', unit: '盒', count: 0 },
          { name: '鲜花椒', unit: '斤', count: 0 },
          { name: '青花椒', unit: '斤', count: 0 },
          { name: '大料', unit: '袋', count: 0 },
          { name: '香叶', unit: '袋', count: 0 },
          { name: '草果', unit: '袋', count: 0 },
          { name: '白蔻', unit: '袋', count: 0 },
          { name: '干辣椒', unit: '斤', count: 0 },
          { name: '泰国辣椒粉', unit: '袋', count: 0 },
          { name: '鸡油', unit: '斤', count: 0 },
          { name: '白胡椒粉', unit: '袋', count: 0 },
          { name: '牛油', unit: '斤', count: 0 },
          { name: '猪油', unit: '斤', count: 0 },
          { name: '印度辣椒面', unit: '袋', count: 0 },
          { name: '奶粉', unit: '袋', count: 0 },
          { name: '黄豆酱', unit: '罐', count: 0 },
          { name: '鸡汁', unit: '瓶', count: 0 },
          { name: '药料（麻辣烫底料用）', unit: '袋', count: 0 },
          { name: '花椒面', unit: '袋', count: 0 },
          { name: '麻椒面', unit: '袋', count: 0 },
          { name: '香菜籽粉', unit: '袋', count: 0 }
        ]
      },
      {
        name: '豆制品类、蛋类',
        isOpen: false,
        items: [
          { name: '鸡蛋豆腐', unit: '条', count: 0 },
          { name: '嫩豆腐(凉拌)', unit: '盒', count: 0 },
          { name: '油豆腐', unit: '斤', count: 0 },
          { name: '鱼豆腐', unit: '斤', count: 0 },
          { name: '冻豆腐', unit: '斤', count: 0 },
          { name: '千张', unit: '斤', count: 0 },
          { name: '豆干', unit: '斤', count: 0 },
          { name: '响铃卷', unit: '盒', count: 0 },
          { name: '千叶豆腐', unit: '斤', count: 0 },
          { name: '魔芋丝', unit: '盒', count: 0 },
          { name: '鸡蛋', unit: '筐', count: 0 },
          { name: '鹌鹑蛋', unit: '斤', count: 0 },
          { name: '皮蛋', unit: '提', count: 0 }
        ]
      },
      {
        name: '主食类',
        isOpen: false,
        items: [
          { name: '大米', unit: '袋', count: 0 },
          { name: '方便面', unit: '包', count: 0 },
          { name: '韩国面', unit: '包', count: 0 },
          { name: '黄面', unit: '包', count: 0 },
          { name: '绿面', unit: '包', count: 0 },
          { name: '饺子(猪肉白菜)', unit: '袋', count: 0 },
          { name: '饺子(猪肉韭菜)', unit: '袋', count: 0 },
          { name: '饺子(猪肉玉米)', unit: '袋', count: 0 },
          { name: '饺子(猪肉高丽菜)', unit: '袋', count: 0 },
          { name: '乌冬面', unit: '包', count: 0 },
          { name: '土豆粉', unit: '包', count: 0 },
          { name: '粉丝', unit: '袋', count: 0 },
          { name: '年糕', unit: '包', count: 0 },
          { name: '芝士年糕', unit: '包', count: 0 },
          { name: '火锅小油条', unit: '袋', count: 0 }
        ]
      },
      {
        name: '干货类',
        isOpen: false,
        items: [
          { name: '香菇', unit: '斤', count: 0 },
          { name: '木耳', unit: '斤', count: 0 },
          { name: '海带丝', unit: '斤', count: 0 },
          { name: '海带结', unit: '斤', count: 0 },
          { name: '粉丝', unit: '袋', count: 0 },
          { name: '油豆皮', unit: '斤', count: 0 },
          { name: '贡菜', unit: '斤', count: 0 },
          { name: '面筋', unit: '斤', count: 0 },
          { name: '腐竹', unit: '斤', count: 0 },
          { name: '紫菜', unit: '袋', count: 0 },
          { name: '红薯粉丝', unit: '斤', count: 0 }
        ]
      },
      {
        name: '杂品类',
        isOpen: false,
        items: [
          { name: '饮料（可乐）', unit: '件', count: 0 },
          { name: '打包袋(塑料)', unit: '捆', count: 0 },
          { name: '打包盒(方)', unit: '件', count: 0 },
          { name: '打包盒(圆形)', unit: '件', count: 0 },
          { name: '饮料瓶（150cc)', unit: '袋', count: 0 },
          { name: '煤气', unit: '罐', count: 0 },
          { name: '餐具(筷子)', unit: '箱', count: 0 },
          { name: '桶装水', unit: '桶', count: 0 },
          { name: '垃圾袋', unit: '卷', count: 0 },
          { name: '打印纸', unit: '本', count: 0 },
          { name: '餐巾纸', unit: '提', count: 0 },
          { name: '厨房用纸', unit: '卷', count: 0 },
          { name: '洗洁精', unit: '瓶', count: 0 },
          { name: '地板清洗剂', unit: '瓶', count: 0 },
          { name: '钢丝球', unit: '个', count: 0 },
          { name: '洗碗海绵', unit: '个', count: 0 },
          { name: '洗衣粉', unit: '袋', count: 0 },
          { name: '矿泉水', unit: '件', count: 0 },
          { name: '厨房清洁剂', unit: '瓶', count: 0 },
          { name: '保鲜膜', unit: '卷', count: 0 },
          { name: '皮筋', unit: '袋', count: 0 },
          { name: '香料袋', unit: '袋', count: 0 },
          { name: '冰粉', unit: '袋', count: 0 },
          { name: '冰粉配料', unit: '袋', count: 0 }
        ]
      }
    ],
    myTodayOrder: null,
    showHistory: false,
    todayStr: ''
  },

  onLoad: function() {
    const isLogin = wx.getStorageSync('isLogin');
    if (!isLogin) {
      wx.reLaunch({ url: '/pages/login/login' });
      return;
    }
    const role = wx.getStorageSync('role');
    if (role === 'admin') {
      wx.reLaunch({ url: '/pages/admin/admin' });
      return;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    this.setData({ todayStr: dateStr });
    this.fetchMyTodayOrder();
  },

  fetchMyTodayOrder: function() {
    const db = wx.cloud.database();
    const username = wx.getStorageSync('username');
    db.collection('orders').where({
      staff: username,
      date: this.data.todayStr
    }).orderBy('createTime', 'desc').get().then(res => {
      if (res.data.length > 0) {
        this.setData({ myTodayOrder: res.data[0] });
      }
    });
  },

  toggleHistory: function() {
    this.setData({ showHistory: !this.data.showHistory });
  },

  toggleCategory: function(e) {
    const idx = e.currentTarget.dataset.idx;
    const categories = this.data.categories;
    categories[idx].isOpen = !categories[idx].isOpen;
    this.setData({ categories });
  },

  increase: function(e) {
    const { catidx, itemidx } = e.currentTarget.dataset;
    const categories = this.data.categories;
    categories[catidx].items[itemidx].count++;
    this.setData({ categories });
  },

  decrease: function(e) {
    const { catidx, itemidx } = e.currentTarget.dataset;
    const categories = this.data.categories;
    if (categories[catidx].items[itemidx].count > 0) {
      categories[catidx].items[itemidx].count--;
      this.setData({ categories });
    }
  },

  onInput: function(e) {
    const { catidx, itemidx } = e.currentTarget.dataset;
    const val = parseInt(e.detail.value) || 0;
    const categories = this.data.categories;
    categories[catidx].items[itemidx].count = val;
    this.setData({ categories });
  },

  submitOrder: function() {
    let orders = [];
    this.data.categories.forEach(cat => {
      cat.items.forEach(item => {
        if (item.count > 0) {
          orders.push({ 
            name: item.name, 
            unit: item.unit, 
            count: item.count,
            category: cat.name 
          });
        }
      });
    });

    if (orders.length === 0) {
      wx.showToast({ title: '请先选择食材', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '正在同步云端...' });
    
    const db = wx.cloud.database();
    const username = wx.getStorageSync('username') || '未知员工';

    db.collection('orders').add({
      data: {
        staff: username,
        items: orders,
        createTime: db.serverDate(),
        date: this.data.todayStr
      }
    }).then(res => {
      wx.hideLoading();
      wx.showModal({
        title: '提交成功',
        content: '数据已实时同步至云端数据库',
        showCancel: false,
        success: () => {
          this.fetchMyTodayOrder();
          const categories = this.data.categories.map(cat => ({
            ...cat,
            items: cat.items.map(item => ({ ...item, count: 0 })),
            isOpen: cat.isOpen
          }));
          this.setData({ categories });
        }
      });
    }).catch(err => {
      wx.hideLoading();
      console.error('提交失败', err);
      wx.showToast({ title: '同步失败，请检查网络或开通云开发', icon: 'none' });
    });
  },

  goToAdmin: function() {
    const role = wx.getStorageSync('role');
    if (role === 'admin') {
      wx.navigateTo({ url: '/pages/admin/admin' });
    } else {
      wx.showToast({ title: '只有管理员可进入', icon: 'none' });
    }
  },

  logout: function() {
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.reLaunch({ url: '/pages/login/login' });
        }
      }
    });
  }
});