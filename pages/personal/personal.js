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
 
  loginbyw:function(){
    console.log(1111);
    wx.navigateTo({ url: '/pages/loginByWechat/loginByWechat' });
  },
  click:utils.default.throttle(function(res){
    if(app.globalData.isLogin){
      let url = res[0].currentTarget.dataset.url;
      if(url=='/packageB/IDdiscern/index/index'){
        let datad={}
        let rendata = app.requestfun(datad, '/Api/UserAuto/authenticationFind',true); 
        rendata.then((v)=>{
          if(v.data.status==1){
            console.log(111111)
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
                console.log(1111111111)
                let type = '';
                let status = '';
                wx.navigateTo({
                  url: '/packageB/IDdiscern/index/index?Valuable='+type +'&status='+ status ,
                })
              }
            })
          }
          else{
            wx.showModal({
              title: '提示',
              content: '请先通过实名认证',
              success: function (sm) {
                if (sm.confirm) {
                  wx.navigateTo({
                    url: '/packageB/certification/index/index',
                  })
                } else if (sm.cancel) {
                  console.log('用户点击取消')
                }
                }
              })
           
            return;
          }
        })
        return;
      }
      if(url=='/packageB/certification/index/index'){
        let datad={}
      let rendata = app.requestfun(datad, '/Api/UserAuto/authenticationFind',true); 
      rendata.then((v)=>{
        if(v.data.status==1&&v.data.data){
          wx.showModal({
            title: '提示',
            content: '你已实名认证',
            showCancel: false, 
          })
        }
        else{
          let Valuable = 0;
          wx.navigateTo({
            url: '/packageB/certification/index/index?Valuable='+Valuable,
          })
        }
      })
      return;
      }
      if(url=='/packageB/friends/index/index'){
        let coordinates = wx.getStorageSync('coordinates');
        if(!coordinates){
          wx.getLocation({
            type: 'wgs84',
            success: function(tude) {
              wx.setStorageSync('coordinates', tude);
            },
            fail: function() {
              showMsg("获取位置失败，请稍后再试");
            }
          });
        }else{
          wx.navigateTo({
            url:'/packageB/friends/index/index'
          })
        }
        return;
      }
      if(url=='/packageB/library/index/index'){
          let isLogin = wx.getStorageSync('userinfo');
          if(!isLogin){
            wx.navigateTo({
              url: '/pages/loginByWechat/loginByWechat',
            })
          }else{
            wx.navigateTo({
              url: '/packageB/library/index/index',
            })
          }
          return;
      }
      if(url=='/pages/jurisdiction/index/index'){
        let isLogin = wx.getStorageSync('userinfo');
        if(!isLogin){
          wx.navigateTo({
            url: '/pages/loginByWechat/loginByWechat',
          })
        }else{
          wx.navigateTo({
            url: '/pages/jurisdiction/index/index',
          })
        }
        return;
    }
      else{
        console.log(22222)
        wx.navigateTo({
          url: url,
        })
      }
    }else{
      wx.navigateTo({
        url: '/pages/loginByWechat/loginByWechat',
      })
    }
   
    
  },3000),
  onShow:function(){
    var  userInfos= wx.getStorageSync('userinfo');
    console.log(userInfos)
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
