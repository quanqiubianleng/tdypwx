// pages/clock/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // showlost:['出勤','请假','旷工'],
    show:false,
    currentTab:'1',
    idx:'5'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  show:function(){
    this.setData({
      show:true
    })
  },
  cancel:function(){
    this.setData({
      show:false
    })
  },
  confirm:function(e){
    let currentTab = this.data.currentTab;
   
    this.setData({
      show:false
    })
  },
  personal:function(e){
    wx.navigateTo({
      url: '/pages/clock/personal/personal',
    })
  },
  xuanzhong:function(e){
    let idx = e.currentTarget.dataset.current
    this.setData({
      currentTab:idx
     
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