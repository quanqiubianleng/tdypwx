// pages/advance/advancelist.js
const Util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  BorrowList:function(e){
    let data  = {
      page :this.data.page
    }
    let rendata = app.requestfun(data, '/Api/Borrowing/BorrowList',true); 
    rendata.then((v) => {
       if(v.data.status==1&&v.data.data){
         this.setData({
           list:this.data.list.concat(v.data.data)
         })
       }else{
         app.msg("已经到底了");
         return;
       }
    })
  },
  borrow:function(e){
    wx.navigateTo({
      url: '/pages/advance/advancedetail',
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
    this.setData({
      page:1
    })
    this.BorrowList();
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
    wx.showLoading({
      title: '玩命加载中',
      duration: 1000
    })
    this.setData({
      page:this.data.page+1
    })
    this.BorrowList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})