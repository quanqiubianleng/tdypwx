// pages/tes/tes.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    uid: null,
    type: 'text',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
  },
  Message:function(e){
    var msg=e.detail.value;
    this.setData({
      msg:msg
    })
  },
  sendMessage:function()
  {
    var f_msg = {
      type: 'kefu',
      f_id: this.data.uid,
      j_id: 0,
      msg_type: '1',
      content: this.data.msg,
      mtype: 'kefu',
    }
    if(this.data.type == 'text'){
      f_msg.msg_type = '1'
    }else if(this.data.type == 'img'){
      f_msg.msg_type = '2'
    }else{
      f_msg.msg_type = '3'
    }
    app.sendSocketMessage(f_msg)
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
      uid: 'user_' + app.globalData.userInfo.id,
    })
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