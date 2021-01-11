//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    check: 0,
    rdCode: null,
    code:null
  },
  // 用户协议勾选处理
  handleCheckBox(e) {
    this.setData({check: e.detail.value.length})
  },
  // 进行登录
  async bindgetphonenumber(e) {
    console.log(e);
    let that = this;
    let type  =that.data.type;
    wx.login({ 
      success: (res) => { 
        if (res.code) {
           wx.showLoading({ title: "登录中" })
          let iv = e.detail.iv;
          let encryptedData = e.detail.encryptedData;
          var datad = {
            iv: iv,
            encryptedData: encryptedData,
            code: res.code
          };
          let rendata = app.requestfun(datad, '/Api/login/GetPhoneNumber'); 
          rendata.then((v)=>{ 
             if(v.data.passdata!=''&&v.data.status==1){
              wx.login({
                success (res) {
                  wx.setStorageSync('passdata',v.data.passdata);
                  let data ={
                    code:res.code,
                    passdata:v.data.passdata
                  }
                  let rendata = app.requestfun(data, '/Api/login/login'); 
                  rendata.then((v)=>{
                    if(v.data.status==1){
                      // app.globalData.token = v.data.data.token;
                      let  arr=v.data.data
                      if(arr.jurisdiction&&arr.jurisdiction.length>0){
                        let arry =arr.jurisdiction.split(',');
                        arr.jurisdiction=arry
                      }
                      wx.setStorageSync('token', v.data.data.token);
                      wx.setStorageSync('userinfo', arr);
                      wx.setStorageSync('isLogin', true);
                    
                      wx.showToast({ icon: "none", title: '成功' });
                      app.globalData.isLogin = true
                      app.globalData.socketOpen = true
                      // 连接websocket
                      app.linkSocket()
                      if(type==1){
                        wx.switchTab({
                          url: '/pages/personal/personal',
                        })
                      }
                      if(type==2){
                        wx.switchTab({
                          url: '/pages/job-hunting/index/index',
                        })
                      }
                      if(type==3){
                        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                        let prevPage = pages[ pages.length - 2 ];  
                        prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                          type:1,
                        })
                        wx.navigateBack({
                          data:1
                        })
                      }
                      if(type==4){
                        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                        let prevPage = pages[ pages.length - 2 ];  
                        prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                          type:4,
                          userlevelid:that.data.userlevelid

                        })
                        wx.navigateBack({
                          data:1
                        })
                      }
                      else{
                        wx.navigateBack({
                          data:-1
                        })
                      }
                      
                    }else{
                      wx.showLoading({ title: v.data.message, icon: 'none' })
                    }       
                  })
                }
              })
                
             }else{
              wx.showLoading({ title: v.data.message, icon: 'none' })
             }     
          })
        }else{
          wx.showLoading({ title: "登录失败，请重试", icon: 'none' })
        }
      },
      fail:(res) => {
        wx.showLoading({ title: "登录失败，请重试", icon: 'none' })
      }
    })
  },
    
  onLoad: function (options) {
    let type = options.type;
    let userlevelid = options.userlevelid;
    console.log(type);
    console.log(userlevelid);
    let code =  new Promise((resolve) => {
      wx.login({ success: (res) => { if (res.code) resolve(res.code) } })
    });
    this.setData({
      type:type,
      userlevelid:userlevelid
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
