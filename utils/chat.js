
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

// 修改导航消息角标
function updateCategory(key, value){
  let number = value < 100 ? value : '99+'
  wx.setTabBarBadge({
    index: key,
    text: number
  })
}

// 获取消息
function getMsg(res,that){
  console.log(res)
  
  let data = JSON.parse(res)
  switch(data.type){
    case 'init':
       that.globalData.jop_msg = data.data.jop_msg
       that.globalData.jop_notice = data.data.jop_notice
       that.globalData.section_notice = data.data.section_notice
       that.globalData.section_msg = data.data.section_msg
       that.globalData.friend_msg = data.data.friend_msg
       that.globalData.msg_count = data.data.msg_count
      // 更改导航数字角标
      if(data.data.msg_count > 0){
        updateCategory(1, data.data.msg_count)
      }
      break;
    case 'user':
        
      console.log(that.globalData.jopNotice)
      break;
  }
}


module.exports = {
  getStorages: getStorages,
  getTimer: getTimer,
  updateGlobalVariable: updateGlobalVariable,
  getMsg: getMsg,
  updateCategory: updateCategory,
}
