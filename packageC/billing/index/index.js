// packageC/billing/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:app.globalData.baseUrl,
     page:0,
     nopenid:0,
     openid :'',
     list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nopenid  = options.nopenid ;
    console.log(nopenid);
    if(typeof(nopenid==undefined)){
      nopenid=0;
    }
    this.setData({
      nopenid:nopenid
    })
    this.nobill();
  },
  nobill:function(e){
    let that = this;
    let nopenid =that.data.nopenid;
    wx.login({
      success (res) {
        if (res.code) {
        let data = {
          code:res.code,
          nopenid:that.data.nopenid ,
          page :that.data.page
        }
        let rendata = app.requestfun(data, '/Api/nobill/index');    
        rendata.then((v) => {
          if(v.data.status==1&&v.data.billlist.length>=1){
            that.setData({
              list:that.data.list.concat(v.data.billlist),
              openid :v.data.openid ,
              page:that.data.page+1
            })
          }else{
            app.msg("已经到底了")
          }
         
        })
        } 
      }
    })
  },
  details:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/packageC/billing/details/details?id='+id + '&nopenid='+this.data.openid,
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
    this.nobill();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
     let nopenid= this.data.openid
     console.log(nopenid);
    return {
      title: '天大云聘系统',
      path: '/packageC/billing/index/index?nopenid='+nopenid,
      desc: '',
      success: function (res) {
        app.msg("分享成功");
      }
    }
  },
  /* 
    分享朋友圈
  */
  // onShareTimeline:function(){
  //   let nopenid= this.data.openid
  //   console.log(nopenid);
  //   return{
  //     title: '天大云聘系统',
  //     query: '/packageC/billing/index/index?nopenid='+nopenid,
  //     success: function (res) {
  //       app.msg("分享成功");
  //     }
  // }
  // }
})