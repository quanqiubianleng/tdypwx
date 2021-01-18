// pages/jurisdiction/setion/addGroupUser.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_id: 0, // 群聊ID
    groupUserList: [], // 群聊成员
    groupDetail: {}, // 群聊详情
    addGroupUserList: [], // 可添加群聊成员
    title: '',
    show: false,
    checked: false,
    page: 1,
    showAllUserGroup: false,// 展示全部成员
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      group_id: options.group_id
    })
    this.getGroupDetail()
    // 获取可添加为群聊成员的列表
    this.getGroupUserList()
  },

  // 获取群组详情
  getGroupDetail(){
    let arr = {
      group_id: this.data.group_id,
      page: this.data.page,
    };
    let rendata = app.requestfun(arr, '/Api/group/groupDetail',false); 
    var that = this   
    rendata.then((v) => {
      if(v.data.status){
        that.setData({
          groupUserList: v.data.data.list,
          groupDetail: v.data.data.detail,
          title: v.data.data.detail.title,
        })
      }
    })
  },

  // 获取可添加群组成员列表
  getGroupUserList(){
    let arr = {
      group_id: this.data.group_id,
      page: this.data.page
    };
    let rendata = app.requestfun(arr, '/Api/group/addGroupUserList',false); 
    var that = this   
    rendata.then((v) => {
      if(v.data.status){
        let value = v.data.data
        let arr = value.map(function(item){
          item.checked = false
          return item;
        })
        // 拼接下一页数据
        if(that.data.addGroupUserList.length && arr.length){
          arr = that.data.addGroupUserList.concat(arr)
          console.log()
        }
        that.setData({
          addGroupUserList: arr,
        })
        console.log(that.data.addGroupUserList)
      }else{
        app.msg('暂无更多数据！')
      }
    })
  },

  // 提交
  editGroup: function (){
    console.log(this.data.title)

    if(!(this.data.title)){
      app.msg('群聊名称不能为空！');
      return false;
    }
    // 如果名称相同则不提交
    if(this.data.title == this.data.groupDetail.title){
      app.msg('群聊名称不能和之前的一致！');
      return false;
    }
    let arr = {
      title: this.data.title,
      id: this.data.groupDetail.id
    }
    let rendata = app.requestfun(arr, '/Api/group/addGroup',false);    
    rendata.then((v) => {
      app.msg('编辑成功')
      if(v.data.status){
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/jurisdiction/setion/index'
          })
        },2000)
      }
    })
  },

  // 添加成员提交
  addGroupUserSubmit(){
    let arr = this.data.addGroupUserList.filter(function(v){
      if(v.checked){
        return v
      }
    })
    let newArr = arr.map((obj,index) => {
      return obj.id;
    })
    if(newArr.length == 0){
      app.msg('请选择要添加的成员')
      return false;
    }
    let params = {
      group_id: this.data.group_id,
      uids: newArr.toString()
    }
    let rendata = app.requestfun(params, '/Api/group/addGroupUserSubmit',false); 
    var that = this   
    rendata.then((v) => {
      if(v.data.status){
        app.msg(v.data.message)
        that.setData({
          show: false,
        })
        that.getGroupDetail()
        // 获取可添加为群聊成员的列表
        that.getGroupUserList()
      }else{
        app.msg('暂无更多数据！')
      }
    })
  },

  onChange: function(e){
    console.log(e)
    this.setData({
      title: e.detail.trim(),
    })
  },

  showPopup() {
    this.setData({ show: true });
  },
  // 监听CheckBox
  onChangeBox(e){
    var value = !this.data.addGroupUserList[e.currentTarget.dataset.index].checked;
    var checked = "addGroupUserList["+e.currentTarget.dataset.index+"].checked";
    this.setData({
      [checked]: value
    })
  },

  onClose() {
    // 取消选中状态
    let value = this.data.addGroupUserList;
    let arr = value.map(function(v){
      v.checked = false
      return v;
    })
    this.setData({ 
      show: false,
      addGroupUserList: arr
    });
    console.log(this.data.addGroupUserList)
  },

  lower(e) {
    console.log(e)
    this.setData({
      page: this.data.page + 1,
    })
    this.getGroupUserList()
  },

  // 改变查看全部群成员
  showGroups(){
    this.setData({
      showAllUserGroup: !this.data.showAllUserGroup
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
    console.log('页面上拉触底事件的处理函数')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})