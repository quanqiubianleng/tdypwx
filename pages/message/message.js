// pages/message/index/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jop: 0,
    section: 0,
  },

  watch: {
    jop: function (val) {
      this.jop = app.globalData.jop_notice
    },
    section: function (val) {
      this.section = app.globalData.section_notice
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.setData({
      jop: parseInt(app.globalData.jop_notice),
      section: parseInt(app.globalData.section_notice),
    })
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