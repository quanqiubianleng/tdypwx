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
    type: ['请选择','生活借支','住宿借支','工资借支'],
    show: false,
    index: 1,
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

  //借支人
  name:function(e){
    this.setData({
      username:e.detail
    })
  },
  //电话
  tel:function(e){
    this.setData({
      tel:e.detail
    })
  },
  // 选择类型
  choose: function (){
    console.log('111')
    this.setData({
      show: true,
    })
  },
  //金额
  money:function(e){
    this.setData({
      money:e.detail
    })
  },
  //说明
  info:function(e){
    this.setData({
      info:e.detail
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
    var patts = /^\d{11}$/g;
    if(!patts.test(this.data.tel)){
      app.msg('请输入正确的手机号')
      return false
    }
    if(!this.data.money || this.data.money <= 0){
      app.msg('金额不能为空或者不能小于0')
      return false
    }
    if(!this.data.index||this.data.index<1){
      app.msg("请选择借支类型");
      return;
    }
    if(!this.data.info){
      app.msg('说明不能为空')
      return false
    }
    let data = {
      moneytype:this.data.index,
      money:this.data.money,
      info:this.data.info,
      username:this.data.username,
      tel:this.data.tel
    }
    let rendata = app.requestfun(data, '/Api/Borrowing/addBorrowing',true); 
       rendata.then((v) => {
          app.msg("提交成功");
          if(v.data.status==1){
            setTimeout(function() {
              wx.navigateBack();
             }, 1000);
          }else{
            wx.showToast({ icon: "none", title: v.data.message });
          }
       })
  }
})