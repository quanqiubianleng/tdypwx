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
    navlist:[]
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
              var notification = v.data.notification;
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
  //跳转到厂入职
  entry:function(){
    wx.navigateTo({
      url: '/pages/entry/index/index',
    })
  },
   //跳转转厂设置
  turnfactory:function(){
    wx.navigateTo({
      url: '/pages/turn-factory/index/index',
    })
  },
    //跳转新增客户
    additions:function(){
      wx.navigateTo({
        url: '/pages/additions/index/index',
      })
    },
  //跳转客户资源
  client:function(){
    wx.navigateTo({
      url: '/pages/client/index/index',
    })
  },
  //跳转修改信息
  modify:function(){
    wx.navigateTo({
      url: '/pages/modify/index/index',
    })
  },
  //跳转邀约记录
  invitation:function(){
    wx.navigateTo({
      url: '/pages/invitation/index/index',
    })
  },
  //跳转面试记录
  facerecord:function(){
    wx.navigateTo({
      url: '/pages/face-record/index/index',
    })
  },
  //跳转借支申请
  advance:function(){
    wx.navigateTo({
      url: '/pages/advance/advance',
    })
  },
  //跳转借支审批
  approver:function(){
    wx.navigateTo({
      url: '/pages/approver/approver',
    })
  },
  //跳转打卡
  clock:function(){
    wx.navigateTo({
      url: '/pages/clock/index/index',
    })
  },
  //跳转面试登记
  interview:function(){
    wx.navigateTo({
      url: '/pages/interview/index',
    })
  },
  //跳转找工作
  hunting:function(){
    wx.navigateTo({
      url: '/pages/job-hunting/index/index',
    })
  },
  onLoad: function () {
    let that = this;
    that.getDynamicData(); 

 
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
   
    that.getDynamicData(); 
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
