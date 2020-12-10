//index.js
//获取应用实例
const app = getApp()
const utils = require("../../utils/tool.js")
Page({
  data: {
    userInfo:[],

  },

  // 记录列表跳转
  navigateToDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/infopage/infopage?id=${id}`})
  },  
 
  loginbyw(){
    wx.navigateTo({ url: '/pages/loginByWechat/loginByWechat' });
  },
  click:utils.default.throttle(function(res){
    let url = res[0].currentTarget.dataset.url;
    if(url=='/packageB/IDdiscern/index/index'){
      let datad={}
    let rendata = app.requestfun(datad, '/Api/UserAuto/authenticationFind',true); 
    rendata.then((v)=>{
      if(v.data.status==1){
        let datad={}
      let rendata = app.requestfun(datad, '/Api/UserAuto/partnerStatus',true); 
      rendata.then((v)=>{
        if(v.data.status==1){
          let type = v.data.data.type;
          let status = v.data.data.status;
          wx.navigateTo({
            url: '/packageB/IDdiscern/index/index?Valuable='+type +'&status='+ status ,
          })
        }else{
          let type = '';
          let status = '';
          wx.navigateTo({
            url: '/packageB/IDdiscern/index/index?Valuable='+type +'&status='+ status ,
          })
        }
      })
      }
      else{
        app.msg("请先通过实名认证");
        return;
      }
    })
    }
    if(url=='/packageB/certification/index/index'){
      let datad={}
    let rendata = app.requestfun(datad, '/Api/UserAuto/authenticationFind',true); 
    rendata.then((v)=>{
      if(v.data.status==1&&v.data.data){
        let Valuable = 1;
        wx.navigateTo({
          url: '/packageB/certification/index/index?Valuable='+Valuable,
        })
      }
      else{
        let Valuable = 0;
        wx.navigateTo({
          url: '/packageB/certification/index/index?Valuable='+Valuable,
        })
      }
    })
    }
    else{
      wx.navigateTo({
        url: url,
      })
    }
    
  },3000),
  onShow:function(){
    var  userInfos= wx.getStorageSync('userinfo');
    this.setData({
      userInfo: userInfos,
    }) 
  },
  onLoad: function () { 
    
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  }, 
})
