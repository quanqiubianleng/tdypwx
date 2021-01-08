// pages/additions/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    date:'',
    show1: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['请选择','同意面试', '考虑当中','明确拒绝','同意上班'], //下拉列表的数据
    index: '', //选择的下拉列 表下标,
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
        that.setData({
          list:[]
        })
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
        that.setData({
          list:[]
        })
        app.msg("暂无该人员");
        return;
      }
    })
       
  },
   // 点击下拉显示框
   selectTap() {
    this.setData({
      show1: !this.data.show1,
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show1: !this.data.show1
    });
  },
  //跳转详情
  details:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/additions/details/details?id=' +id,
    })
  },
  //新增客户
  add:function(){
    this.setData({
      show:true
    })
  },
  //取消新增客户
  cancel:function(){
    this.setData({
      show:false,
      username:'',
      phone:'',
      index:'',
      remarks:''
    })
  },
  username:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  phone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  remarks:function(e){
    this.setData({
      remarks:e.detail.value
    })
  },
  Submit:function(e){
    let that = this;
    if(!that.data.username){
      app.msg("输入客户姓名");
      return;
    }
    if(!that.data.phone){
      app.msg("输入客户电话");
      return;
    }
    var patts = /^\d{11}$/g;
    if (!patts.test(that.data.phone)) {
      app.msg("电话方式不正确");
      return;
    }
    if(!that.data.index){
      app.msg("请选择所处状态");
      return;
    }
    if(!that.data.remarks){
      app.msg("请输入跟踪备注");
      return;
    }
    let data = {
      username:that.data.username,
      status:that.data.index,
      mobile:this.data.phone,
      info:that.data.remarks
    }
    let rendata = app.requestfun(data, '/Api/commissioner/addUserResource',true);    
    rendata.then((v) => {
      if(v.data.status==1){
        wx.showModal({
          title: '提示',
          content: '添加成功',
          showCancel: false, 
          success: function (sm) {
            if (sm.confirm) {
              that.setData({
                page:1,
                show:false
              })
              that.list();
            }
          }
        })
      }else{
        wx.showToast({ icon: "none", title: v.data.message });
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