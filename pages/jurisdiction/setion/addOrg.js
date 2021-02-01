// pages/jurisdiction/setion/add.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    p_id: 0,
    name: '',
  },
  onChange: function(e){
    console.log(e)
    this.setData({
      title: e.detail,
    })
  },
  // 提交
  addGroup: function (){
    let self = this
    if(!(this.data.title)){
      app.msg('群聊名称不能为空！');
      return false;
    }
    let arr = {
      title: this.data.title,
      p_id: this.data.p_id
    }
    let rendata = app.requestfun(arr, '/Api/org/addGroup',false);    
    rendata.then((v) => {
      app.msg(v.data.message)
      if(v.data.status){
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/jurisdiction/setion/index?p_id='+self.data.p_id+'&title='+self.data.name,
          })
        },2000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      p_id: options.p_id,
      name: options.title,
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