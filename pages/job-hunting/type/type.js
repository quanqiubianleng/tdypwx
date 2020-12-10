// pages/job-hunting/type/type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags:[
      {
        tags: "包吃"
    },
    {
      tags: "包住"
    },
    {
      tags: "社保缴纳"
    }
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    if(type==1){
      wx.setNavigationBarTitle({title: '自由找'})
    }
    if(type==2){
      wx.setNavigationBarTitle({title: '拼高薪'})
    }
    if(type==3){
      wx.setNavigationBarTitle({title: '高奖励'})
    }
    this.setData({
      type:type
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