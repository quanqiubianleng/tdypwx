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
    var  userInfos= wx.getStorageSync('userinfo');
    console.log(userInfos)
    this.setData({
      userInfo: userInfos,
    }) 
    let type = options.type;
    if(type==2){
      wx.setNavigationBarTitle({title: '我的收藏'})
      this.collectionList();
    }
    if(type==3){
      wx.setNavigationBarTitle({title: '浏览记录'})
      this.BrowsHistory();
    }
    this.setData({
      type:type
    })

  },
  //浏览记录
  BrowsHistory:function(){
    let data = {
      page:this.data.page,
      uid:wx.getStorageSync('userinfo').id
    }
    let rendata = app.requestfun(data, '/Api/BrowsHistory/index',true);    
    rendata.then((v) => {
      console.log(v);
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
  //收藏记录
  collectionList:function(){
    let data = {
      page:this.data.page
    }
    let rendata = app.requestfun(data, '/Api/job/collectionList',true);    
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
          if(that.data.type==2){
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
          }
          
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
        }
      })
   
  },
  details:function(e){
    let id = e.currentTarget.dataset.id;
    let pathway = e.currentTarget.dataset.pathway;
    let openid = this.data.openid
    if(pathway==2){
      wx.navigateTo({
        url: '/pages/job-hunting/details/details?id='+id + '&nopenid=' +openid,
      })
    }
    
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
   if(type==2){
     this.collectionList();
   }
  if(type==3){
    this.BrowsHistory();
  }
  },
  onShow:function(){
    let openid= wx.getStorageSync('userinfo').openid;
    this.setData({
      openid:openid
    })
  },
})