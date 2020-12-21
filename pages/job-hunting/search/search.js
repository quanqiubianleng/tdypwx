// pages/job-hunting/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    locationlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  search:function(e){
    let search= e.detail.value;
    this.setData({
      search:search
    })
  },
  searchlist:function(e){
    let search= e.detail.value;
    this.setData({
      search:search
    })
  },
  gosearch:function(){
    let search = this.data.search;
    if(!search){
      app.msg("请输入岗位/地区/公司名称");
      return;
    }
    var datad = {
      page:this.data.page,
      keyworld:search
    };
    let rendata = app.requestfun(datad, '/Api/job/index',false);    
    rendata.then((v) => {
      if(v.data.status==1&&v.data.data){
        this.setData({
          locationlist:this.data.locationlist.concat(v.data.data),
        })
      }else{
        app.msg("已经到底了");
        return;
      }
    }) 
  },
  details:function(e){
    let id = e.currentTarget.dataset.id;
    let stop = e.currentTarget.dataset.stop;
    console.log(id,stop);
    if(stop==0){
      wx.showModal({
        title: '提示',
        content: '该岗位已停招',
        showCancel: false, 
        })
        return;
    }
    wx.navigateTo({
      url: '/pages/job-hunting/details/details?id='+id,
    })
  },
  bindconfirm:function(e){
    let search = e.detail.value;
    if(!search){
      app.msg("请输入岗位/地区/公司名称");
      return;
    }
    var datad = {
      page:this.data.page,
      keyworld:search
    };
    let rendata = app.requestfun(datad, '/Api/job/index',false);    
    rendata.then((v) => {
      if(v.data.status==1&&v.data.data){
        this.setData({
          locationlist:this.data.locationlist.concat(v.data.data),
          search:search
        })
      }else{
        this.setData({
          search:search
        })
        app.msg("已经到底了");
        return;
      }
    }) 
  },
  bindinput:function(e){
    let search = e.detail.value;
    if(!search){
      app.msg("请输入岗位/地区/公司名称");
      return;
    }
    var datad = {
      page:this.data.page,
      keyworld:search
    };
    let rendata = app.requestfun(datad, '/Api/job/index',false);    
    rendata.then((v) => {
      if(v.data.status==1&&v.data.data){
        this.setData({
          locationlist:this.data.locationlist.concat(v.data.data),
          search:search
        })
      }else{
        this.setData({
          search:search
        })
        app.msg("已经到底了");
        return;
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
    wx.showLoading({
      title: '玩命加载中',
      duration: 1000
    })
    this.setData({
      page:this.data.page+1
    })
      this.gosearch();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})