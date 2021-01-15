// pages/jurisdiction/setion/addGroupUser.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_id: 0, // 群聊ID
    groupUserList: [], // 群聊成员
    groupDetail: {}, // 群聊详情
    title: '',
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      group_id: options.group_id
    })
    this.getGroupDetail()
  },

  // 获取群组详情
  getGroupDetail(){
    let arr = {
      group_id: this.data.group_id
    };
    let rendata = app.requestfun(arr, '/Api/group/groupDetail',false); 
    var that = this   
    rendata.then((v) => {
     
      if(v.data.status){
        that.setData({
          groupUserList: v.data.data.list,
          groupDetail: v.data.data.detail,
          title: v.data.data.detail.title,
        })
      }
    })
  },

  // 提交
  editGroup: function (){
    console.log(this.data.title)

    if(!(this.data.title)){
      app.msg('群聊名称不能为空！');
      return false;
    }
    // 如果名称相同则不提交
    if(this.data.title == this.data.groupDetail.title){
      app.msg('群聊名称不能和之前的一致！');
      return false;
    }
    let arr = {
      title: this.data.title,
      id: this.data.groupDetail.id
    }
    let rendata = app.requestfun(arr, '/Api/group/addGroup',false);    
    rendata.then((v) => {
      app.msg('编辑成功')
      if(v.data.status){
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/jurisdiction/setion/index'
          })
        },2000)
      }
    })
  },

  onChange: function(e){
    console.log(e)
    this.setData({
      title: e.detail.trim(),
    })
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
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