//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    index: '', //选择的下拉列 表下标,
    enterprise:['同意','不同意'],
    date:'',
  },
  
  onLoad: function () {
   
    
  },
 
  addTrial:function(e){
    wx.navigateTo({
      url: '/pages/approver/add-Trial/add-Trial',
    })
  },
   // 点击下拉显示框
   selectTap1() {
    this.setData({
      show1: !this.data.show1,
    });
  },
  optionTap1(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index:Index,
      show1:!this.data.show1,
    });
  },
  bindDateChange: function(e) {
    this.setData({
      show1:false,
      date: e.detail.value
    })
  },
})
