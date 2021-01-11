// pages/entry/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    page:1,
    pages:1,
    list:[],
    swiper:{
      indicatorDots:true,
      indicatorColor:"rgba(255,255,255,.6)",
      indicatorActiveColor:"rgba(255,255,255)",
      autoplay:true,
    },
    searchlist:[],
    search:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetAdvertImg();
    this.invites();
  },
  search:function(e){
    this.setData({
      search:e.detail.value
    })
  },
  searchlist:function(e){
    let that = this;
    if(that.data.search==''||that.data.search=='null'||that.data.search=='undefined'){
      app.msg("请输入姓名/模糊查找");
      return
    }
    wx.login({
      success (res) {
        if (res.code) {
        let data = {
          code:res.code,
          type:0,
          nameortel :that.data.search
        }
        let rendata = app.requestfun(data, '/Api/invites/index');    
        rendata.then((v) => {
          if(v.data.userlist){
            that.setData({
              searchlist:v.data.userlist
            })
          }else{
            app.msg("未找到该人员");
              return
          }
        })
        } 
      }
    })
  },
  searchfrom:function(e){
    let that= this;
      let search =e.detail.value;
      if(!search){
        app.msg("请输入姓名/模糊查找");
        return
      }
      wx.login({
        success (res) {
          if (res.code) {
          let data = {
            code:res.code,
            type:0,
            nameortel :that.data.search
          }
          let rendata = app.requestfun(data, '/Api/invites/index');    
          rendata.then((v) => {
            if(v.data.userlist){
              that.setData({
                searchlist:v.data.userlist
              })
            }else{
              app.msg("未找到该人员");
              return
              // that.setData({
              // searchlist:[]
              // })
            }
            
           
          })
          } 
        }
      })
  },
  invites:function(){
    let page = this.data.page;
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          let data ={
            code:res.code,
            type:0,
            page:page
          }
          let rendata = app.requestfun(data, '/Api/invites/index');    
          rendata.then((v) => {
            if(v.data.userlist){
                that.setData({
                  page:that.data.page+1,
                  list:that.data.list.concat(v.data.userlist),
                })
              }else{
                app.msg("已经到底了");
                return;
              }
              
          })
        } else {
          app.msg("加载失败，网络延迟");
          return;
        }
      }
    })
  },
  GetAdvertImg:function(){
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
        let data = {
          code:res.code,
          position_id : 5
        }
        let rendata = app.requestfun(data, '/Api/business/GetAdvertImg');    
        rendata.then((v) => {
          that.setData({
            banner:v.data.imglist
          })
         
        })
        } 
      }
    })
  },
  //跳转详情
  show:function(e){
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    let search = this.data.search;
    let list = {};
    if(type==2){
      console.log(111);
      list =JSON.stringify(this.data.searchlist[id])
    }
    if(type==1){
      list =JSON.stringify(this.data.list[id])
    }
    wx.navigateTo({
      url: '/pages/entry/details/details?list=' + list + '&type=' + type + '&search=' + search +'&id=' +id,
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    console.log(currPage.__data__.type);
    if(currPage.__data__.y==-1){
      if(currPage.__data__.search==''&&currPage.__data__.type==1){
        let list = this.data.list;
        let id = currPage.__data__.id;
        list.splice(id,1);//删除当前索引的内容，这样就能删除view了
       this.setData({
         list:list,
       })
      }
     if(currPage.__data__.type==2&&currPage.__data__.search!='') {
      let list = this.data.searchlist;
      let id = currPage.__data__.id;
      list.splice(id,1);//删除当前索引的内容，这样就能删除view了
     this.setData({
       list:list
     })
      this.setData({
          searchlist:list
        })
      }
    }
 
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
    this.invites();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})