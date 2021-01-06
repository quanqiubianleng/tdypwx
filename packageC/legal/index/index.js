// packageC/legal/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: null,
    swiper:{
      indicatorDots:true,
      indicatorColor:"rgba(255,255,255,.6)",
      indicatorActiveColor:"rgba(255,255,255)",
      autoplay:true,
    },
    lawyer: [],
    swiperIdx: 0,
    currentTab:0,
    page:1,
    cid:'',
    categorylist:[],
    navScrollLeft:0,
    setInter:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDynamicData();
    this.category();
    this.type();
   
  },
  nav:function(e){
    let id = e.currentTarget.dataset.id;
    var cur = e.currentTarget.dataset.index;       
    if (this.data.currentTab == cur) {
        return false;
    } else {
        this.setData({
          categorylist:[],
          page:1,
          currentTab: cur
        })
        this.categorylist(id);
    }
  },
  swiperChange: function (e) {
    this.setData({
    currentTab: e.detail.current,
    })     
  },
 // 首页动态数据逻辑处理
  getDynamicData() {
  let that = this;
  wx.login({
    success (res) {
      if (res.code) {
        var datad = {
          code:res.code,
          position_id:2
        };
        let rendata = app.requestfun(datad, '/Api/business/index');    
        rendata.then((v) => {
            var banners = v.data.banner;
            that.setData({
              banner: banners,
            });   
        }) 
      } else {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    }
  })    
  }, 
  category:function(){
    var datad = {
      type:2,
      // page:0,
      // cid:0
    };
    let rendata = app.requestfun(datad, '/Api/article/index',false);    
    rendata.then((v) => {
      if(v.data.status==1&&v.data.data){
        let lawyer = v.data.data;
        for (let index = 0; index < 4; index++) {
          v.data.data.forEach(item=>{
            lawyer.push(item)
          })
        }
        this.setData({
          lawyer:lawyer
        })
      }
    }) 
  },
  type:function(){
    var datad = {
      type:1,
      // page:0,
      // cid:0
    };
    let rendata = app.requestfun(datad, '/Api/article/category',false);    
    rendata.then((v) => {
       if(v.data.status==1&&v.data.data){
        let cid= v.data.data[0].id;
          this.setData({
            type:v.data.data
          })
          this.categorylist(cid);
       }
    }) 
  },
  categorylist:function(id){
    var datad = {
      type:1,
      page:this.data.page,
      cid:id
    };
    let rendata = app.requestfun(datad, '/Api/article/index',false);    
    rendata.then((v) => {
       if(v.data.status==1&&v.data.data){
          this.setData({
            categorylist:this.data.categorylist.concat(v.data.data),
            page:this.data.page+1
          })
       }else{
         app.msg("已经到底了");
         return;
       }
    }) 
  },
  load:function(e){
    let currentTab = this.data.currentTab;
    let cid = this.data.type[currentTab].id;
    if(!cid){
      app.msg("已到到底了");
      return;
    }else{
      this.categorylist(cid);
    }
  },
  details:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/packageC/legal/details/details?id='+id,
    })
  },
  tel:function(e){
    let mobile ='400-899-8877' ;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  scrolltolower:function(e){
    // if(upper-threshold==0){
      console.log(1111111111);
      this.setData({
        navScrollLeft:0
      })
    //}
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(function () {
      that.setData({ navScrollLeft : that.data.navScrollLeft + 10 });   
    }, 100);
  },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function () {
    this.setData({
      navScrollLeft:0
    })
  },
 

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let that = this;
    that.setData({
      navScrollLeft:0
    })
    clearInterval(that.data.setInter);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

    let that = this;
    that.setData({
      navScrollLeft:0
    })
    clearInterval(that.data.setInter);
    
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