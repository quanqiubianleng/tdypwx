// pages/additions/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    date:'',
    show1: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['消费账户', '平台返利账户', '微信钱包'], //下拉列表的数据
    index: '', //选择的下拉列 表下标,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
   // 点击下拉显示框
   selectTap() {
    this.setData({
      show1: !this.data.show1,
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show1: !this.data.show1
    });
  },
  //跳转详情
  details:function(){
    wx.navigateTo({
      url: '/pages/additions/details/details',
    })
  },
  //新增客户
  add:function(){
    this.setData({
      show:true
    })
  },
  //取消新增客户
  cancel:function(){
    this.setData({
      show:false
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