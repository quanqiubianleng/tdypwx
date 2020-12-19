// packageD/message/type.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    productList: [],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.id;
      this.setData({
        type:type
      })
   
  },
  collectionList:function(){
    let data = {
      page:this.data.page,
      mesype:this.data.type,
      status:this.data.currentTab
    }
    let rendata = app.requestfun(data, '/Api/notice/noticeList',true);    
    rendata.then((v) => {
      if(v.data.status==1&&v.data.data){
        this.setData({
          productList:v.data.data
        })
      }
    })
  },
  /**
   * 显示删除按钮
   */
  showDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex
    this.setXmove(productIndex, -180)
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
    console.log(id,index);
    wx.showModal({
      title: '提示',
      content: '确定要清楚该数据吗？',
      success: function (sm) {
        if (sm.confirm) {
          let data = {
            id:id,
          }
          let rendata = app.requestfun(data, '/Api/notice/setDelete',true);    
          rendata.then((v) => {
            if(v.data.status==1){
              let productList = that.data.productList
                productList.splice(index,1);
              that.setData({
                productList:productList
              })
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
        }
      })
   
  },

  //  tab切换逻辑
  swichNav: function( e ) {
  
    var that = this;

    if( this.data.currentTab === e.target.dataset.current ) {
        return false;
    } else {
        that.setData( {
            currentTab: e.target.dataset.current,
            page:1,
            productList:[]
        })
    }
    that.collectionList();
  },
  //设置为已读
  read:function(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let data = {
      id:id,
    }
    let rendata = app.requestfun(data, '/Api/notice/setLook',true);    
    rendata.then((v) => {
      if(v.data.status==1){
        let productList = this.data.productList
          productList.splice(index,1);
        this.setData({
          productList:productList
        })
      }
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
    this.collectionList();
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