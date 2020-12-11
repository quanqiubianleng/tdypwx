//app.js
const mapkey = 'JJPBZ-DXYYS-AT3OH-6AJSG-ZCP22-ECFYS';
const QQMapWX = require('/utils/qqmap-wx-jssdk.min.js')
const chat = require('/utils/chat.js')
const showMsg = (data) => {
  wx.showToast({
    title: data,
    icon: 'none'
  });
}
// const userinfo = (key) => {
//   let userinfo = wx.getStorageSync('userinfo');
//   if (!userinfo) {
//     return "";
//   }
//   if (key) {
//     return userinfo[key];
//   } 
//   return userinfo;
// }
App({
  d: {
    hostUrl: 'https://www.tdyp520.com/index.php',
  },  
  globalData:{
    userInfo:null,
    isLogin: false,
    menu: null,
    banner: null,
    jobs: null,
    token: null,
    ipw: 'wss://tdyp1.tiandainfo.com:9501',
    socketOpen: false,
    kefuChatTimer: 0, // 客服和用户绑定聊天时间，绑定之后的最后一次发消息或收消息的时间戳
    UnsetChatTimer: 30,// 分钟，客服和用户接触绑定聊天，过多长时间解除绑定，之后用户再连接客服聊天就进入用户池，可以被任何客服接待
    kefuUid: null, // 客服UID
    jopNotice: [], // 工作通知未读条数
    jop_msg: [], // 部门消息
    friend_msg: [], // 好友消息
    msg_count: [],// 总未读消息
  },  
  //网络请求
  async requestfun(data, url,type=false){
    //  var tokens= wx.getStorageSync('userinfo');//token
    // console.log(tokens)
      // var token = userinfo("token") ? userinfo("token") : '';
    
    if (!data) {
      datas = {};
    }
    data.token = wx.getStorageSync('token');
    if(type==true&&!data.token){
      wx.navigateTo({
        url: "/pages/loginByWechat/loginByWechat"
      });
      return;
    }
    data.posttype = "wxtype"; 
    let pro = new Promise((resolve, reject) => {
      wx.request({
            url: this.d.hostUrl + url,
            method: 'post',
            data: data,
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
        success: (res) => {
          if (res.statusCode == 200) {
            if(res.data.status==0){
            // setTimeout(function() {
            //   wx.showToast({
            //     title: res.data.message,
            //     icon: 'none'
            //   });
            // }, 500);
            resolve(res);
            }
            if(res.data.status==1){
            resolve(res);
            }
          }
          if (res.statusCode == 401) {
            wx.navigateTo({
              url: "/pages/loginByWechat/loginByWechat"
            });
          }
          if (res.statusCode == 500) {
            setTimeout(function() {
              showMsg('系统错误');
            }, 500);
          }
        },
        fail: (res) => {
          if (res.message) {
            wx.hideLoading();
          }
          setTimeout(function() {
            showMsg('网络请求失败');
          }, 500);
          reject();
        }
      });
    });
    return pro;
  },



  //图片上传
  async uploadFile(data){
    if (!data) {
      datas = {};
    }
    let pro = new Promise((resolve, reject) => {
      wx.uploadFile({
            url: this.d.hostUrl + '/api/Upload/images',
            filePath: data,
            name: 'file',
        success: (res) => {
          if(res.data){
            resolve(res);
          }
        },
        fail: (res) => {
          if (res.message) {
            wx.hideLoading();
          }
          setTimeout(function() {
            showMsg('网络请求失败');
          }, 500);
          reject();
        }
      });
    });
    return pro;
  },
  
  msg: function(data) {
    showMsg(data);
  },

  //图片下载 
  saveImg: function(imgSrc) {
    wx.showLoading({
      title: '下载中，请稍等。。',
      mask:true
    });
    wx.downloadFile({
      url: imgSrc,
      success: function(file) {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  wx.saveImageToPhotosAlbum({
                    filePath: file.tempFilePath,
                    success() {
                      showMsg("保存成功");
                      wx.hideLoading();
                    }
                  });
                }
              })
            } else {
              wx.saveImageToPhotosAlbum({
                filePath: file.tempFilePath,
                success() {
                  showMsg("保存成功");
                  wx.hideLoading();
                }
              });
            }
          }
        });
      }
    });
  },



  onShow: function() {
    if(chat.getStorages('isLogin')){
      this.globalData.isLogin = true;
      this.globalData.socketOpen = true;
      this.linkSocket()
    }
 	},

	//建立websocket连接
  linkSocket() {
    var that = this
    wx.connectSocket({
      url: that.globalData.ipw,
      success() {
          that.initEventHandle()
      }
    })
  },

	//绑定事件
  initEventHandle() {
    var that = this
    wx.onSocketMessage((res) => {
      if (res.data == "pong") {
        that.reset()
        that.start()
      } else {
        //that.globalData.callback(res)
        // 不同类型的消息

      }
    })
    wx.onSocketOpen(() => {
      console.log('WebSocket连接打开')
      //that.reset()
      //that.start()
      that.bindUserId()
    })
    wx.onSocketError((res) => {
      console.log('WebSocket连接打开失败')
      that.reconnect()
    })
    wx.onSocketClose((res) => {
      console.log('WebSocket 已关闭！')
      that.reconnect()
    })
  },

	//重新连接
  reconnect() {
    var that = this;
    if (that.lockReconnect) return;
    that.lockReconnect = true;
    clearTimeout(that.timer)
    if (that.globalData.limit < 10) {//连接10次后不再重新连接
      that.timer = setTimeout(() => {
        that.linkSocket();
        that.lockReconnect = false;
        console.log("次数:" + that.globalData.limit)
      }, 5000);//每隔5秒连接一次
      that.globalData.limit = that.globalData.limit + 1
    }
  },

  // 连接绑定会员ID
  bindUserId(){
    var that = this;
    var data = {
      type: 'bind',
      group: 'user', 
      m_type: 'user',
      id: 'user_10001289',
    }
    that.sendSocketMessage(data);
    that.globalData.socketOpen = true;
  },

  // 发送数据
  sendSocketMessage: function(data){
    console.log(data)
    console.log(this.globalData.socketOpen)
    if(this.globalData.socketOpen){
      wx.sendSocketMessage({
        data: JSON.stringify(data),
        success: function(ult){
          console.log(ult)
        }
      });
    }else{
      this.reconnect()
    }
  },

	//心跳包开始
  reset: function () {
    var that = this;
    clearTimeout(that.globalData.timeoutObj);
    clearTimeout(that.globalData.serverTimeoutObj);
    return that;
  },
})