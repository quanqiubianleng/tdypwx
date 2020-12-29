// packageB/library/remarks/remarks.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:[
      {
        id:1,
        background:'#2E54EB',
        select:false
    },{
      id:2,
      background:'#FFC069',
      select:false
    },{
      id:3,
      background:'#40A9FF',
      select:false
    },{
      id:4,
      background:'#B3B39A',
      select:false
    },{
      id:5,
      background:'#B388FF',
      select:false
    },{
      id:6,
      background:'#FF7875',
      select:false
    },{
      id:7,
      background:'#E2BB8D',
      select:false
    },{
      id:8,
      background:'#5CDBD3',
      select:false
    },{
      id:9,
      background:'#95DE64',
      select:false
    },{
      id:10,
      background:'#FF9C6E',
      select:false
    }
    ],
  id:null
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let r_id = options.id;
    // let r_id = 10006874;
    this.setData({
      r_id :r_id
    })
    this.UserRemark(r_id);
  },
  UserRemark:function(e){
    let that = this;
    let id =e;
    wx.login({
      success (res) {
        if (res.code) {
          var datad = {
            r_id:id,
            code: app.globalData.userInfo.token
          };
          let rendata = app.requestfun(datad, '/Api/UserRemark/index'); 
          rendata.then((v)=>{
           if(v.data.status==1&&v.data.data){
             let background = that.data.background;
             for (let index = 0; index < background.length; index++) {
                if(v.data.data.tags==background[index].id){
                  background[index].select=true
                }
             }
             that.setData({
               background:background,
              name:v.data.data.remark
             })
           }
           
          })
        } else {
          app.msg("网络连接失败，请稍后再试");
          return;
        }
      }
    })
  },
  Submit:function(e){
    let that = this;
    let name = that.data.name;
    if(!name){
      app.msg("请输入备注信息");
      return;
    }
    if(name.length>8){
      app.msg("最多输入8个字");
      return;
    }
    if(!that.data.activeItemIndex){
      app.msg("请选择颜色标签");
      return;
    }

    wx.login({
      success (res) {
        if (res.code) {
          var datad = {
            r_id:that.data.r_id,
            remark:name,
            code: res.code,
            tags:that.data.activeItemIndex
          };
          let rendata = app.requestfun(datad, '/Api/UserRemark/add'); 
          rendata.then((v)=>{
           if(v.data.status==1){
            wx.showToast({
              title: '提交成功',
              duration:2000,//显示时长
              icon:'none',
              success:function(){ 
                wx.navigateTo({
                  url: '/packageB/library/index/index',
                })
              },
            })
             
           }
           
          })
        } else {
          app.msg("网络连接失败，请稍后再试");
          return;
        }
      }
    })
  },
  name:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  choice:function(e){
    let index = e.currentTarget.dataset.index;
    let background = this.data.background;
    let id = '';
    for (let i = 0; i < background.length; i++) {
      if(index==i){
        background[i].select=true;
        id=background[i].id;
      }else{
        background[i].select=false;
      }
    }
    this.setData({
      background:background,
      activeItemIndex:id
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