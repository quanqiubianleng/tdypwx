// pages/modify/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    pages:1,
    list:[],
    search:'',
    banner:[],
    swiper:{
      indicatorDots:true,
      indicatorColor:"rgba(255,255,255,.6)",
      indicatorActiveColor:"rgba(255,255,255)",
      autoplay:true,
    }, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.GetAdvertImg();
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
  list:function(){
    let that = this;
    let data = {
      type:1,
      page:that.data.page
    } 
    let rendata = app.requestfun(data, '/Api/commissioner/resource',true);    
    rendata.then((v) => {
      console.log(v);
      if(v.data.status==1&&v.data.data){
        that.setData({
          list:that.data.list.concat(v.data.data)
        })
      }else{
        app.msg("已经到底了");
        return;
      }  
    })
  },
  search:function(e){
    this.setData({
      search:e.detail.value
    })
  
  },
  searchlist:function(){
    let search = this.data.search;
    if(!search){
      app.msg("输入姓名/模糊查找");
      return;
    }
    let that = this;
    let data = {
      type:1,
      pages:that.data.pages,
      keyworld:search
    } 
    let rendata = app.requestfun(data, '/Api/commissioner/resource',true);    
    rendata.then((v) => {
      console.log(v);
      if(v.data.status==1&&v.data.data){
        if(that.data.pages==1){
          that.setData({
            list:v.data.data
          })
        }else{
          that.setData({
            list:that.data.list.concat(v.data.data)
          })
        }
      }else{
        app.msg("暂无该人员");
        return;
      }
    })
  },
  bindconfirm:function(e){
    console.log(22222222222)
    let search = e.detail.value;
    if(!search){
      app.msg("输入姓名/模糊查找");
      return;
    }
    let that = this;
    let data = {
      type:1,
      pages:that.data.pages,
      keyworld:search
    } 
    let rendata = app.requestfun(data, '/Api/commissioner/resource',true);    
    rendata.then((v) => {
      console.log(v);
      if(v.data.status==1&&v.data.data){
        if(that.data.pages==1){
          that.setData({
            list:v.data.data
          })
        }else{
          that.setData({
            list:that.data.list.concat(v.data.data)
          })
        }
      }else{
        app.msg("暂无该人员");
        return;
      }
    })
       
  },
  showview: function(e) { 
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
   console.log(index);
    let data = {
      uid :id
    }
    let rendata = app.requestfun(data, '/Api/commissioner/addResource',true);    
    rendata.then((v) => {
      console.log(v);
      if(v.data.status==1){
        wx.showModal({
          title: '提示',
          content: '认领成功',
          showCancel: false, 
        })
        let list = this.data.list;
        list.splice(index,1);//删除当前索引的内容，这样就能删除view了
        this.setData({
          list:list
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '认领失败',
          showCancel: false, 
        })
      }
    })
  },
  details:function(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/modify/details/details?id=' + id +'&index=' +index,
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
    this.list();
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
    if(!this.data.search){
      this.setData({
        page:this.data.page+1
      })
      this.list();
    }else{
      this.setData({
        pages:this.data.pages+1
      })
      this.searchlist();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})