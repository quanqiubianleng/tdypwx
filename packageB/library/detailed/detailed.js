// packageB/library/detailed/detailed.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    youstart:null,
    youend:null,
    userlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.TalentsStatistics();
  },
  TalentsStatistics:function(){
    let that = this;
    var datad = {
      starttime:this.data.youstart,
      terminationtime:this.data.youend
    };
    let rendata = app.requestfun(datad, '/Api/Talentpool/TalentsStatistics'); 
    rendata.then((v)=>{
      if(v.data.status==1&&v.data.res){
        that.setData({
          userlist:v.data.res,
        })
      }else{
        app.msg("暂无数据");
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
    this.setData({
      show: false,
      youstart:youstart,
      youend:youend
    });
    this.TalentsStatistics();
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