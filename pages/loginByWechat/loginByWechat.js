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
    let type  =this.data.type;
    let code = await new Promise((resolve) => {
      wx.login({ 
        success: (res) => { 
          if (res.code) resolve(res.code) } })
    });
    code = await new Promise((resolve) => {
      wx.login({ success: (res) => { if (res.code) resolve(res.code) } })
    });
    wx.showLoading({ title: "登录中" })
    let iv = e.detail.iv;
    let encryptedData = e.detail.encryptedData;
    var datad = {
      iv: iv,
      encryptedData: encryptedData,
      code: code
    };
    let rendata = app.requestfun(datad, '/Api/login/GetPhoneNumber'); 
    rendata.then((v)=>{ 
       if(v.data.passdata!=''){
    
        wx.login({
          success (res) {
            let data ={
              code:res.code,
              passdata:v.data.passdata
            }
            let rendata = app.requestfun(data, '/Api/login/login'); 
            rendata.then((v)=>{
              if(v.data.status==1){
                // app.globalData.token = v.data.data.token;
                wx.setStorageSync('token', v.data.data.token);
                wx.setStorageSync('userinfo', v.data.data);
                wx.showToast({ icon: "none", title: '成功' });
               
                if(type==1){
                  wx.switchTab({
                    url: '/pages/personal/personal',
                  })
                }else{
                  wx.navigateBack({
                    data:-1
                  })
                }
                
              }else{
                app.msg("登陆失败，请重试");
              }
              // if (v.data.token){
              //   if(v.data.roleno){//没有分配权限
              //     wx.setStorageSync('message', 0);
              //     wx.navigateTo({ url: '/pages/rolemsg/rolemsg' });              
              //   }else{
                  
              //   }               
              // }
             /* else{
                wx.showToast({ icon: "none", title: '网络错误,请重新登录！' });
                //this.setData({ check: 0 });
                wx.navigateTo({ url: '/pages/loginByWechat/loginByWechat' });
              }*/        
            })
          }
        })
          
       }     
    })
  },
    
  onLoad: function (options) {
    let type = options.type;
    let code =  new Promise((resolve) => {
      wx.login({ success: (res) => { if (res.code) resolve(res.code) } })
    });
    this.setData({
      type:type
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
