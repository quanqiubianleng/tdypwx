// pages/jurisdiction/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          let data = {
            code:res.code
          }
          let rendata = app.requestfun(data, '/Api/Department/index');    
          rendata.then((v) => {
            if(v.data.status==1){
              let list = v.data.department;
              if(v.data.department){
                for (let index = 0; index < list.length; index++) {
                  var down =0;
                   list[index].down=down;
                }
              }
              that.setData({
               
                list:list
              });  
            }else{
              app.msg("暂无数据");
            }
               
          })

        }
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