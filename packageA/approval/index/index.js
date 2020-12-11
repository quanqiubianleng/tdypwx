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
    strip:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.partnerExamineList(this.data.youstart,this.data.youend,this.data.page);
  },
  partnerExamineList:function(youstart,youend,page){
    let datad={
      page:page,
      start_time:youstart,
      end_time:youend
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
  gotime:function(e){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    let youstart=start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
    let youend = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
    let data = youstart+'至'+youend;
    let page=0;
    this.setData({
      show: false,
      data: data,
      youstart:youstart,
      youend:youend,
      list:[],
      strip:0
    });
    this.partnerExamineList(youstart,youend,page);
  }, 
  details:function(e){
    console.log(e);
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/packageA/approval/details/details?id='+id +'&index='+index,
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
 if(currPage.__data__.id) {
   let list = this.data.list;
   list.splice(currPage.__data__.id,1);//view删除了对应的input值也要删掉
    this.setData({
      list:list
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
    this.partnerExamineList(youstart,youend,page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})