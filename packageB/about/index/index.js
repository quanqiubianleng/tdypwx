// packageB/about/index/index.js
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    version:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let  accountInfo =  wx.getAccountInfoSync()
   let version = accountInfo.miniProgram.version;
   this.setData({
    version:version
   })
    
  },
  xieyi:function(e){
    wx.navigateTo({
      url: '/packageB/about/agreement/agreement',
    })
  },
  zhengce:function(e){
    wx.navigateTo({
      url: '/packageB/about/policy/policy',
    })
  },
  login:function(){
    let type = 1
    wx.navigateTo({
      url: '/pages/loginByWechat/loginByWechat?type='+type,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})