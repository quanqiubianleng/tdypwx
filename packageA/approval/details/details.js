// packageA/approval/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:null,
    index2:null,
    userlist:[],
    urls:{},
    remark:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let index = options.index;
    let currentTab = options.currentTab;
    let type = options.type;
    let datad={
      id:id
    }
    let rendata = app.requestfun(datad, '/Api/UserAuto/partnerExamineDetail',true); 
    rendata.then((v)=>{
     console.log(v);
     if(v.data.status==1){
       this.setData({
          userlist:v.data.data,
          img1:v.data.data.positive_img,
          img2:v.data.data.side_img,
          id:id,
          name:v.data.data.admin_data.username,
          currentTab:currentTab,
          // index:v.data.data.status,
          // index2:v.data.data.status_pay,
          indexs:index,
          remark:v.data.data.admin_remark,
          type:type
       })
     }
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
    let that = this;
    let remark = that.data.remark;
    if(!that.data.index){
      app.msg("请选择审批意见");
      return;
    }
    if(that.data.type!=4){
      if(!that.data.index2){
        app.msg("请选择是否可提现");
        return;
      }
    }
    if(!that.data.remark){
      app.msg("请输入审批说明");
        return;
    }
    
    let datad={
      id:that.data.id,
      remark:that.data.remark,
      status:that.data.index,
      status_pay:that.data.index2
    }
    let rendata = app.requestfun(datad, '/Api/UserAuto/partnerExamine',true); 
    rendata.then((v)=>{
     if(v.data.status==1){
      app.msg("审批成功");
      setTimeout(function(){
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
        let prevPage = pages[ pages.length - 2 ];  
        prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
          id:that.data.indexs,
          currentTab:that.data.currentTab,
          status :that.data.index
        })
        wx.navigateBack({
          data:1
        })
      },1000)
      
     
     }
    })
  },
  previewImage:function(e){
    let urls = [this.data.img1,this.data.img2]
    wx.previewImage({
      urls:urls
    })
  },
  shif:function(e){
    this.setData({
      index2:e.currentTarget.dataset.id
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