// packageB/about/policy/policy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  detail: function(id) {
    App.get("scenic/detail", {
      id: id
    }).then(res => {
      let scenic_img = '';
      let imgUrls = [];
      res.pic.map(pic => {
        if (pic.scenic_first == 1) {
          scenic_img = pic.url;
        }
        if (pic.type != '房间' && imgUrls.length < 5) {
          imgUrls.push(pic.url);
        }
      });
      WxParse.wxParse('article', 'html', res.description, this, App.globalData.baseUrl);
      this.setData({
        scenic: res,
        scenic_img: scenic_img,
        imgUrls: imgUrls,
        imgUrlsLength: imgUrls.length,
        scenic_id: res.id
       
      });
      this.getDistribution("scenic", this.data.scenic_id)
    });
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