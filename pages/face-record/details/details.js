// pages/face-record/details/details.js
var util = require("./../../../utils/util.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示

    selectData: ['都可以','省内', '省外'], //下拉列表的数据
    index: '', //选择的下拉列 表下标,
    show1:false,
   
    prepareentryid:'',
    enterprise:[],
    idx:'',
    show2:false,
    situation:['考虑当中','明确拒绝','同意上班'],
    ix:'',
    down:0,
    down1:0,
    w:0,
    list:{},
    worklest:[],
    description:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.Time(new Date());
    let list = JSON.parse(options.list);
    console.log(list);
    let work={};
    let wolist={};
    let worklest = list.worklest;
    let w ='';
    if(worklest){
      for (let index = 0; index < worklest.length; index++) {
        work = worklest[0];
        wolist[index]=worklest[index];
      }
      w='2';
    }else{
      w='3'
    }
    let prepareentryid = list.prepareentryid;
    let type = options.type; 
    let search = options.search;
    let sl = options.sl;
    this.GetCompany(prepareentryid);
    this.setData({
      description:list.description,
      w:w,
      work:work,//显示第一条
      wolist:wolist,//多条
      worklest:worklest,
      sl:sl,
      time:list.startdate,
      index:list.worksite,
      ix:list.status-2,
      type:type,
      list:list,
      search:search
    });
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
  bindDateChange: function(e) {
    this.setData({
      show:false,
      show1:false,
      show2:false,
      time: e.detail.value
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
      show1:false,
      show2: false,
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
  // 点击下拉显示框
  selectTap2() {
    this.GetCompany();
    this.setData({
      show:false,
      show1:false,
      show2: !this.data.show2,
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  optionTap2(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      ix: Index,
      show2: !this.data.show2
    });
  },
  optionTap1(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let prepareentryid = e.currentTarget.dataset.id;
    let enterprises={};
    for (let index = 0; index < this.data.enterprise.length; index++) {
      if(prepareentryid==this.data.enterprise[index]['id']){
        enterprises=this.data.enterprise[index];
      }
    }
    this.setData({
      idx:enterprises.username,
      prepareentryid:prepareentryid,
      show1: !this.data.show1
    });
  },
  showdowns:function(e){
    let down1=this.data.down1;
    if(down1==1){
      this.setData({
        down1:0
      })
    }
    if(down1==0){
      this.setData({
      
      down1:1
      })
    }
  },
  showdown:function(e){
    let down=this.data.down;
    if(down==1){
      this.setData({
        down:0
      })
    }
    if(down==0){
      this.setData({
        down:1
      })
    }
  },
  // description:function(e){
  //   let descriptione =e.detail.value;
  //   this.setData({
  //     descriptione:descriptione
  //   })
  // },
   determine:function(e){
    let that = this;
    let status = parseInt(this.data.ix);
   if(status>=0&&status<3){
     status=status+2;
   }else{
    app.msg("请选择面试情况");
    return
   }
    let worksite =parseInt(this.data.index);
    if(worksite>=0&&worksite<3){
      worksite=worksite;
    }
    let prepareentryid = this.data.prepareentryid;
    let description = e.detail.value.description;
    if(!description){
      app.msg("请输入面试备注");
      return
    }
    wx.login({
      success (res) {
        if (res.code) {
          let data ={
            code:res.code,
            userid:that.data.list.id,
            description:description,
            worksite:worksite,
            prepareentryid:prepareentryid,
            startdate:that.data.time,
            status:status
          }
          let rendata = app.requestfun(data, '/Api/Interviewvue/SaveInterviewinfo');    
          rendata.then((v) => {
            if(v.data.status==1){
              wx.showToast({
                title: '面试记录保存成功',
                duration:2000,//显示时长
                icon:'none',
                success:function(){ 
                  setTimeout(function() {
                    wx.navigateTo({
                      url: '/pages/face-record/index/index',
                    })
                  }, 2000);
                },
              })
            }
          })
        } else {
          app.mag("网络延迟，请重新加载");
          return
        }
      }
    })
  },
  cancel:function(){
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[ pages.length - 2 ];  
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      currentTarget:this.data.type,
      type : -1,
      search : this.data.search,
      sl:this.data.sl
    })
    wx.navigateBack({
      data:1
    })
  },
  mobile:function(e){
    let mobile = e.currentTarget.dataset.mobile;
    wx.makePhoneCall({
      phoneNumber: mobile
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