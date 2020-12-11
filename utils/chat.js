
let app = getApp()

// 获取缓存
function getStorages(key) {
  try {
    var value = wx.getStorageSync(key)
    if (value) {
      return value;
    }
  } catch (e) {
    return null;
  }
  
}
// 获取时间戳,m：多少分钟之后的时间戳
function getTimer(m=0){
  var timestamp = Date.parse(new Date());  
  timestamp = timestamp / 1000;
  if(m>0){
    timestamp = timestamp + m*60;
  }
  return timestamp;
}
// 更改全局变量
function updateGlobalVariable(field, data){
  app.globalData[field] = data;
}


module.exports = {
  getStorages: getStorages,
  getTimer: getTimer,
  updateGlobalVariable: updateGlobalVariable,
}
