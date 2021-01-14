// pages/jurisdiction/setion/add.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
  },
  onChange: function(e){
    console.log(e)
    this.setData({
      title: e.detail,
    })
  },
  // 提交
  addGroup: function (){
    console.log(this.data.title)
    if(!(this.data.title)){
      app.msg('群聊名称不能为空！');
      return false;
    }
    let arr = {
      title: this.data.title
    }
    let rendata = app.requestfun(arr, '/Api/group/addGroup',false);    
    rendata.then((v) => {
      app.msg(v.data.message)
      if(v.data.status){
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/jurisdiction/setion/index'
          })
        },2000)
      }
    })
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

  }
})