// pages/modify/details/details.js
const app = getApp();
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
    let id = options.id;
    let index = options.index;
    console.log(id,index);
    this.setData({
      id : id,
      index:index
    })
    this.getUserResource();
  },
  getUserResource:function(){
    let data = {
      uid:this.data.id
    }
    let rendata = app.requestfun(data, '/Api/commissioner/getUserResource',true);    
    rendata.then((v) => {
      console.log(v);
      if(v.data.status==1&&v.data.data){

        this.setData({
          list:v.data.data
        })
      }else{
        app.msg("系统错误");
        return;
      }
    })
  },
  tel:function(e){
   let tel= e.currentTarget.dataset.tel;
   wx.makePhoneCall({
     phoneNumber: tel
   })
  },
  username:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  mobile:function(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  Submit:function(e){
    let that = this;
    let data = {
      uid:that.data.id,
      username:that.data.username,
      mobile:that.data.mobile
    }
    let rendata = app.requestfun(data, '/Api/commissioner/editUserResource',true);    
    rendata.then((v) => {
      console.log(v);
      if(v.data.status==1){
        wx.showModal({
          title: '提示',
          content: '修改成功',
          showCancel: false, 
          success:function(sm){
            if(sm.confirm){
              let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
              let prevPage = pages[ pages.length - 2 ];  
              prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                index:that.data.index,
                username:that.data.username,
                mobile:that.data.mobile
              })
              wx.navigateBack({
                delta: -1,
              })
            }
          } 
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '修改失败',
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