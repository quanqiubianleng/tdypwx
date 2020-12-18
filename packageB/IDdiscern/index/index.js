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
        desc:"定义：指不在平台上找工作就业的人员，愿意在平台的管理和指导下，开展就业平台推广工作的个人。"
      },
      {
        name:'在职推荐人',
        type:14,
        status:3,
        desc:"定义：指在平台上找到工作的就业者，愿意在平台的管理和指导下，开展就业平台推广工作的个人。"
      },
      {
        name:'校园代理',
        type:15,
        status:3,
        desc:"定义：指在校学生，愿意在平台的管理和指导下，开展就业平台推广工作的个人。"
      },
      {
        name:'渠道运营商',
        type:16,
        status:3,
        desc:"定义：指配备有一定数量从业人员，愿意在平台的管理和指导下，负责指定区/县地区就业平台推广工作的独立法人机构或自然团体。"
      },{
        name:'站长合伙人',
        type:17,
        status:3,
        desc:"定义：指具有门店、固定场地、区域人脉，愿意在平台的管理和指导下，开展就业平台推广工作的个人。"
      }
    ],
    status:'',
    show:false,
    frame:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let status = options.status;
    console.log(status)
    let Valuable = options.Valuable;
    console.log(Valuable);
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
    let that = this;
    let type = e.currentTarget.dataset.type;
  
    let index = e.currentTarget.dataset.index;
    let status = that.data.status;
    let Valuable = that.data.Valuable;
    let Tips1 = "你已申请";
    let Tips2 = that.data.list[index].name;
    let Tips3 = ",是否确认更换";
    let Tips = Tips1+Tips2+Tips3;
    if(type==Valuable){
      app.msg("你已申请，无需重复申请！");
       return;
    }
    if(status&&Valuable){
      wx.showModal({
        title: '提示',
        content: Tips,
        success: function (sm) {
          if (sm.confirm) {
            that.setData({
              frame:true,
              type:type,
              inx:index
            })
          }
          }
      })
    }
    // if(status==0||status==1){
    //   app.msg("你已申请，无需重复申请！");
    //   return;
    // } else{
    //   
    //    }
  
    
    
  },
  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  ID:function(e){
    this.setData({
      ID:e.detail.value
    })
  },
  tel:function(e){
    this.setData({
      tel:e.detail.value
    })
  },
  quxiao:function(){
    this.setData({
      frame:false
    })
  },
  queren:function(){
  
    let name= this.data.name;
    if(!name){
      app.msg("请输入姓名");
      this.setData({
        roll:'1',
      })
      return;
    }
    let ID= this.data.ID;
    if(!ID){
      app.msg("请输入身份证");
      this.setData({
        roll:'2',
      })
      return;
    }
    var pattsss = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!pattsss.test(ID)) {
      this.setData({
        roll:'2',
      })
      app.msg("身份证号不正确");
      return;
    }
    let tel= this.data.tel;
    if(!tel){
      app.msg("请输入联系电话");
      this.setData({
        roll:'3',
      })
      return;
    }
    var patts = /^\d{11}$/g;
    if (!patts.test(tel)) {
      this.setData({
        roll:'3',
      })
      app.msg("联系电话方式不正确");
      return;
    }
    let type = this.data.type;
    let index = this.data.inx;
    var datad = {
        type:type,
        name:name,
        idcard:ID,
        mobile:tel
      };
      let rendata = app.requestfun(datad, '/Api/UserAuto/addPartner',true);    
      rendata.then((v) => {
        if(v.data.status==1){
          app.msg("已提交申请");
            let lists = this.data.list;
            for (let i = 0; i < lists.length; i++) {
              console.log(i)
              if(index==i){
                lists[index].status=0;
              }
              else{
                lists[i].status=3;
              }
            }
          this.setData({
            index:type,
            list:lists,
            frame:false
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '您输入的信息与实名认证的信息不一致!',
            showCancel: false, 
            success: function (sm) {
              if (sm.confirm) {
                this.setData({
                  frame:false
                })
              }
              }
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