// pages/clock/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    already:1,
    display:'',
    show:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showview: function() { 
    if(this.data.already==1){
      this.setData({
        display: "block",
        show:1,
      })
    }
    if(this.data.already==2){
      this.setData({
        display: "block",
        show:2,
      })
    }
  },
  hideview: function() {
    this.setData({
      display: "none",
      show:0
    })
  },
  //跳转详情
  details:function(){
    wx.navigateTo({
      url: '/pages/clock/details/details',
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