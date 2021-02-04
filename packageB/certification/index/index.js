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
    let positive_img = options.positive_img;
    let side_img = options.side_img;
    let val = 0;
    let vals = 0;
    if(positive_img){
        val = 1;
    }
    if(side_img){
      vals=1
    }
    if(Valuable==1){
      wx.showModal({
        title: '提示',
        content: '你已实名认证',
        showCancel: false, 
      })
    }
    this.setData({
      image_path:positive_img,
      inverse_img:side_img,
      Valuable:Valuable,
      val :val,
      vals:  vals
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
            address: e.detail.address.text,
            image_path:e.detail.image_path,
            positive_img:v.data,
            val:0
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
            vals:0
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
    let  idcard = this.data.idcard;
      var pattsss = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!pattsss.test(idcard)) {
        wx.showModal({
          title: '提示',
          content: '请使用正确的身份证',
          showCancel: false, 

        })
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
      idcard:idcard,
      address:this.data.address,
      positive_img:positive_img,
      side_img:side_img
    }
    let rendata = app.requestfun(datad, '/Api/UserAuto/authentication',true); 
    rendata.then((v)=>{
      if(v.data.status==1){
        let userinfo = wx.getStorageSync('userinfo');
        userinfo.authentication ='已认证';
        wx.setStorageSync('userinfo', userinfo);
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
        app.msg(v.data.message)
        return;
      }
    })
  },
  Submits:function(){
    this.setData({
      image_path:'',
      inverse_img:'',
      Valuable:0
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