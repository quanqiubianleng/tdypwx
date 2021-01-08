// packageC/applied/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    productList: [],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  record:function(){

    let data = {
      page:this.data.page,
      openid:this.data.userInfo.openid
    }
    let rendata = app.requestfun(data, '/Api/Bming/record',true);    
    rendata.then((v) => {
      if(v.data.status==1&&v.data.data){
        this.setData({
          productList:this.data.productList.concat(v.data.data)
        })
      }else{
        app.msg("已经到底了");
        return;
      }
    })
  },
    /**
   * 显示删除按钮
   */
  showDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex
    this.setXmove(productIndex, -65)
  },

  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex

    this.setXmove(productIndex, 0)
  },

  /**
   * 设置movable-view位移
   */
  setXmove: function (productIndex, xmove) {
    let productList = this.data.productList
    productList[productIndex].xmove = xmove
    this.setData({
      productList: productList
    })
  },

  /**
   * 处理movable-view移动事件
   */
  handleMovableChange: function (e) {
    if (e.detail.source === 'friction') {
      if (e.detail.x < -30) {
        this.showDeleteButton(e)
      } else {
        this.hideDeleteButton(e)
      }
    } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
      this.hideDeleteButton(e)
    }
  },
  /**
   * 删除产品
   */
  handleDeleteProduct: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    console.log(id,index)
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
            let data = {
              id:id,
            }
            let rendata = app.requestfun(data, '/Api/Bming/del',true);    
            rendata.then((v) => {
              if(v.data.status==1){
                app.msg("删除成功");
                let productList = that.data.productList
                  productList.splice(index,1);
                that.setData({
                  productList:productList
                })
              }else{
                app.msg("删除失败");
              }
            })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
        }
      })
   
  },
  details:function(e){
    let id = e.currentTarget.dataset.id;
    let pathway = e.currentTarget.dataset.pathway;
    let openid = e.currentTarget.dataset.openid;
    if(pathway==2){
      wx.navigateTo({
        url: '/pages/job-hunting/details/details?id='+id + '&nopenid=' +openid,
      })
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
    let isLogin = app.globalData.isLogin; 
    let userInfos= wx.getStorageSync('userinfo').openid
    if(!isLogin||!userInfos){
      wx.navigateTo({
        url: '/pages/loginByWechat/loginByWechat',
      })
      return;
    }
     this.setData({
       userInfo: userInfos,
     }) 
     this.record();
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
    this.setData({
      page:this.data.page+1
    })
   this.record();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})