// packageC/job-hunting/details/details.js
const app = getApp();
const WxParse = require('../../../utils/wxParse/wxParse.js');
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    console.log(id);
    this.setData({
      id:id
    })
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
      this.setData({
        show1:true,
        passdata:''
      })
    }
    if(passdata){
      this.setData({
        show1:true,
        passdata:passdata
      })
    }
  },
  confirm:function(){
    this.setData({
      show:false
    })
  },
  cancel:function(e){
    this.setData({
      show:false
    })
  },
  bubao:function(e){
    this.setData({
      show1:false
    })
  },
  async bindgetphonenumber (e){
    let that =this;
    let code = await new Promise((resolve) => {
      wx.login({success: (res) => { if (res.code) resolve(res.code) } })});
      code = await new Promise((resolve) => {
      wx.login({ success: (res) => { if (res.code) resolve(res.code) } })
    });
    if(e.detail.errMsg=='getPhoneNumber:fail user deny'){
      app.msg('获取手机号失败');
      return;
    }
    if(e.detail.errMsg!='getPhoneNumber:fail user deny'){
      var datad = {
        iv: e.detail.iv,
        encryptedData:e.detail. encryptedData,
        code: code
      };
      let rendata = app.requestfun(datad, '/Api/login/GetPhoneNumber'); 
      rendata.then((v)=>{
        if(v.data.passdata!=''){
          wx.setStorageSync('passdata',v.data.passdata);
          wx.login({
            success (res) {
              let data ={
                code:res.code,
                passdata:v.data.passdata,
                billid:that.data.id,
                type:2
              }
              let rendata = app.requestfun(data, '/Api/Apply/index'); 
              rendata.then((v)=>{
                if(v.data.status==1){
                  wx.showModal({
                    title: '提示',
                    content: '报名成功',
                    showCancel: false, 
                    success: function (sm) {
                      if (sm.confirm) {
                        setTimeout(function() {
                          wx.navigateBack();
                         }, 1000);
                      }
                      }
                    })
                }else{
                  wx.showModal({
                    title: '提示',
                    content: '报名失败',
                    showCancel: false, 
                    success: function (sm) {
                      if (sm.confirm) {
                        setTimeout(function() {
                          wx.navigateBack();
                         }, 1000);
                      }
                      }
                    })
                }     
              })
            }
          })
        }     
      })
    }
  },
  bao:function(e){
  let that = this;
    wx.login({
      success (res) {
        let data ={
          code:res.code,
          passdata:that.data.passdata,
          billid:that.data.id,
          type:2
        }
        let rendata = app.requestfun(data, '/Api/Apply/index'); 
        rendata.then((v)=>{
          if(v.data.status==1){
            wx.showModal({
              title: '提示',
              content: '报名成功',
              showCancel: false, 
              success: function (sm) {
                if (sm.confirm) {
                  setTimeout(function() {
                    wx.navigateBack();
                   }, 1000);
                }
                }
              })
          }else{
            wx.showModal({
              title: '提示',
              content: '报名失败',
              showCancel: false, 
              success: function (sm) {
                if (sm.confirm) {
                  setTimeout(function() {
                    wx.navigateBack();
                   }, 1000);
                }
                }
              })
          }
                
        })
      }
    })
  },
  nobillinfo:function(id,nopenid){
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
              nopenid:v.data.openid,
              keep:keep
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
    wx.navigateTo({
      url: '/pages/advice/advice',
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