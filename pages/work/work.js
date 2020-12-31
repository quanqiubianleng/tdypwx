//index.js
//获取应用实例
const app = getApp()
Page({
  data: { 
    notice: '',
    banner: null,
    swiper:{
      indicatorDots:true,
      indicatorColor:"rgba(255,255,255,.6)",
      indicatorActiveColor:"rgba(255,255,255)",
      autoplay:true,
    },
    navlist:[],
    userInfo:[]
  },
  // 首页动态数据逻辑处理
  getDynamicData() {
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          var datad = {
            code:res.code,
            position_id:5
          };
          let rendata = app.requestfun(datad, '/Api/business/index');    
          rendata.then((v) => {
              var banners = v.data.banner;
              var navlist = v.data.access;
              var notice = v.data.notification;
              that.setData({
                banner: banners,
                navlist:navlist,
                notice:notice
              });   
          }) 
        } else {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        }
      }
    })     
  }, 
  onLoad: function () {
    let that = this;
    that.getDynamicData(); 

 
  },
  url:function(e){
    let  userInfos= wx.getStorageSync('userinfo');
    let isLogin = app.globalData.isLogin; 
    if(!userInfos||!isLogin){
      wx.navigateTo({
        url: '/pages/loginByWechat/loginByWechat',
      })
      return;
    }else{
       let url = e.currentTarget.dataset.url;
      // console.log(url);
      // if(url=='/packageA/approval/index/index'){
      //   let jurisdiction = userInfos.jurisdiction[0];
      //   if(jurisdiction){
      //     wx.navigateTo({
      //       url: url,
      //     })
      //   }
      //   return;
      // }else{
       
      // }
      wx.navigateTo({
        url: url,
      })
      
    }
    console.log()
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.getDynamicData(); 
    if(!that.data.userInfo){
      var  userInfos= wx.getStorageSync('userinfo');
      console.log(userInfos)
      that.setData({
        userInfo: userInfos,
      }) 
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  }, 
  onPullDownRefresh: function () {
    // 3秒模拟数据加载
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 3000)
    this.getDynamicData();
  }
})
