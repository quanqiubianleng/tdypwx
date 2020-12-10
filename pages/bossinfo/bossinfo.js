// pages/bossinfo/bossinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countTimer: null,// 设置 定时器
    progress_txt: '300人',// 提示文字
    list:null, 
    start_timer:null,
    counts:0,    
    maxus:null,//面试初始化时，从后台先拉取柱状图中的最大值。计算柱状比例。 
  },

  showbarmone:function(i,count,whosid,bankid){
    this.setData({
      count: 0
    });
    var counts =0;
    //背景
    const ctx = wx.createCanvasContext(bankid)       
    ctx.setStrokeStyle('#D5F1FC')
    ctx.beginPath()
    ctx.setLineCap('round')
    ctx.setLineWidth(20)
    ctx.moveTo(10, 10)
    ctx.lineTo(10, 90)
    ctx.stroke()
    ctx.draw()
    //动态前景
    this.countTimer = setInterval(() => {
      if (counts <= count) {
        const ctxs = wx.createCanvasContext(whosid)         
        ctxs.setStrokeStyle('#2FB9EF')
        ctxs.beginPath()
        ctxs.setLineCap('round')
        ctxs.setLineWidth(20)
        ctxs.moveTo(10, 90-counts)
        ctxs.lineTo(10, 90)
        ctxs.stroke()

        ctxs.setFontSize(10)
        ctxs.fillText(count, 0, 100-counts)


        ctxs.draw() 
        counts++;
      } else {
        clearInterval(this.countTimer);
      }
    }, 30)
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showbarmone(1,80,'canvasProgressbg1s','canvasProgressbg1');
    this.showbarmone(2,60,'canvasProgressbg2s','canvasProgressbg2'); 
    this.showbarmone(3,80,'canvasProgressbg3s','canvasProgressbg3');     
    this.showbarmone(4,10,'canvasProgressbg4s','canvasProgressbg4');     
    this.showbarmone(5,50,'canvasProgressbg5s','canvasProgressbg5'); 
    this.showbarmone(6,30,'canvasProgressbg6s','canvasProgressbg6');
    this.showbarmone(7,70,'canvasProgressbg7s','canvasProgressbg7'); 
    this.showbarmone(8,60,'canvasProgressbg8s','canvasProgressbg8');     
    this.showbarmone(9,50,'canvasProgressbg9s','canvasProgressbg9');     
    this.showbarmone(10,60,'canvasProgressbg10s','canvasProgressbg10'); 
    this.showbarmone(11,30,'canvasProgressbg11s','canvasProgressbg11');
    this.showbarmone(12,50,'canvasProgressbg12s','canvasProgressbg12');  
    
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