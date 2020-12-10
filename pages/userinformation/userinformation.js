//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: ['点击选择审批意见','同意审批', '驳回审批'],
    check: 0,
    rdCode: null,
    code:null,
    //借支数据
    username:null,
    usertle:null,
    money:null,
    code:null,    
    advanceinfo:null,
    index: 0,
  },
 

  //输入姓名
  jsfnuuser(e){
    console.log(e);
    var vare = e.detail.value;
    this.setData({
      username: vare
    });
    console.log(this.data.username);
  },
  //输入手机号
  jsfnutle(e){
    console.log(e);
    var vare = e.detail.value;
    this.setData({
      usertle: vare
    });
    console.log(this.data.usertle);
  },  
  //输入金额
  jsfnumoney(e){
    console.log(e);
    var vare = e.detail.value;
    this.setData({
      money: vare   
    });
    console.log(this.data.money);
  },  
  //输入借支说明
  jsfnuinfo(e){
    console.log(e);
    var vare = e.detail.value;
    this.setData({
      advanceinfo: vare
    });
    console.log(this.data.advanceinfo);
  },   
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },     
  // 借支
  async advancefun(e) {
    let code = await new Promise((resolve) => {
      wx.login({ success: (res) => { if (res.code) resolve(res.code) } })
    });
    console.log(code);
    var datad = {
      code:code,
      money:this.data.money,
      usernaem:this.data.username,
      usertle:this.data.usertle,
      advanceinfo:this.data.advanceinfo,
    }; 
    wx.showLoading({ title: "操作中！" })

    let rendata = app.requestfun(datad, '/Api/Advance/PostAdvance'); 
    rendata.then((v)=>{
      if (v.data.token){             
      }       
      console.log(v.data);
    }) 
  },
    
  onLoad: function () {
    let code =  new Promise((resolve) => {
      wx.login({ success: (res) => { if (res.code) resolve(res.code) } })
    });
    console.log(code);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
