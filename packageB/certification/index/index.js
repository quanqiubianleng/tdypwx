// packageB/certification/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_path:'',
    inverse_img:'',
    Valuable:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let Valuable = options.Valuable;
    this.setData({
      Valuable:Valuable
    })
  },
  // authenticationFind:function(){
    
  // },
  positive:function(e){
    if(e.detail.image_path){
      var rendata = app.uploadFile(e.detail.image_path); 
      rendata.then((v) => {
        if(v.data){
          this.setData({
            name:e.detail.name.text,
            sex:e.detail.gender.text,
            nation:e.detail.nationality.text,
            idcard:e.detail.id.text,
            address:e.detail.address.text,
            image_path:e.detail.image_path,
            positive_img:v.data,
          })
        }else{
          app.msg("图片上传失败，请重试");
          return;
        }
      });
    }else{
      app.msg("身份识别错误，请重试");
      return;
    }
  },
  inverse:function(e){
    if(e.detail.image_path){
    var rendata = app.uploadFile(e.detail.image_path); 
      rendata.then((v) => {
        if(v.data){
          this.setData({
            inverse_img:e.detail.image_path,
            side_img:v.data,
          })
        }else{
          app.msg("图片上传失败，请重试");
          return;
        }
      });
    }else{
      app.msg("身份识别错误，请重试");
      return;
    }
  },
  Submit:function(e){
    let positive_img = this.data.positive_img;
    if(!positive_img){
      app.msg("请拍摄身份证人像面");
      return;
    }
    let side_img = this.data.side_img;
    if(!side_img){
      app.msg("请拍摄身份证国徽面");
      return;
    }
    let sex= '';
    if(this.data.sex=='男'){
      sex=1
    }
    if(this.data.sex=='女'){
      sex=2
    }
    let datad={
      name:this.data.name,
      sex:sex,
      nation:this.data.nation,
      idcard:this.data.idcard,
      address:this.data.address,
      positive_img:positive_img,
      side_img:side_img
    }
    let rendata = app.requestfun(datad, '/Api/UserAuto/authentication',true); 
    rendata.then((v)=>{
      if(v.data.status==1){
        wx.showToast({
          title: '提交成功',
          duration:1000,//显示时长
          icon:'none',
          success:function(){ 
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/personal/personal',
              })
              
            }, 1000);
          },
        })
      
      }else{
        app.msg("网络连接失败，请稍后重试!")
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})