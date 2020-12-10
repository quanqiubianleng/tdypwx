// packageB/opinion/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    upload_picture_list: [],
    listimg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  uploadpic: function (e) {
        var that = this //获取上下文
        var upload_picture_list = that.data.upload_picture_list
        if(upload_picture_list.length>=6){
          app.msg("最多只能上传五张图片");
          return;
        }else{
            //选择图片
            wx.chooseImage({
              count: 8, 
              sizeType: ['compressed'], 
              sourceType: ['album', 'camera'],
              success: function (res) {
                var tempFiles = res.tempFiles
                console.log(tempFiles)
                //把选择的图片 添加到集合里
                for (var i in tempFiles) {
                  tempFiles[i]['upload_percent'] = 0
                  tempFiles[i]['path_server'] = ''
                  upload_picture_list.push(tempFiles[i])
                  var rendata = app.uploadFile(tempFiles[i].path); 
                  rendata.then((v) => {
                    if(that.data.listimg.length){
                      that.setData({
                        upload_picture_list: upload_picture_list,
                        listimg: that.data.listimg.concat(',',v.data)
                      })
                    }else{
                      that.setData({
                        upload_picture_list: upload_picture_list,
                        listimg: v.data
                      })
                    }
                  });
                }
              }
          })
        }
      },
  //点击上传事件
  Feedback: function () {
    if(!this.data.name){
      app.msg("请输入您的称呼");
      return;
    }
    if(!this.data.tel){
      app.msg("请输入您的联系电话");
      return;
    }
    if(!this.data.feedback){
      app.msg("请输入您的反馈内容");
      return;
    }
    let data ={
      name:this.data.name,
      mobile:this.data.tel,
      feedback:this.data.feedback,
      picurl:this.data.listimg
    };
    let rendata = app.requestfun(data, '/Api/Feedback/add',true); 
    rendata.then((v) => {
      console.log(v);
      if(v.data.status==1){
        wx.showToast({
          title: '提交成功',
          duration:2000,//显示时长
          icon:'none',
          success:function(){ 
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/personal/personal',
              })
              
            }, 1000);
          },
        })
      }else{
        app.msg("网络连接失败，请稍后重试!")
        return;
      }
    });
  },
    // 删除图片
   deleteImg: function(e) {
     let upload_picture_list = this.data.upload_picture_list;
     let index = e.currentTarget.dataset.index;
    upload_picture_list.splice(index, 1);
    
      this.setData({
       upload_picture_list: upload_picture_list
     });
   },
   name:function(e){
    let babyName = e.detail.value;
    this.setData({
      name:babyName
    })
   },
   tel:function(e){
    let tel = e.detail.value;
    this.setData({
      tel:tel
    })
   },
   feedback:function(e){
    let feedback = e.detail.value;
    this.setData({
      feedback:feedback
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