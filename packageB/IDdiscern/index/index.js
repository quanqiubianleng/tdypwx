// packageB/IDdiscern/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list :[
      {
        name:'社会合伙人',
        type:12,
        status:3,
        desc:"满足平台方从业要求，熟练操作平台功能，在平台方管理和指导下，进行线下平台的宣传和推广工作。"
      },
      {
        name:'在职推荐人',
        type:14,
        status:3,
        desc:"满足平台方从业要求，熟练操作平台功能，在平台方管理和指导下，进行线下平台的宣传和推广工作。"
      },
      {
        name:'校园代理',
        type:15,
        status:3,
        desc:"满足平台方从业要求，熟练操作平台功能，在平台方管理和指导下，进行线下平台的宣传和推广工作。"
      },
      {
        name:'渠道运营商',
        type:16,
        status:3,
        desc:"满足平台方从业要求，熟练操作平台功能，在平台方管理和指导下，进行线下平台的宣传和推广工作。"
      },{
        name:'站长合伙人',
        type:17,
        status:3,
        desc:"满足平台方从业要求，熟练操作平台功能，在平台方管理和指导下，进行线下平台的宣传和推广工作。"
      }
    ],
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let status = options.status;
    console.log(status)
    let Valuable = options.Valuable;
    if(status&&Valuable){
     let list=this.data.list;
     for (let index = 0; index < list.length; index++) {
        if(Valuable==list[index].type){
          list[index].status=status;
        }
     }
     if(status!=0){
      this.setData({
        show:true,
        status:status,
        Valuable:Valuable,
        index:Valuable,
        list:list
      })
     }
     if(status==0){
      this.setData({
        show:false,
        status:status,
        Valuable:Valuable,
        index:Valuable,
        list:list
      })
     }
     
    }
   
  },
  close:function(){
    this.setData({
      show:false
    })
  },
  go:function(e){
    wx.navigateTo({
      url: '/packageB/library/index/index',
    })
  },
  tel:function(e){
    let mobile ='400-899-8877' ;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  addPartner:function(e){
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;
    let status = this.data.status;
    if(status==0||status==1){
      app.msg("你已申请，无需重复申请！");
      return;
    } else{
      var datad = {
              type:type
            };
            let rendata = app.requestfun(datad, '/Api/UserAuto/addPartner',true);    
            rendata.then((v) => {
              console.log(v)
              if(v.data.status==1){
                app.msg("已提交申请");
                  let lists = this.data.list;
                      lists[index].status=0;
                this.setData({
                  index:type,
                  list:lists
                })
              }
            }) 
       }
    //  let status = this.data.list[index].status;
    // if(status!=0){
     
    // }else{
    //     
    // }
    
    
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