// 查询指定日期或日期区间的财务数据
// 云函数拥有管理员权限，可跨用户读取
exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  const { start, end } = event;

  const res = await db.collection('finance')
    .where({ date: _.gte(start).and(_.lte(end)) })
    .orderBy('date', 'asc')
    .get();

  return { success: true, data: res.data };
};
