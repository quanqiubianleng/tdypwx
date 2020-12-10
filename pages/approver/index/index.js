// pages/approver/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:'0',
    swiper:{
      indicatorDots:true,
      indicatorColor:"rgba(255,255,255,.6)",
      indicatorActiveColor:"rgba(255,255,255)",
      autoplay:true,
    },
    cardList: [
      {
        name: 'aa',
        content: 'bb'
      }, {
        name: 'aa',
        content: 'bb'
      }, {
        name: 'aa',
        content: 'bb'
      }, {
        name: 'aa',
        content: 'bb'
      }, {
        name: 'aa',
        content: 'bb'
      }, {
        name: 'aa',
        content: 'bb'
      }, {
        name: 'aa',
        content: 'bb'
      }, {
        name: 'aa',
        content: 'bb'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  show:function(e){
    wx.navigateTo({
      url: '/pages/approver/details/approve',
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