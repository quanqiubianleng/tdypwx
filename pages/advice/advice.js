// pages/tes/tes.js
const app = getApp()
const chat = require('../../utils/chat.js')
Page({

  /**
   * 页面的初始数据
   */

  data: {
    user_info: {},// 会员信息
    uid: null,
    type: 'text',
    msgList: [],// 消息记录
    msg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    console.log(app.globalData.userInfo)
    this.setData({
      msgList: self.forData(),
      uid: 'user_' + app.globalData.userInfo.id,
      user_info: app.globalData.userInfo,
    })
  },
  // 转换时间
  forData: function(){
    var msg = app.globalData.user_kefu_msg
    console.log(msg)
    msg.forEach(item => {
      if(isNaN(item.create_time)&&!isNaN(Date.parse(item.create_time))){
        item.create_time = chat.showTime(item.create_time)
      }
    });
    return chat.descArr(msg);
  },
  Message:function(e){
    var msg = e.detail.value;
    this.setData({
      msg:msg
    })
  },
  sendMessage:function()
  {
    var f_msg = {
      type: 'kefu',
      f_id: 'user_' + app.globalData.userInfo.id,
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
    app.sendSocketMessage(f_msg);
    this.setData({
      msg: '',
      type: 'text',
    })
  },

  // 发送图片
  sendImg: function(){
    var self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        var rendata = app.uploadFile(tempFilePaths[0]); 
        rendata.then((v) => {
          var imgurl = v.data
          imgurl = imgurl.split("\\").join("");
          console.log(imgurl)
          var index = imgurl.lastIndexOf('"data":"');
          var index2 = imgurl.lastIndexOf('"}');
          var img_url = imgurl.substring(index+8,index2);
          self.setData({
            msg: app.globalData.imgUrl + img_url,
            type: 'img',
          })
          self.sendMessage()
        });
      }
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
    wx.createSelectorQuery().select('.cu-chat').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
          scrollTop: rect.bottom
      })
    }).exec()
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

  },
  
})