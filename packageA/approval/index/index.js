// packageA/approval/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    data:'请选择时间',
    youstart:'',
    youend:'',
    list:[],
    page:1,
    strip:0,
    isPickerRender: false,
    isPickerShow: false,
    startTime: "2019-01-01",
    endTime: "2019-12-01",
    pickerConfig: {
      endDate: true,
      column: "second",
      dateLimit: false,
      initStartTime: "",
      initEndTime: "",
      limitStartTime: "",
      limitEndTime: ""
    },
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.partnerExamineList(this.data.youstart,this.data.youend,this.data.page,this.data.currentTab);
  },
  partnerExamineList:function(youstart,youend,page,currentTab){
    let datad={
      page:page,
      start_time:youstart,
      end_time:youend,
      status:currentTab
    }
    let rendata = app.requestfun(datad, '/Api/UserAuto/partnerExamineList',true); 
    rendata.then((v)=>{
     if(v.data.status==1&&v.data.data){
       this.setData({
         list:this.data.list.concat(v.data.data),
         page:this.data.page+1,
         strip:this.data.strip+v.data.data.length
       })
     }else{
       app.msg("暂无更多数据");
       return;
     }
    })
  },
  pickerShow: function() {
    this.setData({
      list:[],
      page:0,
      strip:0,
      isPickerShow: true,
      isPickerRender: true,
      chartHide: true
    });
  },
  pickerHide: function() {
    this.setData({
      isPickerShow: false,
      chartHide: false
    });
  },
  bindPickerChange: function(e) {
    console.log("picker发送选择改变，携带值为", e.detail.startTime);
  },
  setPickerTime: function(val) {
    console.log(val)
    let youstart = val.detail.startTime;
       youstart= youstart.replace(/\s[\x00-\xff]*/g,'');
    let youend = val.detail.endTime;
        youend = youend.replace(/\s[\x00-\xff]*/g,'')
    let data = youstart + '至' + youend
    let page= 0
    this.setData({
      data:data,
      youstart:youstart,
       youend:youend,
    })
    this.partnerExamineList(youstart,youend,page,this.data.currentTab);
  } ,
  details:function(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let currentTab = this.data.currentTab;
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/packageA/approval/details/details?id='+id +'&index='+index + '&currentTab='+currentTab + '&type=' +type,
    })
  },
  swichNav: function (e) {
    console.log(e.target.dataset.current);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
    return false;
    } else {
      that.setData({
      currentTab: e.target.dataset.current,
      page:0,
      list:[],
      strip:0,
      data:'请选择时间'
    })
    let youstart = '';   
    let youend = '';
    let page= 0
    this.partnerExamineList(youstart,youend,page,e.target.dataset.current)
  }
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    if(currPage.__data__.id&&currPage.__data__.currentTab==0) {
      let list = this.data.list;
      list.splice(currPage.__data__.id,1);//删除
        this.setData({
          list:list,
          strip:this.data.strip-1,
          currentTab:currPage.__data__.currentTab
        })
        
      }
    if(currPage.__data__.id&&currPage.__data__.currentTab==1){
      let list = this.data.list;
      list[currPage.__data__.id].status=currPage.__data__.status;//修改
        this.setData({
          list:list,
          currentTab:currPage.__data__.currentTab
        })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '玩命加载中',
      duration: 1000
    })
    let youstart = this.data.youstart;
    let youend = this.data.youend;
    let page = this.data.page;
    let currentTab = this.data.currentTab
    this.partnerExamineList(youstart,youend,page,currentTab);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})