// pages/tes/tes.js
var wsApi = "wss://tdyp1.tiandainfo.com:9501";
var socketOpen=false;
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
//建立连接
wx.connectSocket({
  url: wsApi,
  header: {
   'content-type': 'application/json'
  },
  // //method:"GET",
  // protocols: ['protocol1'],
  success: function () {
   console.log("客户端连接成功！");
   wx.onSocketOpen(function(){
    console.log('webSocket已打开！');
    socketOpen=true;
    wx.onSocketMessage(function(msg){
    })
   })
  }
 })
  },
  Message:function(e){
    var msg=e.detail.value;
    this.setData({
      msg:msg
    })
  },
  sendMessage:function(e)
  {
   var msg=this.data.msg;
    if (socketOpen) {
     //向服务器发送消息
     wx.sendSocketMessage({
      data: msg,
     })
     
     this.setData({
       msg:''
     })
   }
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