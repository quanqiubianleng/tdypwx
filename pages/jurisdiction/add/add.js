// pages/jurisdiction/add/add.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  name:function(e){
    this.setData({
     name: e.detail.value
    })
  },
  shangchuan:function(){
  var that = this
  // 上传图片 获取路径
  wx.chooseImage({
  success: function (res) {
    var rendata = app.uploadFile(res.tempFilePaths[0]); 
    rendata.then((v) => {
      if(v.data){
         that.setData({
            img: res.tempFilePaths[0],
            path:v.data
        });
      }else{
        app.msg("图片上传失败");
        return;
      }
    })
  },
  })
  },
  add:function(){
    if(!this.data.name){
      app.msg("请输入部门名称");
      return;
    }
    // if(!this.data.path){
    //   app.msg("请选择部门图标");
    //   return;
    // }
    var datad = {
      openid:wx.getStorageSync('userinfo').openid,
      uid:wx.getStorageSync('userinfo').id,
      name:this.data.name,
      // path:this.data.path
    };
    let rendata = app.requestfun(datad, '/Api/Department/AddDepartment',true);    
    rendata.then((v) => {
      if(v.data.status==1){
        wx.showModal({
          title: '提示',
          content: '添加成功',
          showCancel: false, 
          success: function (sm) {
            if (sm.confirm) {
              wx.navigateBack();
            }
            }
          })
      }else{
        wx.showModal({
          title: '提示',
          content: v.data.message,
          showCancel: false, 
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