//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   /*  role_name:'', 
    pagemessage:'',   
    um3: 1,
    um2: 0,
    um1: 1,   */     
    ifName1:false,
    ifNames: false,
    ifName: false,//是否隐藏对话框
    currentSelectTripType: 'pinche',
    logined: false,
    banner: null,
    start:1,
    list:null,
    //count:0,
    sysNotice1:0,
    sysNotice2:0,
    sysNotice3:0,
    sysNotice4:0, 
    sysNotice5:0, 
    start_timer:null,
    notice: [],// 未读消息
  },  
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
 // 菜单链接
//  checkLogin:function(e) {
//   //console.loge.currentTarget.dataset.url);
//   var url = e.currentTarget.dataset.url;
//   if('..//'==url){
//     wx.showToast({ icon: "none", title: '请先登录' });
//     setTimeout(() => { wx.navigateTo({ url: '/pages/loginByWechat/loginByWechat' }) }, 1500);
//   }else{
//     wx.redirectTo({ url: url });  
//     //wx.redirectTo({ url: "../home/home"  }) 
//   }

// },

  onLaunch: function () { 
    
  },  
    
  onLoad: function () {   
    this.notice = app.globalData.jop_msg

    console.log(this.notice.msg2)
    //console.log5461313);
    //console.logwx.getStorageSync('rolename'));  
    /*var rolenames = wx.getStorageSync('rolename');
    this.setData({role_name:rolenames});
    var pagemessage = wx.getStorageSync('pagemessage');
    this.setData({pagemessage:pagemessage});*/

   // this.getDynamicData(); // 获取数据
    // 轮询未读消息数量
  /*   var start_timer = setInterval(()=>{
      var counts = wx.getStorageSync('messagecount');
      this.setData({
        count:counts
      });
      //console.log46464);
    },1000); 
    this.setData({
      start_timer:start_timer
    }); */
    
  },
  onShow(){
    this.setData({
      notice: app.globalData.jop_msg
    })
    // app.globalData.jop_notice = 14
    console.log(this.notice)
  },
  /**
   * 生命周期函数--监听页面卸载
   */
 /*  onUnload: function () {
    //console.log'页面走了onUnload');
      clearInterval(this.data.start_timer);
  }, */


  // getDynamicData:function(){
  //   let _this = this;
  //   var datad = {
  //   };
  //   let rendata = app.requestfun(datad, '/Api/Message/index'); 
  //   rendata.then((v) => {
  //     console.log(v);
  //     var lists = v.data.list;
  //     let i =0;
  //     let i1 =0;
  //     let i2 =0;
  //     let i3 =0;
  //     let i4 =0;
  //     let i5 =0;
  //     let lnt = lists.length;
  //     for(;i<lnt;){
  //       if(lists[i].mesype ==1){
  //         i1=i1+1;
  //       }
  //       if(lists[i].mesype ==2){
  //         i2=i2+1;
  //       }        
  //       if(lists[i].mesype ==3){
  //         i3=i3+1;
  //       }
  //       if(lists[i].mesype ==4){
  //         i4=i4+1;
  //       }
  //       if(lists[i].mesype ==5){
  //         i5=i5+1;   
  //       }
  //       i=i+1;
  //     }  
  //     _this.setData({
  //       list:lists,
  //       sysNotice1:i1,
  //       sysNotice2:i2,
  //       sysNotice3:i3,
  //       sysNotice4:i4,
  //       sysNotice5:i5,        
  //     });
  //     //console.logv.data);              
  //   })     
  // }
})
