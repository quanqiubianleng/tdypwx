// packageB/library/detailed/detailed.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    youstart:null,
    youend:null,
    userlist:[],
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
    }
    
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
  pickerShow: function() {
    this.setData({
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
    //  let youstart= date.replace(/\s[\x00-\xff]*/g,'')
    // this.setData({
    //   youstart:null,
    // youend:null,
    // })
    // this.getData(this.data.sensorList[e.detail.value].id);
   
   
  },
  setPickerTime: function(val) {
    console.log(val)
    let youstart = val.detail.startTime;
       youstart= youstart.replace(/\s[\x00-\xff]*/g,'');
    let youend = val.detail.endTime;
        youend = youend.replace(/\s[\x00-\xff]*/g,'')
    this.setData({
      youstart:youstart,
       youend:youend,
    })
    
  } ,
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