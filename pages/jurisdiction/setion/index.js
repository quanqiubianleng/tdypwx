const chat = require("../../../utils/chat");

// pages/jurisdiction/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    msg_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getGroupList()
    that.setData({
      msg_list: app.globalData.section_msg,
    })
  },
  // 获取群组列表
  getGroupList(){
    let arr = {};
    let rendata = app.requestfun(arr, '/Api/group/groupList',false); 
    var that = this   
    rendata.then((v) => {
      app.msg(v.data.message)
      if(v.data.status){
        let arr = v.data.data.map(function(v){
          v.create_time = chat.showTime(v.create_time*1000)
          return v;
        })
        console.log(arr)
        that.setData({
          list: v.data.data
        })
      }
    })
  },
  Showdown:function(e){
    let index = e.currentTarget.dataset.id;
     if(this.data.list[index].down==0){
       let list = this.data.list;
           list[index].down="1";
        this.setData({
          list:list
        })
        return
     }
     if(this.data.list[index].down==1){
      let list = this.data.list;
           list[index].down="0";
        this.setData({
          list:list
        })
        return
     }
    
  },
  // 组织单聊聊天详情
  /* advice:function(e){
    console.log(e);
    let admin_info = e.currentTarget.dataset.item
    let arr = {
      type: 'setion',
      j_id: 'user_'+admin_info.userid,
      title: admin_info.username,
      headimgurl: admin_info.headimgurl,
    }
    wx.navigateTo({
      url: '/pages/advice/advice?data='+ JSON.stringify(arr),
    })
  }, */
  // 组织群聊聊天详情
  advice:function(e){
    console.log(e);
    let admin_info = e.currentTarget.dataset.item
    let arr = {
      type: 'group',
      j_id: '0',
      title: admin_info.title,
      headimgurl: admin_info.headimgurl,
    }
    wx.navigateTo({
      url: '/pages/advice/advice?data='+ JSON.stringify(arr),
    })
  },
  // 添加群聊
  addGroup: function (){
    wx.navigateTo({
      url: '/pages/jurisdiction/setion/add',
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