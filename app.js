//app.js
const mapkey = 'JJPBZ-DXYYS-AT3OH-6AJSG-ZCP22-ECFYS';
const QQMapWX = require('/utils/qqmap-wx-jssdk.min.js')
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
  
  // onLaunch: function () { 
  //   //轮询未读消息数量
  //   setInterval(()=>{
  //     if(wx.getStorageSync('message')){
  //       var datad = {
  //       };
  //       let _this = this;
  //       let rendata = this.requestfun(datad, '/Api/Message/getMessageCount'); 
  //       rendata.then((v) => {
  //         var counts = v.data.count;
  //         wx.setStorageSync('messagecount', counts);
  //         console.log(v.data);              
  //       });
  //     }
  //   },6000)
  // },
  msg: function(data) {
    showMsg(data);
  },
  // setProp: function(target, prop, value, writable) {
  //   Object.defineProperty(target, prop, {
  //     configurable: true,
  //     enumerable: false,
  //     writable: !!writable,
  //     value: value
  //   });
  //   if(target){
  //     var syncProps = target.syncProps || {}
  //     syncProps[prop] = target[prop]
  //     target.syncProps = syncProps
  //   }
  //   return target
  // }
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
    }
})