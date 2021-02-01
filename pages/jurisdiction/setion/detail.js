// pages/jurisdiction/setion/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    roleShow: false,
    result: ['a', 'b'],
    items: [
      {value: 'USA', name: '美国'},
      {value: 'CHN', name: '中国', checked: 'true'},
      {value: 'BRA', name: '巴西'},
      {value: 'JPN', name: '日本'},
      {value: 'ENG', name: '英国'},
      {value: 'FRA', name: '法国'}
    ],
    values: [],// 添加权限时所选择的ID
  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    const values = e.detail.value

    items.map(function(y){
      if (values.indexOf(y.id) >= 0) {
        y.checked = true
      }else{
        y.checked = false
      }

      // 判断是否有子集
      if('sub' in y){
        y.sub.map(function(v){
          if (values.indexOf(v.id) >= 0) {
            v.checked = true
          }else{
            v.checked = false
          }

          // 判断是否有子集
          if('sub' in v){
            v.sub.map(function(j){
              if (values.indexOf(j.id) >= 0) {
                j.checked = true
              }else{
                j.checked = false
              }
              return j
            })
          }
          return v
        })
      }
      return y
    })
    
    this.setData({
      items,
      values
    })
    
  },

  // 点击分组名字
  clickName(e){

    const items = this.data.items
    let index = e.currentTarget.dataset.index
    let level = e.currentTarget.dataset.level
    let pid = e.currentTarget.dataset.pid
    
    switch (level) {
      case 1:
        items.map(function(y,d){
          if(d === index){
            y.show = !y.show
          }
          return y
        })
        break;

        case 2:
          items.map(function(y,d){
            if(d === pid){
              console.log(y.sub[index].show)
              y.sub[index].show = !y.sub[index].show
            }
            return y
          })
          break;
    
      default:
        break;
    }

    this.setData({
      items
    })
    console.log(this.data.items)
  },

  // 获取群组列表
  getGroupList(){
    let arr = {
      p_id: 0,
    };
    let rendata = app.requestfun(arr, '/Api/org/groupSetRoleList',false); 
    let that = this   
    rendata.then((v) => {
      if(v.data.status){
        that.setData({
          items: v.data.data,
        })
      }
    })
  },

  showPopup() {
    this.setData({ show: true });
  },

  showRolePopup() {
    this.setData({ roleShow: true });
  },

  onRoleClose() {
    this.setData({ roleShow: false });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGroupList()
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