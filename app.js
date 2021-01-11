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

App({
  d: {
    hostUrl: 'https://www.tdyp520.com/index.php',
  },  
  globalData:{
    imgUrl: 'https://www.tdyp520.com',
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
    jop_msg: [], // 工作通知未读条数
    jop_notice: 0, // 工作通知总未读条数
    section_notice: 0, // 部门通知总未读条数
    section_msg: [], // 部门消息
    friend_msg: [], // 好友消息
    msg_count: [],// 总未读消息
    user_kefu_msg: [],// 用户与客服聊天记录
    lockReconnect: false,// webocket连接状态
    limit: 0,// websocket重连次数
  },  
  onLaunch:function(){
    //判断是否有新版本
    // if (wx.canIUse('getUpdateManager')) {
    //   const updateManager = wx.getUpdateManager()
    //   updateManager.onCheckForUpdate(function (res) {
    //     if (res.hasUpdate) {
    //       updateManager.onUpdateReady(function () {
    //         wx.showModal({
    //           title: '更新提示',
    //           content: '新版本已经准备好，是否重启应用？',
    //           success: function (res) {
    //             if (res.confirm) {
    //               updateManager.applyUpdate()
    //             }
    //           }
    //         })
    //       })
    //       updateManager.onUpdateFailed(function () {
    //         wx.showModal({
    //           title: '已经有新版本了哟~',
    //           content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
    //         })
    //       })
    //     }
    //   })
    // } else {
    //   wx.showModal({
    //     title: '提示',
    //     content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    //   })
    // }
  },
  //网络请求
  async requestfun(data, url,type=false){
    if (!data) {
      datas = {};
    }
    data.token = wx.getStorageSync('token');
    if(type==true&&! this.globalData.isLogin){
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
  //navigateTo跳转
  async navigateTo(url,isLogin,data){
    //判断是否要登录
    if(isLogin){
      if(!wx.getStorageSync('userinfo')){
        wx.navigateTo({
          url: '/pages/loginByWechat/loginByWechat',
        })
        return;
      }else{
        wx.navigateTo({
          url: url +'?'+'data='+ JSON.stringify(data)
        })
      }
      
    }
  },
  //判断是否有jurisdiction
  jurisdiction :function(data){
    let jurisdiction= wx.getStorageSync('userinfo').jurisdiction;
    let show  =[];
    let pro = new Promise((resolve, reject) => {
       for (let index = 0; index < data.length; index++) {
         if(jurisdiction.length>0){
           if(jurisdiction.indexOf(JSON.stringify(data[index]))>=0){
            show[index]=1;
           }else{
            show[index]=0;
           }
         }else{
          show[index]=0;
         } 
       }
      resolve(show);
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
            header: {
              'content-type': 'multipart/form-data'
            },
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
      this.globalData.userInfo = chat.getStorages('userinfo');
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
      console.log(11111)
      // 不同类型的消息
      chat.getMsg(res.data,that)
    })
    wx.onSocketOpen(() => {
      console.log('WebSocket连接打开')
      that.globalData.lockReconnect = true
      that.bindUserId()
    })
    wx.onSocketError((res) => {
      console.log('WebSocket连接打开失败')
      that.reconnect()
    })
    wx.onSocketClose((res) => {
      console.log('WebSocket 已关闭！')
      that.globalData.lockReconnect = false
      that.reconnect()
    })
  },
	//重新连接
  reconnect() {
    var that = this;
    if (that.lockReconnect) return;
    // that.lockReconnect = true;
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
      id: 'user_' + that.globalData.userInfo.id,
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
          return 1;
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