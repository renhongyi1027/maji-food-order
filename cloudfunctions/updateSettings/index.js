// 更新系统设置（汇率等）
exports.main = async (event, context) => {
  const db = cloud.database();
  const { key, value } = event;

  const existing = await db.collection('settings').where({ key }).get();
  if (existing.data.length > 0) {
    await db.collection('settings').doc(existing.data[0]._id).update({
      data: { value, updateTime: db.serverDate() }
    });
  } else {
    await db.collection('settings').add({
      data: { key, value, updateTime: db.serverDate() }
    });
  }

  return { success: true };
};
