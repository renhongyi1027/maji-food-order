// 读取系统设置（汇率等）
exports.main = async (event, context) => {
  const db = cloud.database();
  const res = await db.collection('settings').where({ key: 'exchangeRate' }).get();
  if (res.data.length > 0) {
    return { success: true, data: res.data[0] };
  }
  return { success: true, data: { key: 'exchangeRate', value: 4.95 } };
};
