
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
 
  let data = JSON.parse(res)
  switch(data.type){
    case 'init':
       that.globalData.jop_msg = data.data.jop_msg
       that.globalData.jop_notice = data.data.jop_notice
       that.globalData.section_notice = data.data.section_notice
       that.globalData.section_msg = data.data.section_msg
       that.globalData.friend_msg = data.data.friend_msg
       that.globalData.msg_count = data.data.msg_count
       that.globalData.user_kefu_msg = data.data.user_kefu_msg.data
      // 更改导航数字角标
      if(data.data.msg_count > 0){
        updateCategory(1, data.data.msg_count)
      }
      break;
    case 'user':
        
      console.log(that.globalData.jopNotice)
      break;
    // 与客服的聊天记录
    case 'kefu':
      console.log('公共方法，与客服的聊天记录')
      var arr = that.globalData.user_kefu_msg
      arr.unshift(data)
      that.globalData.user_kefu_msg = arr
      break;
  }
}

// 颠倒数组
function descArr(arr){
  if(arr.length > 0){
    var data = [];
    arr.forEach((item,index)=>{
      data[arr.length-1-index] = item
    })
    console.log(data)
    return data;
  }else{
    return arr;
  }
}
// 实时显示时间
function showTime(time) {
	let date =	typeof time === "number" ? new Date(time) : new Date((time || "").replace(/-/g, "/"));
	let diff = (new Date().getTime() - date.getTime()) / 1000;
	let dayDiff = Math.floor(diff / 86400);

	let isValidDate =
		Object.prototype.toString.call(date) === "[object Date]" &&
		!isNaN(date.getTime());

	if (!isValidDate) {
		console.error("不是有效日期格式");
	}
	const formatDate = function(date) {
		let today = new Date(date);
		let year = today.getFullYear();
		let month = ("0" + (today.getMonth() + 1)).slice(-2);
		let day = ("0" + today.getDate()).slice(-2);
		let hour = today.getHours();
		let minute = today.getMinutes();
		let second = today.getSeconds();
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	};
	//小于0或者大于等于31显示原时间
	if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
		return "刚刚";//formatDate(date);
	}
	return (
		(dayDiff === 0 &&
		  ((diff < 60 && "刚刚") ||
			(diff < 120 && "1分钟前") ||
			(diff < 3600 && Math.floor(diff / 60) + "分钟前") ||
			(diff < 7200 && "1小时前") ||
			(diff < 86400 && Math.floor(diff / 3600) + "小时前"))) ||
		(dayDiff === 1 && "昨天") ||
		(dayDiff < 7 && dayDiff + "天前") ||
		(dayDiff < 31 && Math.ceil(dayDiff / 7) + "周前")
	);
}


module.exports = {
  getStorages: getStorages,
  getTimer: getTimer,
  updateGlobalVariable: updateGlobalVariable,
  getMsg: getMsg,
  updateCategory: updateCategory,
  showTime: showTime,
  descArr: descArr,
}
