// pages/job-hunting/index/index.js
const app = getApp();
const mapkey = 'JJPBZ-DXYYS-AT3OH-6AJSG-ZCP22-ECFYS';
const QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
const Util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '定位中',
    province:'定位中',
    currentCity: '',
    banner:[],
    current: 0,
    currentTab: 0,
    navData: [],
    list:[],
    page:1,
    pages:1,
    searchlist:[],
    locationlist:[],
    location:0,
    imageWidth:0, 
    imageHeight:0 ,
    msgList: [{id:1,text:"通知：天大平台正式开通了，找工作就来天大"},{id:2,text:"公告：今日邀约20人，到场面试16人，出发23人，入职10人"}],
    Time:'',        num:0,        showpic:null,        hidepic:null,
  },
  swiperChange:function(res){
    this.setData({
      current: res.detail.current
    })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
          this.setData({
              pixelRatio: res.pixelRatio,
              windowHeight: res.windowHeight,
              windowWidth: res.windowWidth
          })
      },
  }) 
    this.openCoordinates();
    this.label();
    this.getDynamicData();
  },
  index:function(e){
      var datad = {
        page:this.data.page,
        label:e
      };
      let rendata = app.requestfun(datad, '/Api/job/index',false);    
      rendata.then((v) => {
        if(v.data.status&&v.data.data){
          if(this.data.list.length>0){
            this.setData({
              list:this.data.list.concat(v.data.data),
              page:this.data.page+1
            })
          }else{
            this.setData({
              list:v.data.data,
              page:this.data.page+1
            })
          }
          
        }
        else{
          app.msg("已经到底了");
          return;
        }
      }) 
    
    
  },
  label:function(e){
    var datad = {};
    let rendata = app.requestfun(datad, '/Api/job/label',false);    
    rendata.then((v) => {
      if(v.data.status==1&&v.data.data){
        let id = v.data.data[0].id;
        let city_code = '';
        this.setData({
          navData:v.data.data
        })
        this.index(id);
      }else{
        app.msg("暂无标题");
        return;
      }
    }) 
  },
  // 首页动态数据逻辑处理
  getDynamicData() {
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          var datad = {
            code:res.code,
            position_id:5
          };
          let rendata = app.requestfun(datad, '/Api/business/index');    
          rendata.then((v) => {
              var banners = v.data.banner;
              var notice = v.data.notification;
              that.setData({
                banner: banners,
                notice:notice
              });   
          }) 
        } else {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        }
      }
    })
    
         
  }, 
 //打开定位
  openCoordinates: function () {
    let _this = this;
      wx.getLocation({
        type: 'wgs84',
        success: function(tude) {
          wx.setStorageSync('coordinates', tude);
          let qqmapsdk = new QQMapWX({
            key: mapkey
          });
          qqmapsdk.reverseGeocoder({
            location: { ...tude
            },
            success: function(res) {
              let province = res.result.address_component.province
              let city = res.result.address_component.city;
              let city_code =res.result.ad_info.adcode;
              _this.setData({
                province: province,
                city: city,
                // city_code:city_code
              });
            },
            fail: function(res) {
              showMsg("获取位置失败，请稍后再试");
            },
          });
        },
        fail: function() {
          showMsg("获取位置失败，请稍后再试");
        }
      });
  },
   // 城市切换
   bindBeginCityView: function () {
    wx.navigateTo({
      url: '/pages/job-hunting/city/city?currentCity=' + this.data.province,
    })
  },
  details:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/job-hunting/details/details?id='+id,
    })
  },
  switchNav(event){
    let id = event.currentTarget.dataset.id;
    var cur = event.currentTarget.dataset.current; 
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
        id:id,
        navScrollLeft: (cur - 2) * singleNavWidth
    })      
    if (this.data.currentTab == cur) {
        return false;
    } else {
      let id = this.data.navData[cur].id;
        this.setData({
            list:[],
            page:0,
            currentTab: cur
        })
        if(this.data.location==0){
          this.index(id);
        }
       if(this.data.location==1){
        this.location(id,this.data.city_code)
       }
    }
   
},
switchTab(event){
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
        currentTab: cur,
        navScrollLeft: (cur - 2) * singleNavWidth
    });
},
  tel:function(e){
    let mobile ='400-899-8877' ;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  locationlabel:function(code){
    let city_code = code;
    var datad = {};
    let rendata = app.requestfun(datad, '/Api/job/label',false);    
    rendata.then((v) => {
      if(v.data.status==1&&v.data.data){
        let id = v.data.data[0].id;
        this.setData({
          navlist:v.data.data
        })
        this.location(id,city_code);
      }else{
        app.msg("暂无标题");
        return;
      }
    }) 
  },
  location:function(l_id,code){
    var datad = {
      page:this.data.pages,
      label:l_id,
      city_code:code
    };
    let rendata = app.requestfun(datad, '/Api/job/index',false);    
    rendata.then((v) => {
      console.log(v.data.data);
      if(v.data.status&&v.data.data){
        if(this.data.location.length>1){
          this.setData({
            locationlist:this.data.location.concat(v.data.data),
            pages:this.data.pages+1,
            location:1
          })
        }else{
          this.setData({
            locationlist:v.data.data,
            pages:this.data.pages+1,
            location:1
          })
        }
        
      }
      else{
        this.setData({
          location:1
        })
        app.msg("已经到底了");
        return;
      }
    }) 
  },

  gosearch:function(e){
   wx.navigateTo({
    url: '/pages/job-hunting/search/search',
  })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this=this;    
    var num=_this.data.num;    
    var animation= wx.createAnimation({}) //创建一个动画实例
    _this.setData({      //创建一个计时器
        setTime:setInterval(function(){
            _this.setData({                
              num:num++
            })           
             if(num>_this.data.banner.length-1){
              num=0;
            }           //淡入
            animation.opacity(1).step({                  
              duration:1500
            }) //描述动画
            _this.setData({                
              showpic:animation.export()
            }) //输出动画
          //淡出
            animation.opacity(0).step({duration:1500})
            _this.setData({hidepic:animation.export()})
      },4000)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    if(currPage.__data__.cityNameTemp){
      let province = currPage.__data__.cityNameTemp.fullname;
      if(currPage.__data__.cityNameTemp.fullname.length>3){
        province= province.slice(0,2)
      }
      console.log(province);
      this.setData({
        province:province,
        city_code:currPage.__data__.cityNameTemp.id
      })
      this.locationlabel(currPage.__data__.cityNameTemp.id);
    }
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
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '玩命加载中',
      duration: 1000
    })
    let currentTab = this.data.currentTab;
    let id = this.data.navData[currentTab].id;
    let city_code = this.data.city_code;
    
    if(city_code){
      this.location(id,city_code);
    }else{
      this.index(id);
    }
   
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})