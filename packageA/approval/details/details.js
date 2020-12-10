// packageA/approval/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let datad={
      id:id
    }
    let rendata = app.requestfun(datad, '/Api/UserAuto/partnerExamineDetail',true); 
    rendata.then((v)=>{
     console.log(v);
    //  if(v.data.status==1&&v.data.data){
    //    this.setData({
    //      list:this.data.list.concat(v.data.data),
    //      page:this.data.page+1,
    //      strip:this.data.strip+v.data.data.length
    //    })
    //  }
    })
  },
  xuanze:function(e){
    this.setData({
      index:e.currentTarget.dataset.id
    })
  },
  remark:function(e){
    this.setData({
      remark:e.detail.value
    })
  },
  determine:function(){
    let remark = this.data.remark;
    let datad={
      // id:this.data.id,
      id:6,
      remark:this.data.remark,
      status:this.data.index
    }
    let rendata = app.requestfun(datad, '/Api/UserAuto/partnerExamine',true); 
    rendata.then((v)=>{
     console.log(v);
    //  if(v.data.status==1&&v.data.data){
    //    this.setData({
    //      list:this.data.list.concat(v.data.data),
    //      page:this.data.page+1,
    //      strip:this.data.strip+v.data.data.length
    //    })
    //  }
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