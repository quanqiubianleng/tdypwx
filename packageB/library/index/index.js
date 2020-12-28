// packageB/library/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    userlist:[],
    count:0,
    count1:0,
    count2:0,
    count3:0,
    currentTab:0,
    userInfos:wx.getStorageSync('userinfo'),
    isLogin:app.globalData.isLogin,
    id:'',
    RecommendMessage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Talentpoo();
  },
  getSubordinate:function(e){
   let id = e.currentTarget.dataset.leavl;
    this.setData({
        page:0,
        id:id,
        userlist:[]
      
     })
     this.getSubordinatelist();

   },
   getSubordinatelist:function(){
    var datad = {
      openid:this.data.userInfos.openid,
      leavl:this.data.id,
      uid:this.data.userInfos.id,
      page:this.data.page
    };
    let rendata = app.requestfun(datad, '/Api/Talentpool/getSubordinate'); 
    rendata.then((v)=>{
      if(v.data.status==1&&v.data.linkuser){
        this.setData({
          userlist:this.data.userlist.concat(v.data.linkuser),
          page:this.data.page+1
        })
      }else{
        
        app.msg("已经到底了");
        return;
      }
    })
   },
  Talentpoo:function(){
    let that = this;
    var datad = {};
    let rendata = app.requestfun(datad, '/Api/Talentpool/index'); 
    rendata.then((v)=>{
      console.log(v);
      if(v.data.status==1){
        if(v.data.linkuser==null){
          that.setData({
            count:v.data.count,
            count1:v.data.count1,
            count2:v.data.count2,
            count3:v.data.count3,
            RecommendMessage:v.data.RecommendMessage,
          })
        }else{
          that.setData({
            userlist:that.data.userlist.concat(v.data.linkuser),
            RecommendMessage:v.data.RecommendMessage,
            count:v.data.count,
            count1:v.data.count1,
            count2:v.data.count2,
            count3:v.data.count3,
          })
        }
       
      }else{
        app.msg("已经到底了");
        return;
      }
    })  
  },
  getuserlinkpage:function(){
    let that = this;
    var datad = {
      page:this.data.page
    };
    let rendata = app.requestfun(datad, '/Api/Talentpool/getuserlinkpage'); 
    rendata.then((v)=>{
      console.log(v);
      if(v.data.status==1&&v.data.linkuser){
        that.setData({
          userlist:that.data.userlist.concat(v.data.linkuser),
          page:this.data.page+1
        })
      }else{
        app.msg("已经到底了");
        return;
      }
    })  
  },
  details:function(e){
    let id = e.currentTarget.dataset.id;
    let own= e.currentTarget.dataset.own;
    let openid = e.currentTarget.dataset.openid;
    let level = e.currentTarget.dataset.level;
    wx.navigateTo({
      url: '/packageB/library/details/details?id='+id +'&own='+own + '&openid='+openid +'&level=' +level,
    })
  },
  explain:function(e){
    wx.navigateTo({
      url: '/packageB/library/explain/explain',
    })
  },
  search:function(e){
    let id = this.data.id;
    wx.navigateTo({
      url: '/packageB/library/search/search?id='+id,
    })
  },
  friends:function(e){
    wx.navigateTo({
      url: '/packageB/friends/index/index',
    })
  },
  detailed:function(){
    wx.navigateTo({
      url: '/packageB/library/detailed/detailed',
    })
  },
  tixian:function(){
    wx.navigateTo({
      url: '/packageB/wallet/index/index',
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
    this.setData({
      userInfos:wx.getStorageSync('userinfo'),
    })
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
    console.log(this.data.page)
    this.setData({
      page:this.data.page+1
    })
    let id = this.data.id;
    if(!id){
      this.getuserlinkpage();
    }
   if(id){
     this.getSubordinatelist();
   }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})