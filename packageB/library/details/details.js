// packageB/library/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:2,
    down:2,
    strip:0,
    page:0,
    pages:0,
    userlist:[],
    BrowsHistory:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let own = options.own;
    let openid = options.openid;
    let level = options.level;
    this.setData({
      own:own,
      id:id,
      openid:openid,
      level:level
    })
    this.detail(id);
    this.BrowsHistory(id);
  },
  getSubordinate:function(id,openid,level){
    var datad = {
      openid:openid,
      leavl:level,
      uid:id,
      page:this.data.pages
    };
    let rendata = app.requestfun(datad, '/Api/Talentpool/getSubordinate'); 
    rendata.then((v)=>{
      if(v.data.status==1&&v.data.linkuser){
        this.setData({
          userlist:v.data.linkuser,
        })
      }else{
        app.msg("暂无下级");
        return;
      }
    })
  },
  detail:function(e){
    let id = e;
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          var datad = {
            uid:id,
            code: res.code,
           
          };
          let rendata = app.requestfun(datad, '/Api/Talentpool/detail'); 
          rendata.then((v)=>{
            if(v.data.status==1&&v.data.data.user){
              that.setData({
                user:v.data.data.user
              })
            }
           
          })
        } else {
          app.msg("网络连接失败，请稍后再试");
          return;
        }
      }
    })
  },
  BrowsHistory:function(e){
    let id = e;
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          var datad = {
            uid:id,
            code: res.code,
            page:that.data.page
          };
          let rendata = app.requestfun(datad, '/Api/BrowsHistory/index'); 
          rendata.then((v)=>{
            if(v.data.status==1&&v.data.data){
                that.setData({
                  BrowsHistory:v.data.data,
                  strip:v.data.data.length,
                  page:that.data.page+1
                })
            }else{
              app.msg("暂无浏览记录");
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
  choice:function(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      index:index
    })
    if(index==1){
      this.getSubordinate(this.data.id,this.data.openid,this.data.level)
    }
  },
  down:function(e){
    let index = e.currentTarget.dataset.down;
    if(index==2){
      index=1
    }else{
      index=2
    }
    this.setData({
      down:index
    })
  },
  label:function(e){
    wx.navigateTo({
      url: '/packageB/library/label/label?id='+this.data.id,
    })
  },
  // details:function(e){
  //   let id = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: '/',
  //   })
  // },
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
    let index = this.data.index;
    if(index==1){
     this.getSubordinate(this.data.id,this.data.openid,this.data.level)
    }
    if(index==2){
      this.BrowsHistory();
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})