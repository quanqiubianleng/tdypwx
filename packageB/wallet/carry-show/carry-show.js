// packageB/wallet/carry-show/carry-show.js
const app = getApp();
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    money:100,
    display:'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  number:function(e){
    this.setData({
      number:e.detail.value
    })
  },
  // name:function(e){
  //   this.setData({
  //     WeChatname:e.detail.value
  //   })
  // },
  quanbu:function(){
    this.setData({
      number:this.data.money
    })
  },
  showtype:function(e){
    this.setData({
      index:e.currentTarget.dataset.opt,
    })
  },
  name:function(e){
    this.setData({
      name:e.detail.value
    }) 
  },
  account:function(e){
    this.setData({
      account:e.detail.value
    })
  },
  Nickname:function(e){
    this.setData({
      Nickname:e.detail.value
    })
  },
  uid:function(e){
    this.setData({
      uid:e.detail.value
    })
  },

  Submit:function(e){
    let that = this;
    if(!that.data.number){
      app.msg("提现金额不能为空");
      return;
    }
    if(that.data.number>that.data.money){
      app.msg("提现金额不能大于余额");
      return;
    }
    if(that.data.number<1){
      app.msg("提现金额不能小于1");
      return;
    }
    let type= that.data.index;
    if(!type){
      app.msg("请选择提现方式");
      return;
    }else{
      if(type==1){
        if(!that.data.name){
          app.msg("请输入姓名");
          return;
        }
        if(!that.data.uid){
          app.msg("请输入身份证");
          return;
        }
        var pattsss = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!pattsss.test(that.data.uid)) {
          app.msg("请输入有效的身份证号");
          return;
        }
        wx.login({
          success (res) {
            if (res.code) {
              let data={
                code:res.code,
                money:that.data.number,
                username:that.data.name,
                uid:that.data.uid,
                type:type
              }
              let rendata = app.requestfun(data, '/Api/Advances/Getmoney',true);    
              rendata.then((v) => {
                if(v.data.status==1){
                  that.setData({
                    display:'block'
                  })
                }
              }) 
            } else {
              app.msg("网络连接失败,请稍后重试");
              return;
            }
          }
        })
      }
      if(type==2){
        if(!that.data.name){
          app.msg("请输入姓名");
          return;
        }
        if(!that.data.account){
          app.msg("请输入支付宝账号");
          return;
        }
        if(!that.data.uid){
          app.msg("请输入身份证");
          return;
        }
        var pattsss = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!pattsss.test(that.data.uid)) {
          app.msg("请输入有效的身份证号");
          return;
        }
        wx.login({
          success (res) {
            if (res.code) {
              let data={
                code:res.code,
                money:that.data.number,
                username:that.data.name,
                type:type,
                uid:that.data.uid,
                alipay:that.data.account

              }
              let rendata = app.requestfun(data, '/Api/Advances/Getmoney',true);    
              rendata.then((v) => {
                if(v.data.status==1){
                  that.setData({
                    display:'block'
                  })
                }
              }) 
            } else {
              app.msg("网络连接失败,请稍后重试");
              return;
            }
          }
        })
      }
      if(type==3){
        if(!that.data.name){
          app.msg("请输入开户人姓名");
          return;
        }
        if(!that.data.Nickname){
          app.msg("请输入开户银行名称");
          return;
        }
        if(!that.data.account){
          app.msg("请输入开户银行账号");
          return;
        }
        if(!that.data.uid){
          app.msg("请输入身份证");
          return;
        }
        var pattsss = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!pattsss.test(that.data.uid)) {
          app.msg("请输入有效的身份证号");
          return;
        }
        wx.login({
          success (res) {
            if (res.code) {
              let data={
                code:res.code,
                money:that.data.number,
                username:that.data.name,
                type:type,
                uid:that.data.uid,
                bank:that.data.account,
                nickname:that.data.Nickname

              }
              let rendata = app.requestfun(data, '/Api/Advances/Getmoney',true);    
              rendata.then((v) => {
                 if(v.data.status==1){
                  that.setData({
                    display:'block'
                  })
                 }
              }) 
            } else {
              app.msg("网络连接失败,请稍后重试");
              return;
            }
          }
        })
      }
    }
  },
  hideviews:function(e){
    wx.navigateTo({
      url: '/packageB/wallet/index/index',
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