// pages/approver/add-Trial/add-Trial.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    number:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  Showdown:function(e){
    let index = e.currentTarget.dataset.id;
     if(this.data.list[index].down==0){
       let list = this.data.list;
           list[index].down="1";
        this.setData({
          list:list
        })
        return
     }
     if(this.data.list[index].down==1){
      let list = this.data.list;
           list[index].down="0";
        this.setData({
          list:list
        })
        return
     }
    
  },
  choice:function(e){
    let list = this.data.list;
    let idx= e.currentTarget.dataset.idx;//部门下标
    let index = e.currentTarget.dataset.index;//部门下的人员下标
    let select= list[idx].array[index].select;
    if(list[idx].array[index].select==0){
      list[idx].array[index].select=1;
      this.setData({
        number:this.data.number+1,
        list:list
      })
      return
    }
    if(list[idx].array[index].select==1){
      list[idx].array[index].select=0;
      this.setData({
        number:this.data.number-1,
        list:list
      })
      return
    }
   
  },
  confirm:function(e){
    wx.navigateTo({
      url: '/pages/approver/details/approve',
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
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          let data = {
            code:res.code
          }
          let rendata = app.requestfun(data, '/Api/Department/index');    
          rendata.then((v) => {
              let list = v.data.department;
              for (let index = 0; index < list.length; index++) {
                var down =0;
                var select =0
                 list[index].down=down;
                 if(list[index].array){
                   for (let i = 0; i < list[index].array.length; i++) {
                     list[index].array[i].select=0;
                   }
                 }
              }
              that.setData({
                list:list
              });   
          })

        }
      }
    })
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