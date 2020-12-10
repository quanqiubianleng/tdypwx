//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    type:0,
    list:{},
    lenlist:'',    
    startdate:'2020-01-22',
    enddate:'2021-10-22',
    logined: false,
    banner: null,
    start:1,
    userInfo: {},
    hasUserInfo: false,
    onPageScroll:null,
    loadingHidden:false,
  },
  onPageScroll: function (e) {
    var _this = this;
    //console.log(e.scrollTop);
    _this.setData({
      scrollTop:e.scrollTop
    })},  

  bindDateChanges: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value,
      loadingHidden: false
    })

    var  enddate = this.data.enddate; 

    var datad = {
      token: wx.getStorageSync('token'),
      type:this.data.type,
      enddate:enddate,
      startdate:e.detail.value
    };
    let rendata = app.requestfun(datad, '/Api/Personal/getlistinfo');
    rendata.then((v) => {
      if (v.data.token) {
        //wx.showToast({ icon: "none", title: '成功' });
        //console.log(v.data);
        var lists=v.data.list;
        var arrb=new Array();   
        arrb = lists;
        let lenst = '';
        if(arrb)
          lenst = arrb.length;        
        this.setData({
          list: lists,
          lenlist:lenst,
          loadingHidden: true
        })         
      }
    })    
  },  
  bindDateChangee: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value,
      loadingHidden: false
    })

    var startdate = this.data.startdate;  
    var datad = {
      token: wx.getStorageSync('token'),
      type:this.data.type,
      enddate: e.detail.value,
      startdate:startdate
    };
    let rendata = app.requestfun(datad, '/Api/Personal/getlistinfo');
    rendata.then((v) => {
      if (v.data.token) {
        //wx.showToast({ icon: "none", title: '成功' });
        //console.log(v.data);
        var lists=v.data.list;
        var arrb=new Array();   
        arrb = lists;
        let lenst = '';
        if(arrb)
          lenst = arrb.length;        
        this.setData({
          list: lists,
          lenlist:lenst,
          loadingHidden: true
        })         
      }
    })   

  },   
 // 菜单链接
 checkLogin:function(e) {
  //console.log(e.currentTarget.dataset.url);
  var url = e.currentTarget.dataset.url;
  wx.redirectTo({ url: url })  
  //wx.redirectTo({ url: "../home/home"  }) 

},
  
    
  onLoad: function (option) {
    //console.log(option.id);
    var type = option.id;
    this.setData({
      type: type,
    });        
    var datad = {
      token: wx.getStorageSync('token'),
      type:this.data.type
    };
    let rendata = app.requestfun(datad, '/Api/Personal/getlistinfo');
    rendata.then((v) => {
      if (v.data.token) {
        //wx.showToast({ icon: "none", title: '成功' });
        //console.log(v.data);
        var lists=v.data.list;
        var arrb=new Array();   
        arrb = lists;
        let lenst = '';
        if(arrb)
          lenst = arrb.length;  
        this.setData({
          list: lists,
          lenlist:lenst,
          loadingHidden: true
        })         
      }
      else{
        this.setData({
          loadingHidden: true
        });  
        wx.showToast({ icon: "none", title: '请先登录' })
        setTimeout(() => { wx.redirectTo({ url: '/pages/loginByWechat/loginByWechat' }) }, 1500)
      }
      //console.log(v.data);
    })
  },
  getUserInfo: function(e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
