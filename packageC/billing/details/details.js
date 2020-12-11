// packageC/billing/details/details.js
const app = getApp();
const WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:app.globalData.baseUrl,
    currentTab:1,
    toView:'nav1',
    list: [],
    show:false,
    show1:false,
    enroll:2,
    share:false,
    scrollTop:0,
    keep:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let nopenid= options.nopenid;
    console.log(nopenid);
    this.setData({
      id:id,
      nopenid:nopenid
    })
    this.nobillinfo(id,nopenid);
  },

  keep:function(e){
    let keep = this.data.keep;
    if(keep==1){
      app.msg("你也收藏，无需再次收藏")
    }else{
      app.msg("收藏成功")
      this.setData({
        keep:1
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
    console.log(target);
    this.setData({
      //  toView: target,
      currentTab:current
    })
    var me = this;
      var query = wx.createSelectorQuery().in(me);
      query.selectViewport().scrollOffset()
      query.select("#"+target).boundingClientRect();
      query.exec(function (res) {
        console.log(res);
        var miss = res[0].scrollTop + res[1].top + 60;
        wx.pageScrollTo({
          scrollTop: miss,
          duration: 300
        });
         
      });
    console.log(this.data.toView);
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
                type:1
              }
              let rendata = app.requestfun(data, '/Api/Apply/index'); 
              rendata.then((v)=>{
                if(v.data.status==1){
                  wx.showToast({
                    title: '报名成功',
                    duration:2000,//显示时长
                    icon:'none',
                    success:function(){ 
                      setTimeout(function() {
                        wx.navigateTo({
                          url: '/packageC/billing/index/index?nopenid?='+that.data.nopenid,
                        })
                      }, 1000);
                    },
                  })
                }else{
                  app.msg("报名失败");
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
          type:1
        }
        let rendata = app.requestfun(data, '/Api/Apply/index'); 
        rendata.then((v)=>{
          if(v.data.status==1){
            wx.showToast({
              title: '报名成功',
              duration:2000,//显示时长
              icon:'none',
              success:function(){ 
                setTimeout(function() {
                  wx.navigateTo({
                    url: '/packageC/billing/index/index?nopenid?='+that.data.nopenid,
                  })
                }, 1000);
              },
            })
          }else{
            app.msg("报名失败");
            return;
          }
                
        })
      }
    })
  },
  nobillinfo:function(id,nopenid){
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
        let data = {
          code:res.code,
          nopenid:nopenid ,
          billid :id 
        }
        let rendata = app.requestfun(data, '/Api/nobill/nobillinfo');    
        rendata.then((v) => {
          if(v.data.status==1&&v.data.billinfo){
           WxParse.wxParse('emolumentinfo', 'html', v.data.billinfo.emolumentinfo, that);
            WxParse.wxParse('meals', 'html', v.data.billinfo.meals, that);
            WxParse.wxParse('putup', 'html', v.data.billinfo.putup, that);
            WxParse.wxParse('nodescription', 'html', v.data.billinfo.nodescription, that);
            WxParse.wxParse('recommend', 'html', v.data.billinfo.recommend, that);
            WxParse.wxParse('astrict', 'html', v.data.billinfo.astrict, that);
            WxParse.wxParse('description', 'html', v.data.billinfo.description, that);
            WxParse.wxParse('workdate', 'html', v.data.billinfo.workdate, that);
            WxParse.wxParse('waywork', 'html', v.data.billinfo.waywork, that);
            WxParse.wxParse('aboutus', 'html', v.data.billinfo.aboutus, that);
            WxParse.wxParse('rest', 'html', v.data.billinfo.rest, that);
            that.setData({
              list:v.data.billinfo,
              nopenid:v.data.openid
            })
          }
         
        })
        } 
      }
    })
  },
  tel:function(e){
    let mobile ='400-899-8877' ;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  onClose:function(e){
    this.setData({
      share:false
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
      query.select('#nav4').boundingClientRect(rect=>{  
        let height = rect.height+rect.top-120;  
        this.setData({
          h3:height
        })
        }).exec();
      query.select('#nav5').boundingClientRect(rect=>{  
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
    this.setData({
      show:false,
      show1:false
    })
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
    let id = this.data.id;
    let nopenid= this.data.nopenid;
    console.log(id,nopenid);
    return {
      title: '天大云聘系统',
      // path: '/pages/route/route?q=share&type=scenic&id=' + this.data.scenic.id + '&user_id=' + user_id,
      path: '/packageC/billing/details/details?id='+id +'&nopenid='+nopenid,
      desc: '',
      success: function (res) {
        app.msg("分享成功");
      }
    }
  },
  shopper:function(e){
    this.setData({
      share:true
    })
  },
   // 跳转分享图片
   toPoster: function () {
    wx.navigateTo({
      url: '/pages/poster/poster?type=scenic&id=' + this.data.id,
    })
  },
  /* 
    分享朋友圈
  */
  // onShareTimeline:function(){
  //   let id = this.data.id;
  //   let nopenid= this.data.nopenid;
  //   console.log(id,nopenid);
  //   return {
  //     title: '天大云聘系统',
  //     path: '/packageC/billing/details/details?id='+id +'&nopenid='+nopenid,
  //     desc: '',
  //     success: function (res) {
  //       app.msg("分享成功");
  //     }
  //   }
  // }
})