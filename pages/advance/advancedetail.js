// pages/advance/advancedetail.js
const chat = require('../../utils/chat.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneytype: '',// 借支类型
    money: '',// 借支金额
    info: '',// 借支说明
    username: '',// 姓名
    tel: '',// 电话
    type: ['生活借支','住宿借支','工资借支'],
    show: false,
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  // 选择类型
  choose: function (){
    console.log('111')
    this.setData({
      show: true,
    })
  },
  // 关闭选择弹窗
  onClose: function (){
    this.setData({
      show: false,
    })
  },
  // 选择借支类型
  chooseType: function (e){
    console.log(e)
    let value = e.currentTarget.dataset.key
    let name = e.currentTarget.dataset.name
    this.setData({
      show: false,
      index: value,
      moneytype: name
    })
  },
  // 提交
  submit: function(){
    console.log(this.data.username)
    if(!this.data.username){
      app.msg('姓名不能为空')
      return false
    }
    if(!this.data.tel){
      app.msg('手机号不能为空')
      return false
    }
    chat.checkMobile(this.data.tel)
    if(!this.data.money || this.data.money <= 0 || typeof(this.data.money)!="number"){
      app.msg('金额不能为空或者不能小于0')
      return false
    }
    if(!this.data.info){
      app.msg('说明不能为空')
      return false
    }
  }
})