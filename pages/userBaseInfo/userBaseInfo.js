//index.js
//获取应用实例
const app = getApp()

Page({
  data: {    
    isEdit: false,
    uname: "",
    sex: "",
    edu: "",
    edus:"",
    region:[],
    regionStr:"",
    birthDate:"",
    sexArray: [{ id: 1, name: "男" }, { id: 2, name: "女" }],
    eduArray:["小学","初中","中专","高中","大专","本科","研究生","硕士","博士"],
    endDate:""
  },

  // 输入框失去焦点，隐藏输入框
  handleBlur(){
    this.setData({isEdit: false})
  },

  // 处理输入框的值并保存到data
  handlechange(e){
    if(e.detail.value != ''){
      this.setData({uname: e.detail.value})
    }
  },

  // 切换到编辑
  handleEdit(){
    this.setData({isEdit:true})
  },

  // 获得省市区联动选择器所选值
  handleRegionChange(e){
    this.setData({
      region: e.detail.value,
      regionStr: e.detail.value.join("")
    })
  },

  // 从选择器获取出生日期
  handleDateChange(e){
    this.setData({
      birthDate: e.detail.value
    })
  },

  // 从选择器获取性别
  handleSexChange(e){
    this.setData({
      sex: this.data.sexArray[e.detail.value]
    })
  },

  // 从选择器获取学历
  handleEduChange(e){
    console.log(e);
    this.setData({
      edu: this.data.eduArray[e.detail.value],
      edus:e.detail.value,
    })
  },

  // 设置日历选择器有效日期范围的结束日期
  setDatePickerEnd(){
    let date = new Date()
    let year = date.getFullYear()
    let month = (date.getMonth()+1) < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
    this.setData({endDate: `${year}-${month}-${day}`})
  },
  
  selectedBaoche: function (e) {
    console.log(e);
    this.setData({
      currentSelectTripType:e.currentTarget.dataset.id,
    })
  },
  selectedPinche: function (e) {
    console.log(e);
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id,
    })
  },
  //网络请求
  requestfun(data, url) {
    return new Promise((resolve, reject) => {
      return wx.request({
        url: app.d.hostUrl + url,
        method: 'post',
        data: data,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          //console.log(res, 12412);
          wx.setStorageSync('token', res.data.token);
          console.log(wx.getStorageSync('token'));
          resolve(res);
          wx.hideLoading();
        },
        fail: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
          reject(res);
          wx.hideLoading();
        }
      });
    })
  },    
  onLoad: function () {

  },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    console.log(this.data);

    //更新管理员数据
    var sex = this.data.sex.id;
    var uname = this.data.uname;
    var edu = this.data.edus;
    var birthdate = this.data.birthDate;
    var headimgurl = this.data.userInfo.avatarUrl
    if(!sex)//性别
      sex = this.data.userInfo.gender;
    if(!uname)//姓名
      uname = this.data.userInfo.nickName;

    console.log(wx.getStorageSync('token'));  
    var datad = {
      token: wx.getStorageSync('token'),
      sex:sex,
      nickname:uname,
      education:edu,
      headimgurl:headimgurl,
      birthday:birthdate
    };
    let rendata = this.requestfun(datad, '/Api/Personal/setadminbane');
    rendata.then((v) => {
      if (v.data.token) {
          wx.showToast({ icon: "none", title: '提交成功！' })
          setTimeout(() => { wx.navigateTo({ url: '/pages/personal/personal' }) }, 1500)                      
      }
      else{
        wx.showToast({ icon: "none", title: '请先登录' })
        setTimeout(() => { wx.navigateTo({ url: '/pages/loginByWechat/loginByWechat' }) }, 1500)
      }
      console.log(v.data);
    })    
  }
})
