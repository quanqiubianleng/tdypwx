// pages/entry/details/details.js
var util = require("./../../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    show1:false,
    enterprise:[],
    shop_id:'',
    idx:'',
    reason:'',
    currentTab:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.Time(new Date());
    let list = JSON.parse(options.list);
    let type = options.type;
    let search = options.search;
    let id = options.id;
    console.log(list);
    this.setData({
      shop_id:list.shop_id,
      id:id,
      search:search,
      type:type,
      list:list,
      date: time
    });
    this.GetCompany();
  },
  mobile:function(e){
    let mobile = e.currentTarget.dataset.mobile;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  GetCompany:function(p_id){
    let that = this;
    let enterprise =this.data.enterprise;
    if(enterprise.length<=0){
      wx.login({
        success (res) {
          if (res.code) {
            let data ={
              code:res.code
            }
            let rendata = app.requestfun(data, '/Api/Interviewvue/GetCompany');    
            rendata.then((v) => {
            let companylist = v.data.companylist;
            let enterprises = {};
            for (let index = 0; index < companylist.length; index++) {
              if(p_id==companylist[index]['id']){
                enterprises=companylist[index];
              }
            }
            that.setData({
              idx:enterprises.username,
              enterprise:companylist
            })
            })
          } else {
            app.mag("网络延迟，请重新加载");
            return
          }
        }
      })
    }else{
      that.setData({
        enterprise:enterprise
      })
    }
    
  },
  optionTap1(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let shop_id = e.currentTarget.dataset.id;
    let enterprises={};
    let sh = 0;
    for (let index = 0; index < this.data.enterprise.length; index++) {
      if(shop_id==this.data.enterprise[index]['id']){
        enterprises=this.data.enterprise[index];
      }
    }
    if(shop_id&&Index){
      sh=1;
    }
    this.setData({
      sh:sh,
      idx:enterprises.username,
      shop_id:shop_id,
      show1: !this.data.show1
    });
  },
  // 点击下拉显示框
  selectTap1() {
    this.setData({
      show2:false,
      show:false,
      show1: !this.data.show1,
    });
  },
  bindDateChange: function(e) {
    this.setData({
      show:false,
      show1:false,
      date: e.detail.value
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show1:false,
      show: !this.data.show,
    });
  },
  // 点击下拉列表
  optionTap(e) {
    // let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    // this.setData({
    //   index: Index,
    //   show: !this.data.show
    // });
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
    return false;
    } else {
    that.setData({
    currentTab: e.target.dataset.current,
    })
   } 
  },
  close:function(){
    this.setData({
      show1:false,
      show: false,
    });
  },
  reason:function(e){
    
    this.setData({
      reason:e.detail.value
    })
  },
  determine:function(e){
    let that = this;
    wx.showLoading({
      title: '正在提交',
      duration: 1000,
      success:function(){
        wx.login({
          success (res) {
            let shopid = that.data.shop_id;
            let type = '';
            if(that.data.currentTab==0){
              type=1;
            }
            if(that.data.currentTab==1||that.data.currentTab==3){
              type=4;
            }
            if(that.data.currentTab==2){
              type=3;
            }
            if(type==null||type==''){
              app.msg("请选择确认到厂");
              return;
            }
            if (res.code) {
              let data ={
                code:res.code,
                type:type,
                reason:that.data.reason,
                transitiondate:that.data.date,
                shopid:shopid,
                userid:that.data.list.id
              }
              console.log();
              let rendata = app.requestfun(data, '/Api/invites/inconfirmation');    
              rendata.then((v) => {
                if(v.data.status==1){
                  wx.showToast({
                    title: '操作成功',
                    duration:2000,//显示时长
                    icon:'none',
                    success:function(){ 
                      setTimeout(function() {
                        that.cancel();
                      }, 2000);
                    },
                  }) 
                }
              })
            } else {
              app.msg("网络延迟,请重试");
              return;
            }
          }
        })
      }
    })
    
  },
  cancel:function(){
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[ pages.length - 2 ];  
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      type : this.data.type,
      search:this.data.search,
      y:-1,
      id:this.data.id
    })
    wx.navigateBack({
      data:1
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