// packageB/library/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id:id
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
  search:function(e){
    this.setData({
      search:e.detail.value
    })
  },
  searchlist:function(e){
    let that = this;
    let keyworld = that.data.search;
    if(!keyworld){
      app.msg("请输入关键字");
      return;
    }
    wx.login({
      success (res) {
        if (res.code) {
          var datad = {
            page:that.data.page,
            keyworld:keyworld,
            uid:that.data.id,
          };
          let rendata = app.requestfun(datad, '/Api/Talentpool/userSearch'); 
          rendata.then((v)=>{
            console.log(v);
            if(v.data.status==1&&v.data.data){
              that.setData({
                userlist:v.data.data,
                page:that.data.page+1
              })
            }else{
              app.msg("暂无该人员");
              return;
            }
          })
        } else {
          app.msg("网络连接失败，请稍后再试");
          return;
        }
      }
    })
  },
  details:function(e){
    let id = e.currentTarget.dataset.id;
    let own= e.currentTarget.dataset.own;
    console.log(id);
    wx.navigateTo({
      url: '/packageB/library/details/details?id='+id +'&own='+own,
    })
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
    wx.showLoading({
      title: '玩命加载中',
      duration: 1000
    })
    this.searchlist();
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