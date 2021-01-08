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
    new_type: 'kefu',
    msgList: [],// 消息记录
    j_id: 0,// 接收id
    msg: '',
    page: 1,
    d_headimgurl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var data = JSON.parse(options.data)
    var self = this
    console.log(app.globalData.userInfo)
    this.setData({
      //msgList: self.forData(),
      uid: 'user_' + app.globalData.userInfo.id,
      user_info: app.globalData.userInfo,
      j_id: data.j_id,
      new_type: data.type,
      d_headimgurl: data.headimgurl,
    })
    self.getMsgRecord(data);
    // 改变页面标题
    wx.setNavigationBarTitle({
      title: data.title 
    })
    this.receiveMsg();
  },

  // 获取消息记录
  getMsgRecord: function(data){
    let f_msg = {
      type: 'getMsgRecord',
      params: {
        type: data.type,
        f_id: 'user_' + app.globalData.userInfo.id,
        j_id: data.j_id,
        mtype: this.data.new_type,
        page: this.data.page,
      }
    }
    app.sendSocketMessage(f_msg);
  },

  // 接收消息
  receiveMsg: function(){
    var self = this
    wx.onSocketMessage((res) => {
      let data = JSON.parse(res.data);
      console.log('接收消息')
      console.log(data)
      if (data.type == "kefu") {
        // 赋值给全局消息变量
        var arr = app.globalData.user_kefu_msg
        arr.unshift(data)
        app.globalData.user_kefu_msg = arr
        // 赋值给页面变量
        let arr2 = self.data.msgList
        console.log(self.data.msgList)
        data.create_time = chat.showTime(data.create_time)
        arr2.push(data)
        self.setData({
          msgList: arr2,
          d_headimgurl: data.d_headimgurl
        })
        
      }else if(data.type == "getMsgRecord"){
        var arr = data.data.data;
        if(arr.length > 0){
          var arr2 = [];
          arr.forEach((item, index)=>{
            item.create_time = chat.showTime(item.create_time)
            arr2[arr.length-index-1] = item
          })
          self.setData({
            msgList: arr2
          })
        }
      }else if(data.type == "setion"){
        data.create_time = chat.showTime(data.create_time)
        let arr2 = self.data.msgList
        arr2.push(data)
        self.setData({
          msgList: arr2
        })
      }
      self.scrollPage()
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
      type: this.data.new_type,
      f_id: 'user_' + app.globalData.userInfo.id,
      j_id: this.data.j_id,
      msg_type: '1',
      content: this.data.msg,
      mtype: this.data.new_type,
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
          self.setData({
            msg: app.globalData.imgUrl + imgurl,
            type: 'img',
          })
          self.sendMessage()
          self.receiveMsg()
        });
      }
    })
  },

  // 页面滚动
  scrollPage: function (){
    setTimeout(function() {
      wx.createSelectorQuery().select('.cu-chat').boundingClientRect(function (rect) {
        console.log(rect)
        if(rect != null){
          // 使页面滚动到底部
          wx.pageScrollTo({
            scrollTop: rect.bottom  + 5000
          })
        }
      }).exec()
    }, 500);
    
  },

  // 预览图片
  previewImg(e){
    console.log(e)

    var str = [];
    str.push(e.currentTarget.dataset.img)
    wx.previewImage({
      urls: str // 需要预览的图片http链接列表
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
    this.scrollPage()
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