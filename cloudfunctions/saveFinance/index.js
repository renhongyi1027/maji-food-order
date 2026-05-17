// 保存或更新指定日期的财务数据
// 云函数拥有管理员权限，可写入数据库
exports.main = async (event, context) => {
  const db = cloud.database();
  const { date, cost, grab, lineman, shopee, wukong, totalIncome, profit, remarks, expenseList } = event;

  // 查是否已有该日记录
  const existing = await db.collection('finance').where({ date }).get();

  const financeData = {
    date, cost, grab, lineman, shopee, wukong, totalIncome, profit, remarks, expenseList,
    updateTime: db.serverDate()
  };

  if (existing.data.length > 0) {
    await db.collection('finance').doc(existing.data[0]._id).update({ data: financeData });
  } else {
    await db.collection('finance').add({ data: financeData });
  }

  return { success: true };
};
