// packageC/legal/details/details.js
const app = getApp();
const WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.details(id);
    
  },
  details:function(e){
    var datad = {
      id:e
    };
    let rendata = app.requestfun(datad, '/Api/article/detail',false);    
    rendata.then((v) => {
      console.log(v);
       if(v.data.status==1&&v.data.data){
        WxParse.wxParse('article', 'html', v.data.data.article, this,10);
          this.setData({
            title:v.data.data.title
          })
       }
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