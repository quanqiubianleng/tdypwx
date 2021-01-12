// packageC/job-hunting/details/details.js
const app = getApp();
const WxParse = require('../../../utils/wxParse/wxParse.js');
const chat = require('../../../utils/chat.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:{
      indicatorDots:true,
      indicatorColor:"rgba(255,255,255,.6)",
      indicatorActiveColor:"rgba(255,255,255)",
      autoplay:true,
    },
    banner: null,
    show:false,
    show1:false,
    enroll:2,
    currentTab:1,
    apply_status:0,
    all_status:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isLogin = app.globalData.isLogin;
    if(!isLogin){
      wx.navigateTo({
        url: '/pages/loginByWechat/loginByWechat',
      })
    }
    let id = options.id;
    let nopenid = options.nopenid;
    let share = options.share;
    this.setData({
      id:id,
      nopenid:nopenid,
      share:share
    })
    app.globalData.enlist=null;
    this.nobillinfo(id);
  },
  keep:function(e){
    let keep = this.data.keep;
    if(keep==1){
      app.msg("你也收藏，无需再次收藏")
    }else{
      let data = {
        j_id:this.data.id,
        status:1
      }
      let rendata = app.requestfun(data, '/Api/job/collection',true);    
      rendata.then((v) => {
        if(v.data.status==1){
          this.setData({
            keep:1
          })
          app.msg("收藏成功")
        }
      })
    }
   
  },
   /**
    * 监听滚动条
    */
   onPageScroll: function(e) {
    this.bindscroll(e.scrollTop+140);
  },
  nav:function(e){
    // 获取标签元素上自定义的 data-opt 属性的值
    let current = e.currentTarget.dataset.current;
    let target = e.currentTarget.dataset.opt;
    this.setData({
      //  toView: target,
      currentTab:current
    })
    var me = this;
      var query = wx.createSelectorQuery().in(me);
      query.selectViewport().scrollOffset()
      query.select("#"+target).boundingClientRect();
      query.exec(function (res) {
        var miss = res[0].scrollTop + res[1].top + 60;
        wx.pageScrollTo({
          scrollTop: miss,
          duration: 300
        });
         
      });
  },
  //滚动获取元素id距顶部的位置
  bindscroll:function(e){
    let scrollTop=e;
    var that = this;
    wx.createSelectorQuery().select('#nav').boundingClientRect(function(rect){
      let distance = rect.top;
      if(distance<=-9){
       that.setData({
        scrollTop:1
       });
      }
      if(distance>-9){
       that.setData({
        scrollTop:0
       });
      }
    }).exec();
    /* 
      轮播300rpx;
      导航栏目120rpx;
      235rpx;
    */
    let h1 = parseInt(that.data.h1);
    let h2 = parseInt(that.data.h2);
    let h3 = parseInt(that.data.h3);
    let h4 = parseInt(that.data.h4);
    scrollTop = parseInt(scrollTop);
    if(scrollTop<h1){
      that.setData({
        currentTab:1
      })
    }
    if(h1<scrollTop && scrollTop<h2){
      that.setData({
        currentTab:2
      })
    }
    if(h2<scrollTop && scrollTop<h3){
      that.setData({
        currentTab:3
      })
    }
    if(h3<scrollTop){
      that.setData({
        currentTab:4
      })
    }
  },
  showPopup:function(e){
    let passdata = wx.getStorageSync('passdata');
   console.log(passdata);
    if(!passdata||typeof(passdata)=='undefined'||typeof(passdata)=='null'){
      console.log(1111)
        wx.navigateTo({
          url: '/pages/loginByWechat/loginByWechat?type=2',
        })
    }
    if(passdata){
      let status = this.data.status;
      let apply_status = this.data.apply_status;
      let all_status = this.data.all_status;
      if(apply_status==1&&all_status==1){
        wx.showModal({
          title: '提示',
          content: '你已报名该工厂',
          showCancel: false, 
          })
          return;
      }
      if(apply_status==0&&all_status==1){
        this.setData({
          show:true,
          passdata:passdata
        })
      }
     if(apply_status==0&&all_status==0){
      this.setData({
        show1:true,
        passdata:passdata
      })
     }
    }
  },
  showcancel:function(e){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要取消吗？',
      cancelText:'我再想想',
      cancelColor:'#999999',
      success: function (sm) {
        if (sm.confirm) {
          let datat = {
            openid:that.data.nopenid,
            billid:that.data.list.id
          }
          let rendata = app.requestfun(datat, '/Api/Apply/cancel',true); 
          rendata.then((v)=>{
            if(v.data.status==1){
              wx.showModal({
                title: '提示',
                content: '取消成功',
                showCancel: false, 
                success: function (sm) {
                  if (sm.confirm) {
                    setTimeout(function() {
                      app.globalData.enlist=1;

                      wx.switchTab({
                        url: '/pages/job-hunting/index/index',
                      })
                     
                    }, 1000);
                  }
                  }
                })
            }else{
              wx.showModal({
                title: '提示',
                content: '取消失败',
                showCancel: false,
                })
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
        }
      })
  },
  confirm:function(){
    this.setData({
      show:false
    })
    this.bao();
  },
  cancel:function(e){
    this.setData({
      show:false
    })
  },
    // 报名后提醒客服
  kefuTips:function(data){
    var f_msg = {
      type: 'bming',
      f_id: 'user_' + app.globalData.userInfo.id,
      j_id: 0,
      msg_type: 'admin_kefu',
      content: app.globalData.userInfo.mobile,
    }
    app.sendSocketMessage(f_msg);
  },
  bubao:function(e){
    this.setData({
      show1:false
    })
  },
  bao:function(e){
  let that = this;
    wx.login({
      success (res) {
        let data ={
          code:res.code,
          passdata:that.data.passdata,
          billid:that.data.id,
          shopid:that.data.shopid,
          type:2
        }
        let rendata = app.requestfun(data, '/Api/Apply/index'); 
        rendata.then((v)=>{
          if(v.data.status==1){
            if(app.globalData.lockReconnect){
              // 给客服发消息提示有人报名
              that.kefuTips()
            }
            wx.showModal({
              title: '提示',
              content: '报名成功',
              showCancel: false, 
              success: function (sm) {
                if (sm.confirm) {
                  setTimeout(function() {
                    app.globalData.enlist=1;
                    wx.switchTab({
                      url: '/pages/job-hunting/index/index',
                    })
                   }, 1000);
                }
                }
              })
          }else{
            wx.showModal({
              title: '提示',
              content: '报名失败',
              showCancel: false, 
              })
          }
                
        })
      }
    })
  },
  nobillinfo:function(id){
    let that = this;
        let data = {
          id:id 
        }
        let rendata = app.requestfun(data, '/Api/job/detail',false);    
        rendata.then((v) => {
          if(v.data.status==1&&v.data.data){
            let keep= 0;
            if(v.data.data.collect_status==1){
              keep=v.data.data.collect_status;
            }else{
              keep=0;
            }
           WxParse.wxParse('emolumentinfo', 'html', v.data.data.emolumentinfo, that);
            WxParse.wxParse('meals', 'html', v.data.data.meals, that);
            WxParse.wxParse('putup', 'html', v.data.data.putup, that);
            WxParse.wxParse('nodescription', 'html', v.data.data.nodescription, that);
            WxParse.wxParse('recommend', 'html', v.data.data.recommend, that);
            WxParse.wxParse('astrict', 'html', v.data.data.astrict, that);
            WxParse.wxParse('description', 'html', v.data.data.description, that);
            WxParse.wxParse('workdate', 'html', v.data.data.workdate, that);
            WxParse.wxParse('waywork', 'html', v.data.data.waywork, that);
            WxParse.wxParse('aboutus', 'html', v.data.data.aboutus, that);
            WxParse.wxParse('rest', 'html', v.data.data.rest, that);
            that.setData({
              list:v.data.data,
              // nopenid:v.data.openid,
              keep:keep,
              apply_status: v.data.data.apply_status,
              all_status: v.data.data.all_status,
              shopid:v.data.data.shopid
            })
          }
         
        })
  },
  tel:function(e){
    let mobile ='400-899-8877' ;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  advice:function(e){
    let arr = {
      type: 'kefu',
      j_id: 0,
      title: '咨询',
    }
    // 判断是否应该解除绑定的客服UID
    if(chat.unBindTime(app)){
      // 解除绑定的客服UID
      chat.updateBindUid(app, 0)
    }else{
      arr.j_id = app.globalData.kefuUid ? app.globalData.kefuUid : 0
    }
    wx.navigateTo({
      url: '/pages/advice/advice?data='+ JSON.stringify(arr),
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {  
      let query = wx.createSelectorQuery();  
      query.select('#nav1').boundingClientRect(rect=>{  
          let height = rect.height+rect.top-120;  
          this.setData({
            h1:height
          })
          }).exec();
      query.select('#nav3').boundingClientRect(rect=>{  
        let height = rect.height+rect.top-120;  
        this.setData({
          h2:height
        })
        }).exec();  
      query.select('#nav5').boundingClientRect(rect=>{  
        let height = rect.height+rect.top-120;  
        this.setData({
          h3:height
        })
        }).exec();
      query.select('#nav7').boundingClientRect(rect=>{  
        let height = rect.height+rect.top-120;  
        this.setData({
          h4:height
        })
        }).exec();    
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    if(currPage.__data__.type==1){
      let openid= wx.getStorageSync('userinfo').openid;
      this.UserContext(openid);
    }

  },
  UserContext:function(openid){
    let data = {
      nopenid:this.data.nopenid,
      openid:openid
    }
    let rendata = app.requestfun(data, '/Api/Nobill/UserContext',true);    
  },
  gengduo:function(e){
    wx.switchTab({
      url: '/pages/job-hunting/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // let share = this.data.share;
    // if(share==1){
    //   wx.switchTab({
    //     url: '/pages/job-hunting/index/index',
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // let share = this.data.share;
    // if(share==1){
    //   wx.switchTab({
    //     url: '/pages/job-hunting/index/index',
    //   })
    // }
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
    let id = this.data.id;
    let nopenid =  this.data.nopenid;
    let share = 1;
    console.log(id,nopenid);
    return{
      title: '天大云聘',
      path: '/pages/job-hunting/details/details?id=' + id + '&nopenid=' +nopenid +'&share='+share,
    }
  }
})