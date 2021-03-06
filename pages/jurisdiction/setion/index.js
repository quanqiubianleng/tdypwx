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
    p_id: 0,
    title: '贵州天大高科信息技术有限公司',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      msg_list: app.globalData.section_msg,
      p_id: Object.keys(options).length > 0 ? options.p_id : 0,
      title: Object.keys(options).length > 0 ? options.title : '贵州天大高科信息技术有限公司',
    })
    wx.setNavigationBarTitle({
      title: that.data.title 
    })
    that.getGroupList()
  },
  // 获取群组列表
  getGroupList(){
    console.log(this.data.p_id)
    let arr = {
      p_id: this.data.p_id,
    };
    let rendata = app.requestfun(arr, '/Api/org/groupList',false); 
    let that = this   
    rendata.then((v) => {
      if(v.data.status){
        // let arr = v.data.data.map(function(v){
        //   v.create_time = chat.showTime(v.create_time*1000)
        //   return v;
        // })
        that.setData({
          list: v.data.data.org,
          user: v.data.data.user
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
    let admin_info = e.currentTarget.dataset.item
    let arr = {
      type: 'group',
      j_id: '0',
      title: admin_info.title,
      headimgurl: admin_info.headimgurl,
      group_id: admin_info.group_id,
    }
    wx.navigateTo({
      url: '/pages/advice/advice?data='+ JSON.stringify(arr),
    })
  },
  // 添加群聊
  addGroup: function (){
    wx.navigateTo({
      url: '/pages/jurisdiction/setion/add?p_id='+this.data.p_id+'&title='+this.data.title,
    })
  },

  // 进入分组
  enterGroup: function (item){
    wx.navigateTo({
      url: '/pages/jurisdiction/setion/index?p_id='+item.currentTarget.dataset.item.id+'&title='+item.currentTarget.dataset.item.name,
    })
  },

  // 进入成员
  userDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/jurisdiction/setion/means?uid='+e.currentTarget.dataset.item.uid,
    })
  },

  // 添加分组
  addOrg: function (){
    wx.navigateTo({
      url: '/pages/jurisdiction/setion/addOrg?p_id='+this.data.p_id,
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