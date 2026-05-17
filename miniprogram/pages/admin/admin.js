Page({
  data: {
    currentTab: 'summary', // summary, finance, 或 tools
    today: '',
    selectedDate: '',
    // 汇总数据
    summary: [],
    // 财务数据
    cost: '',
    grab: '',
    lineman: '',
    shopee: '',
    wukong: '',
    totalIncome: 0,
    profit: 0,
    expenseList: [{ name: '', amount: '', receipt: '' }], // 新增：多项支出列表支持收据
    remarks: '', // 备注作为补充说明保留
    recentStats: [],
    // 工具数据
    marginCost: '',
    marginPrice: '',
    marginPackaging: '', // 新增：包装成本
    marginPlatformRate: 30, // 新增：平台费率（默认30%）
    marginResult: '0.00',
    netProfit: '0.00', // 新增：实际净利
    isDetailed: false, // 是否开启专业模式
    marginDiscount: '', // 营销折扣
    includeVat: true, // 平台税 (VAT 7%)
    marginOtherFee: '', // 支付手续费/杂费
    units: ['公斤', '克', '件', '份'],
    costUnitIndex: 0,
    priceUnitIndex: 0,
    exchangeRate: 4.95, // 初始参考汇率
    thbVal: '',
    cnyVal: '',
    // 日历选择器数据
    showRangePicker: false,
    rangeStart: '',
    rangeEnd: '',
    calendarDays: [],
    displayRangeText: '请选择日期',
    isRangeMode: false // 是否为区间模式
  },

  onLoad: function() {
    const now = new Date();
    const dateStr = this.formatDate(now);
    this.setData({ 
      today: dateStr,
      selectedDate: dateStr,
      rangeStart: dateStr,
      rangeEnd: dateStr,
      displayRangeText: dateStr
    });
    this.initCalendar();
    this.refreshAll();
  },

  formatDate: function(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  },

  // 初始化日历数据（显示过去6个月到现在）
  initCalendar: function() {
    const days = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    const generateMonth = (year, month) => {
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();
      
      // 填充空白
      for (let i = 0; i < firstDay; i++) {
        days.push({ day: '', fullDate: '', empty: true });
      }
      
      // 填充日期
      for (let i = 1; i <= lastDate; i++) {
        const fullDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        days.push({ 
          day: i, 
          fullDate, 
          monthName: `${year}年${month + 1}月`,
          isMonthFirst: i === 1
        });
      }
    };

    // 生成从半年前到下个月的日历（共8个月）
    for (let i = -6; i <= 1; i++) {
      const date = new Date(currentYear, currentMonth + i, 1);
      generateMonth(date.getFullYear(), date.getMonth());
    }
    
    this.setData({ calendarDays: days });
  },

  openRangePicker: function() {
    this.setData({ showRangePicker: true });
  },

  closeRangePicker: function() {
    this.setData({ showRangePicker: false });
  },

  prevent: function() {}, // 阻止冒泡

  onDayClick: function(e) {
    const { date } = e.currentTarget.dataset;
    if (!date) return;

    let { rangeStart, rangeEnd } = this.data;

    if (!rangeStart || (rangeStart && rangeEnd)) {
      // 重新开始选择
      this.setData({ rangeStart: date, rangeEnd: '' });
    } else {
      // 选择结束日期
      if (new Date(date) < new Date(rangeStart)) {
        this.setData({ rangeStart: date, rangeEnd: rangeStart });
      } else {
        this.setData({ rangeEnd: date });
      }
    }
  },

  confirmRange: function() {
    const { rangeStart, rangeEnd } = this.data;
    if (!rangeStart) return;

    const finalEnd = rangeEnd || rangeStart;
    const isRange = rangeStart !== finalEnd;
    const text = !isRange ? rangeStart : `${rangeStart} 至 ${finalEnd}`;
    
    this.setData({
      selectedDate: rangeStart,
      displayRangeText: text,
      isRangeMode: isRange,
      showRangePicker: false
    }, () => {
      this.loadFinanceByRange(rangeStart, finalEnd);
    });
  },

  // 新增：按区间加载并汇总财务数据
  loadFinanceByRange: function(start, end) {
    wx.showLoading({ title: '汇总中...' });
    const db = wx.cloud.database();
    const _ = db.command;
    
    return db.collection('finance').where({
      date: _.gte(start).and(_.lte(end))
    }).get().then(res => {
      if (res.data.length === 0) {
        this.setData({
          cost: '', grab: '', lineman: '', shopee: '', wukong: '', totalIncome: 0, profit: 0,
          expenseList: [{ name: '', amount: '' }], remarks: ''
        });
        return;
      }

      // 如果是单日，直接显示
      if (start === end && res.data.length === 1) {
        const d = res.data[0];
        this.setData({
          cost: d.cost, grab: d.grab, lineman: d.lineman, shopee: d.shopee, wukong: d.wukong,
          remarks: d.remarks || '',
          expenseList: d.expenseList || [{ name: '支出', amount: d.cost, receipt: '' }]
        }, () => this.calculate());
      } else {
        // 如果是区间，进行汇总
        let tCost = 0, tGrab = 0, tLineman = 0, tShopee = 0, tWukong = 0;
        let tRemarks = [];
        let combinedExpenses = [];

        res.data.forEach(d => {
          tCost += parseFloat(d.cost) || 0;
          tGrab += parseFloat(d.grab) || 0;
          tLineman += parseFloat(d.lineman) || 0;
          tShopee += parseFloat(d.shopee) || 0;
          tWukong += parseFloat(d.wukong) || 0;
          if (d.remarks) tRemarks.push(`${d.date}: ${d.remarks}`);
          
          // 汇总所有支出明细
          const dayExpenses = d.expenseList || [{ name: '支出', amount: d.cost, receipt: '' }];
          dayExpenses.forEach(exp => {
            if (exp.amount) {
              combinedExpenses.push({ 
                name: `${d.date} ${exp.name}`, 
                amount: exp.amount,
                receipt: exp.receipt || ''
              });
            }
          });
        });
        
        this.setData({
          cost: tCost.toFixed(2),
          grab: tGrab.toFixed(2),
          lineman: tLineman.toFixed(2),
          shopee: tShopee.toFixed(2),
          wukong: tWukong.toFixed(2),
          expenseList: combinedExpenses,
          remarks: tRemarks.join('\n')
        }, () => this.calculate());
      }
    }).finally(() => {
      wx.hideLoading();
    });
  },

  onPullDownRefresh: function() {
    this.refreshAll().then(() => {
      wx.stopPullDownRefresh();
      wx.showToast({ title: '已更新' });
    });
  },

  onDateChange: function(e) {
    this.setData({ selectedDate: e.detail.value }, () => {
      this.refreshAll();
    });
  },

  refreshAll: function() {
    wx.showLoading({ title: '加载中...' });
    return Promise.all([
      this.fetchSummary(),
      this.loadFinanceByDate(),
      this.fetchRecentStats()
    ]).finally(() => {
      wx.hideLoading();
    });
  },

  fetchRecentStats: function() {
    const db = wx.cloud.database();
    const _ = db.command;
    const now = new Date();
    const days = [];
    for(let i=0; i<7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      days.push(`${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`);
    }

    return db.collection('finance').where({
      date: _.in(days)
    }).orderBy('date', 'desc').get().then(res => {
      this.setData({ recentStats: res.data });
    });
  },

  switchTab: function(e) {
    this.setData({ currentTab: e.currentTarget.dataset.tab });
  },

  // 快捷跳转日期
  jumpToDate: function(e) {
    const date = e.currentTarget.dataset.date;
    this.setData({ 
      selectedDate: date,
      displayRangeText: date,
      isRangeMode: false,
      rangeStart: date,
      rangeEnd: date
    }, () => {
      this.refreshAll();
    });
  },

  fetchSummary: function() {
    const db = wx.cloud.database();
    return db.collection('orders').where({
      date: this.data.selectedDate
    }).get().then(res => {
      const summaryMap = {};
      res.data.forEach(order => {
        order.items.forEach(item => {
          if (summaryMap[item.name]) {
            summaryMap[item.name].total += item.count;
          } else {
            summaryMap[item.name] = { name: item.name, total: item.count, unit: item.unit };
          }
        });
      });
      this.setData({ summary: Object.values(summaryMap) });
    });
  },

  copyToClipboard: function() {
    if (this.data.summary.length === 0) return;
    const text = this.data.summary.map(item => `${item.name}: ${item.total}${item.unit}`).join('\n');
    wx.setClipboardData({ data: `【${this.data.selectedDate} 采购清单】\n${text}` });
  },

  onInput: function(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [field]: e.detail.value }, () => this.calculate());
  },

  // 新增：处理支出列表输入
  onExpenseInput: function(e) {
    const { index, field } = e.currentTarget.dataset;
    const { value } = e.detail;
    const list = this.data.expenseList;
    list[index][field] = value;
    this.setData({ expenseList: list }, () => this.calculate());
  },

  // 新增：添加支出项
  addExpenseItem: function() {
    const list = this.data.expenseList;
    list.push({ name: '', amount: '', receipt: '' });
    this.setData({ expenseList: list });
  },

  // 新增：移除支出项
  removeExpenseItem: function(e) {
    const { index } = e.currentTarget.dataset;
    const list = this.data.expenseList;
    if (list.length <= 1) {
      list[0] = { name: '', amount: '', receipt: '' };
    } else {
      list.splice(index, 1);
    }
    this.setData({ expenseList: list }, () => this.calculate());
  },

  // 新增：上传收据
  uploadReceipt: function(e) {
    const { index } = e.currentTarget.dataset;
    const { selectedDate } = this.data;
    
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        wx.showLoading({ title: '压缩中...', mask: true });
        
        // 进一步压缩图片以提升上传速度
        wx.compressImage({
          src: tempFilePath,
          quality: 60, // 压缩质量设为 60%，收据清晰度足够且体积显著减小
          success: (compressRes) => {
            const filePath = compressRes.tempFilePath;
            wx.showLoading({ title: '上传中...', mask: true });
            
            const timestamp = Date.now();
            const fileName = `${selectedDate.replace(/-/g, '')}_${timestamp}.jpg`;
            const cloudPath = `receipts/${fileName}`;
            
            wx.cloud.uploadFile({
              cloudPath,
              filePath,
              success: uploadRes => {
                const list = this.data.expenseList;
                list[index].receipt = uploadRes.fileID;
                this.setData({ expenseList: list });
                wx.showToast({ title: '上传成功', icon: 'success' });
              },
              fail: err => {
                console.error('上传失败:', err);
                wx.showModal({ title: '上传失败', content: '网络较慢或存储已满，请重试', showCancel: false });
              },
              complete: () => {
                wx.hideLoading();
              }
            });
          },
          fail: (err) => {
            console.error('压缩失败:', err);
            // 压缩失败则尝试直接上传原图
            this.doActualUpload(tempFilePath, index, selectedDate);
          }
        });
      }
    });
  },

  // 提取上传逻辑
  doActualUpload: function(filePath, index, date) {
    wx.showLoading({ title: '上传中...', mask: true });
    const cloudPath = `receipts/${date.replace(/-/g, '')}_${Date.now()}.jpg`;
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        const list = this.data.expenseList;
        list[index].receipt = res.fileID;
        this.setData({ expenseList: list });
        wx.showToast({ title: '上传成功' });
      },
      fail: (err) => {
        wx.showModal({ title: '提示', content: '上传失败，请检查网络' });
      },
      complete: () => wx.hideLoading()
    });
  },

  // 新增：删除收据
  deleteReceipt: function(e) {
    const { index } = e.currentTarget.dataset;
    const list = this.data.expenseList;
    list[index].receipt = '';
    this.setData({ expenseList: list });
  },

  // 新增：预览图片
  previewImage: function(e) {
    const { url } = e.currentTarget.dataset;
    wx.previewImage({
      urls: [url],
      current: url
    });
  },

  calculate: function() {
    // 计算总支出
    let totalCost = 0;
    this.data.expenseList.forEach(item => {
      totalCost += parseFloat(item.amount) || 0;
    });

    const grab = parseFloat(this.data.grab) || 0;
    const lineman = parseFloat(this.data.lineman) || 0;
    const shopee = parseFloat(this.data.shopee) || 0;
    const wukong = parseFloat(this.data.wukong) || 0;
    const totalIncome = (grab + lineman + shopee + wukong).toFixed(2);
    const profit = (totalIncome - totalCost).toFixed(2);
    this.setData({ totalIncome, profit, cost: totalCost.toFixed(2) });
  },

  loadFinanceByDate: function() {
    const db = wx.cloud.database();
    this.setData({
      cost: '', grab: '', lineman: '', shopee: '', wukong: '', totalIncome: 0, profit: 0, remarks: '',
      expenseList: [{ name: '', amount: '', receipt: '' }]
    });
    return db.collection('finance').where({ date: this.data.selectedDate }).get().then(res => {
      if (res.data.length > 0) {
        const d = res.data[0];
        this.setData({
          cost: d.cost, grab: d.grab, lineman: d.lineman, shopee: d.shopee, wukong: d.wukong,
          remarks: d.remarks || '',
          expenseList: d.expenseList || [{ name: '支出', amount: d.cost, receipt: '' }]
        }, () => this.calculate());
      }
    });
  },

  // 工具箱逻辑
  toolInput: function(e) {
    const { type, field } = e.currentTarget.dataset;
    const val = e.detail.value;

    if (type === 'margin') {
      let fieldName = '';
      if (field === 'cost') fieldName = 'marginCost';
      if (field === 'price') fieldName = 'marginPrice';
      if (field === 'pkg') fieldName = 'marginPackaging';
      if (field === 'rate') fieldName = 'marginPlatformRate';
      if (field === 'disc') fieldName = 'marginDiscount';
      if (field === 'other') fieldName = 'marginOtherFee';
      
      this.setData({ [fieldName]: val }, () => this.calculateMargin());
    } else if (type === 'rate') {
      const rate = this.data.exchangeRate;
      if (field === 'thb') {
        const cny = val === '' ? '' : (parseFloat(val) / rate).toFixed(2);
        this.setData({ thbVal: val, cnyVal: cny });
      } else {
        const thb = val === '' ? '' : (parseFloat(val) * rate).toFixed(2);
        this.setData({ cnyVal: val, thbVal: thb });
      }
    }
  },

  toggleDetailed: function() {
    this.setData({ isDetailed: !this.data.isDetailed }, () => this.calculateMargin());
  },

  toggleVat: function() {
    this.setData({ includeVat: !this.data.includeVat }, () => this.calculateMargin());
  },

  onUnitChange: function(e) {
    const { field } = e.currentTarget.dataset;
    const index = parseInt(e.detail.value);
    if (field === 'cost') {
      this.setData({ costUnitIndex: index }, () => this.calculateMargin());
    } else {
      this.setData({ priceUnitIndex: index }, () => this.calculateMargin());
    }
  },

  calculateMargin: function() {
    let c = parseFloat(this.data.marginCost) || 0;
    let p = parseFloat(this.data.marginPrice) || 0;
    let pkg = parseFloat(this.data.marginPackaging) || 0;
    let rate = parseFloat(this.data.marginPlatformRate) || 0;
    let disc = parseFloat(this.data.marginDiscount) || 0;
    let other = parseFloat(this.data.marginOtherFee) || 0;
    
    // 1. 单位换算
    const costUnit = this.data.units[this.data.costUnitIndex];
    const priceUnit = this.data.units[this.data.priceUnitIndex];
    if (costUnit === '公斤' && priceUnit === '克') c = c / 1000;
    else if (costUnit === '克' && priceUnit === '公斤') c = c * 1000;

    // 2. 专业计算逻辑
    // 平台扣点通常含税 (GP * 1.07)
    const actualRate = rate * (this.data.includeVat ? 1.07 : 1);
    const platformFee = p * (actualRate / 100); 
    
    // 实际收入 = (标价 - 营销折扣) - 平台费 - 支付手续费
    const netRevenue = (p - disc) - platformFee - other;
    const profit = netRevenue - c - pkg; 
    
    let marginRes = '0.00';
    if (p > 0) {
      // 利润率通常以标价为基数，或者以实际成交价为基数。这里采用实际成交价(p-disc)更能反映真实经营
      const basePrice = (p - disc) > 0 ? (p - disc) : p;
      marginRes = ((profit / basePrice) * 100).toFixed(2);
    }
    
    this.setData({ 
      marginResult: marginRes,
      netProfit: profit.toFixed(2)
    });
  },

  saveFinance: function() {
    wx.showLoading({ title: '保存中...' });
    const db = wx.cloud.database();
    const { 
      cost, grab, lineman, shopee, wukong, selectedDate, totalIncome, profit, remarks, expenseList
    } = this.data;
    
    db.collection('finance').where({ date: selectedDate }).get().then(res => {
      const financeData = {
        date: selectedDate, cost, grab, lineman, shopee, wukong, totalIncome, profit, remarks, expenseList,
        updateTime: db.serverDate()
      };
      if (res.data.length > 0) {
        return db.collection('finance').doc(res.data[0]._id).update({ data: financeData });
      } else {
        return db.collection('finance').add({ data: financeData });
      }
    }).then(() => {
      wx.hideLoading();
      wx.showToast({ title: '账单已保存' });
    }).catch(err => {
      wx.hideLoading();
      wx.showModal({ title: '保存失败', content: '请确保已创建 finance 集合且权限为“所有用户可读写”' });
    });
  },

  logout: function() {
    wx.clearStorageSync();
    wx.reLaunch({ url: '/pages/login/login' });
  }
});