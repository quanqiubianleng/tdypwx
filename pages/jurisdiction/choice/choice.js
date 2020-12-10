// pages/jurisdiction/choice/choice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    userimg:'',
    show:false,
    list:[],
    branch:[],
    index:'',
    name:'',
    tag:'',
    img:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let name = options.name;
   let img = options.img;
   let id = options.id;
   this.setData({
     id:id,
     username:name,
     userimg:img
   })
    this.Authority();
    // this.setData({
    //   branch:branch
    // })
  },
  Authority:function(){
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          let data ={
            userid:that.data.id,
            code:res.code
          }
          let rendata = app.requestfun(data, '/Api/Authority/index');    
          rendata.then((v) => {
            let branch=[];
            let branchlist=[];
            if(v.data.department){
              branchlist=v.data.department;
              for (let index = 0; index < v.data.department.length; index++) {
                 branch[index] = v.data.department[index]['name'];
              }
            }
            that.setData({
              branch:branch,
              branchlist:branchlist,
              list:v.data.access
            });   
          })
        } else {
          console.log('失败！' + res.errMsg)
        }
      }
    })
  },
  Showdown:function(e){
    let id = e.currentTarget.dataset.id;//当前id
    let index = e.currentTarget.dataset.index;//当前下标
    let key = e.currentTarget.dataset.idx;//分类下标
    let name = e.currentTarget.dataset.name;
    let tag = e.currentTarget.dataset.tag;
    let img = e.currentTarget.dataset.img;
    let list = this.data.list;
    if(this.data.list[key]['array'][key][index]['tag']==1){
      list[key]['array'][key][index]['tag']=0;
    }
    else{
      list[key]['array'][key][index]['tag']=1;
    }
    this.setData({
      accessid:id,
      name:name,
      lists:list,
      tag:tag,
      img:img,
      show:true,
    })
  
  },
  showPopup:function(e) {
    let accessid = this.data.accessid;
    let type = this.data.tag;
    if(type==1){
      type=0;
    }
    else{
      type=1;
    }
     let that = this;
     wx.login({
       success (res) {
         if (res.code) {
           let data ={
             code:res.code,
             type:type,
             accessid:accessid,
             userid:that.data.id
           }
           let rendata = app.requestfun(data, '/Api/Authority/SaveAccess');    
           rendata.then((v) => {
             if(v.data.status==1){

              wx.showToast({
                title: '设置成功',
                duration:2000,//显示时长
                icon:'none',
                success:function(){ 
                  that.setData({
                    list:that.data.lists
                  })
                },
              })
             }
           })
         } else {
           console.log('失败！' + res.errMsg)
         }
       }
     })
  
   
    this.setData({
          show: false
          //  list:list
         })
  },
  onClose:function() {
    this.setData({ 
      show: false 
    });
  },
  bindPickerChange:function(e){
    let that = this;
    let id = that.data.branchlist[e.detail.value]['id'];
    wx.login({
      success (res) {
        if (res.code) {
          let data ={
            code:res.code,
            type:2,
            accessid:id,
            userid:that.data.id
          }
          let rendata = app.requestfun(data, '/Api/Authority/SaveAccess');    
          rendata.then((v) => {
            if(v.data.status==1){

              wx.showToast({
                title: '设置成功',
                duration:2000,//显示时长
                icon:'none',
                success:function(){ 
                  that.setData({
                    list:that.data.lists
                  })
                },
              })
             }
          })
        } else {
          console.log('失败！' + res.errMsg)
        }
      }
    })
    that.setData({
      index: e.detail.value
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