// packageC/keep/index/index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    productList: [],
    page:1
  },

  onLoad: function (options) {
    let type = options.type;
    if(type==1){
      wx.setNavigationBarTitle({title: '报名记录'})
      this.record();
    }
    if(type==2){
      wx.setNavigationBarTitle({title: '我的收藏'})
      this.collectionList();
    }
    if(type==3){
      wx.setNavigationBarTitle({title: '浏览记录'})
    }
    this.setData({
      type:type
    })

  },
  //报名记录

  record:function(){
    let data = {
      page:this.data.page
    }
    let rendata = app.requestfun(data, '/Api/Bming/record',true);    
    rendata.then((v) => {
      if(v.data.status==1&&v.data.data){
        this.setData({
          productList:v.data.data
        })
      }
    })
  },
  //收藏记录
  collectionList:function(){
    let data = {
      page:this.data.page
    }
    let rendata = app.requestfun(data, '/Api/job/collectionList',true);    
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
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          let data = {
            j_id:id,
            status:0
          }
          let rendata = app.requestfun(data, '/Api/job/collection',true);    
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
  details:function(e){
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/job-hunting/details/details?id='+id,
    })
  },
  onReachBottom: function () {
    wx.showLoading({
      title: '玩命加载中',
      duration: 1000
    })
   let type = this.data.type;
   this.setData({
     page:this.data.page+1
   })
   if(type==1){
     this.record();
   }
   if(type==2){
     this.collectionList();
   }
     
  },
})