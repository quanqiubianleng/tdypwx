// pages/jurisdiction/setion/means.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: 0,
    user_data: {},
  },

  detail(e){
    wx.navigateTo({
      url: '/pages/jurisdiction/setion/detail?uid='+this.data.uid,
    })
  },

  // 获取会员详情
  init(){
    let that = this  
    let arr = {
      uid: that.data.uid,
    };
    let rendata = app.requestfun(arr, '/Api/org/userDetail',false); 
    rendata.then((v) => {
      if(v.data.status){
        that.setData({
          user_data: v.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.uid)
    this.setData({
      uid: options.uid
    })
    this.init()
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