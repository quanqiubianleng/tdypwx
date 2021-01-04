// pages/jurisdiction/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    userInfos: wx.getStorageSync('userinfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          let data = {
            code:res.code
          }
          let rendata = app.requestfun(data, '/Api/Department/index');    
          rendata.then((v) => {
            if(v.data.status==1){
              console.log(v)
              let list = v.data.department;
              if(v.data.department){
                for (let index = 0; index < list.length; index++) {
                  var down =0;
                   list[index].down=down;
                   if(list[index].array){
                    list[index].num=list[index].array.length;
                   }else{
                    list[index].num = 0;
                   }
                   
                }
              }
              that.setData({
                // num:
                list:list
              });  
            }else{
              app.msg("暂无数据");
            }
               
          })

        }
      }
    })
    that.jurisdiction();
  },
  jurisdiction:function(){
    let data = [234,235];
    let jurisdiction = app.jurisdiction(data);
       jurisdiction.then((v)=>{
        this.setData({
          jurisdiction:v
        })
    })
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
    let name = e.currentTarget.dataset.name;
    let img = e.currentTarget.dataset.img;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/jurisdiction/choice/choice?name=' +name + '&img='+img +'&id=' +id,
    })
  },
  aad:function(){
    wx.navigateTo({
      url: '/pages/jurisdiction/add/add',
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