
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
        updateCategory(1, data.data.msg_count+'')
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
    // 与部门的聊天记录
    case 'setion':
      console.log('公共方法，与部门的聊天记录')
      
      that.globalData.msg_count = that.globalData.msg_count + 1
      updateCategory(1, that.globalData.msg_count+'')
      msgTips(data, that)
      break;
  }
}

// 消息提醒
function msgTips(data, that){
  playVoice()
  if(data.type == "kefu"){
    let arr = {
      type: 'kefu',
      j_id: 0,
      title: '咨询',
    }
    // 判断是否应该解除绑定的客服UID
    if(unBindTime(that)){
      // 解除绑定的客服UID
      updateBindUid(that, 0)
    }else{
      arr.j_id = that.globalData.kefuUid ? that.globalData.kefuUid : 0
    }
    var url = '/pages/advice/advice?data='+ JSON.stringify(arr)
  }else if(data.type == "setion"){
    var url = '/pages/jurisdiction/setion/index'
  }
  wx.showModal({
    title: '提示',
    content: '您有新的消息，是否前往查看！',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        wx.navigateTo({
          url: url,
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
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

// 播放消息提示音
function playVoice(){
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true
  innerAudioContext.src = 'https://tdyp1.tiandainfo.com/13637.wav'
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })

  // 震动
  wx.vibrateLong({
    success:function(){
      console.log("vibrate success");
    },
    fail:function(){
      console.log("vibrate fail");
    }
  })
}


// 验证手机号码
function checkMobile(mobile){
  if (!(/^1[34578]\d{9}$/.test(mobile))) {
    wx.showToast({
      title: '手机号码有误',
      duration: 2000,
      icon:'none'
    });
    return false;
  }
}

// 更新聊天绑定时间戳
function updateBindTime(that){
  that.globalData.kefuChatTimer = Date.parse(new Date());
}

// 更新聊天绑定客服UID
function updateBindUid(that, kefuUid){
  that.globalData.kefuUid = kefuUid;
}

// 判断是否应该解除
function unBindTime(that){
  if((that.globalData.kefuChatTimer * 1 + (that.globalData.UnsetChatTimer * 60 * 1000)) > Date.parse(new Date())){
    // 不需要解除绑定
    return false;
  }else{
    return true;
  }
}


module.exports = {
  getStorages: getStorages,
  getTimer: getTimer,
  updateGlobalVariable: updateGlobalVariable,
  getMsg: getMsg,
  updateCategory: updateCategory,
  showTime: showTime,
  descArr: descArr,
  playVoice: playVoice,
  checkMobile: checkMobile,
  updateBindTime: updateBindTime,
  unBindTime: unBindTime,
  updateBindUid: updateBindUid,
  msgTips: msgTips
}
