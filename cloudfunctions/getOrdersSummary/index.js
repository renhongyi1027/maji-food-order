// 查询指定日期的所有员工采购汇总
// 云函数拥有管理员权限，可跨用户读取数据
exports.main = async (event, context) => {
  const { date } = event;
  const db = cloud.database();

  const res = await db.collection('orders').where({ date }).get();

  // 合并同名食材数量
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

  return { success: true, data: Object.values(summaryMap) };
};
