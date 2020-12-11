// pages/tes/tes.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  Message:function(e){
    var msg=e.detail.value;
    this.setData({
      msg:msg
    })
  },
  sendMessage:function(e)
  {
    var arr = {
      type: 'user',
      f_id: 'user_10001289',
      j_id: 'admin_283',
      msg_type: '1',
      content: this.data.msg,
      mtype: 'user',
    }
    app.sendSocketMessage(arr)
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
    socketOpen=false;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    socketOpen=false;
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