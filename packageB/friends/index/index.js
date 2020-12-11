// packageB/friends/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    userlevelid:0,
    show:false,
    bgpic:'../../images/bj.png',
    bgtop:'../../images/top.png',
    kuang:'../../images/kuang.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    
    let userlevelid = 0;
     let levlid = options.levlid;
    // let levlid = 47;
     let id  = decodeURIComponent(options.scene);  
     //let id = 1027;
     if(id!='undefined'&&typeof(levlid)=='undefined'){
      userlevelid = id;
     }
    //  if(typeof(levlid)=='undefined'&&id=='undefined'){
    //   userlevelid= 0;
    //  }
     if(typeof(levlid)!='undefined'&&id=='undefined'){
      userlevelid=levlid;
     }
    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowW: res.windowWidth,
          windowH: res.windowHeight
          })
      }
    })
    let userInfo = wx.getStorageSync('user')
    that.setData({
      // levlid:levlid,
      userInfo:userInfo,
      userlevelid:userlevelid
    })
    if(userInfo){
      that.saveuserinfo();
    }
   

    
  },
  btn_sub:function(e){
    let that = this;
    wx.getUserInfo({
      success: function(res) {
        wx.setStorageSync('user',res.userInfo)
        that.setData({
          userInfo:res.userInfo
        })
        that.saveuserinfo();
      }
    })
  },
  saveuserinfo:function(userInfo){
    let that=this;
    let userlevelid =0;
    wx.login({
      success (res) {
        if (res.code) {
          var datad = {
            userlevelid :that.data.userlevelid,
            nickname : that.data.userInfo.nickName,
            headimgurl:that.data.userInfo.avatarUrl,
            code: res.code,
            lat:wx.getStorageSync('coordinates').longitude,
            lng:wx.getStorageSync('coordinates').latitude,
          };
          let rendata = app.requestfun(datad, '/Api/nobill/saveuserinfo'); 
          rendata.then((v)=>{
            if(v.data.status==1){
               /*code是指图片base64格式数据*/
              //声明文件系统
              const fs = wx.getFileSystemManager();
              //随机定义路径名称
              var times = new Date().getTime();
              var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';

              //将base64图片写入
              fs.writeFile({
                filePath: codeimg,
                data: v.data.recommendmig.slice(22),
                encoding: 'base64',
                success: () => {
                  //写入成功了的话，新的图片路径就能用了
                  that.setData({
                    qrcode:codeimg,
                    incode:v.data.incode,
                    levlid:v.data.levlid,
                  })
                }
              });
              
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
   
   
  },
  copyText: function (e) {
    let that = this;
    if(that.data.index==0){
      wx.setClipboardData({
        data: that.data.incode,
        success (res) {
          wx.getClipboardData({
            success (res) {
              wx.showToast({
                title: '复制成功',
              })
              that.setData({
                index:1
              })
            }
          })
        }
      })
    }else{
      that.setData({
        index:0
      })
    }
    
   
  },
  explain:function(e){
    wx.navigateTo({
      url: '/packageB/friends/explain/explain',
    })
  },
  clickMe() {
    var that = this
    that.setData({
    show:true
    })
    that.drawCanvas()
    },
    drawCanvas() {
      var that = this
      var windowW = that.data.windowW
      var windowH = that.data.windowH
    // var text = '从不拘泥任何世俗凡人的目光，我要奔向前方那光芒，生而为魔，那又如何'
      // 使用 wx.createContext 获取绘图上下文 context
      var context = wx.createCanvasContext('firstCanvas')
      // 海报背景图
      context.drawImage(that.data.bgpic, (windowW -350) / 2, (windowH -650) / 2, 350, 600)
      //头部文字
      context.drawImage(that.data.bgtop, (windowW - 230) / 2, (windowH -590) / 2 , 250,100)
      context.setFillStyle("#fff")
      context.setFontSize(16)
      context.fillText('您的邀请码', (windowW - 90) / 2, (windowH -340) / 2 )
      context.drawImage(that.data.kuang, (windowW -230) / 2, (windowH -305) / 2, 40,40)
      context.setFillStyle("#2283E8")
      context.setFontSize(14)
      context.fillText(that.data.incode[0], (windowW - 200) / 2, (windowH -255) / 2 )

      context.drawImage(that.data.kuang, (windowW -150) / 2, (windowH -305) / 2, 40,40)
      context.setFillStyle("#2283E8")
      context.setFontSize(14)
      context.fillText(that.data.incode[1], (windowW - 120) / 2, (windowH -255) / 2 )

      context.drawImage(that.data.kuang, (windowW -70) / 2, (windowH -305) / 2, 40,40)
      context.setFillStyle("#2283E8")
      context.setFontSize(14)
      context.fillText(that.data.incode[2], (windowW - 40) / 2, (windowH -255) / 2 )

      context.drawImage(that.data.kuang, (windowW +10) / 2, (windowH -305) / 2, 40,40)
      context.setFillStyle("#2283E8")
      context.setFontSize(14)
      context.fillText(that.data.incode[3], (windowW +40) / 2, (windowH -255) / 2 )

      context.drawImage(that.data.kuang, (windowW +90) / 2, (windowH -305) / 2, 40,40)
      context.setFillStyle("#2283E8")
      context.setFontSize(14)
      context.fillText(that.data.incode[4], (windowW +120) / 2, (windowH -255) / 2 )

      context.drawImage(that.data.kuang, (windowW +170) / 2, (windowH -305) / 2, 40,40)
      context.setFillStyle("#2283E8")
      context.setFontSize(14)
      context.fillText(that.data.incode[5], (windowW +200) / 2, (windowH -255) / 2 )
      // 小程序码
      context.drawImage(that.data.qrcode, (windowW -110) / 2, (windowH -40) / 2, 110,110)
      // 底部文字
      context.setFillStyle("#fff")
      
      context.setFontSize(12)
      
      context.fillText('1. 点击保存图片发送好友，朋友扫码加入', (windowW - 240) / 2, (windowH + 385) / 2 )
      
      context.setFillStyle("#fff")
      
      context.setFontSize(12)
      
      context.fillText('2. 点击转发按钮邀请朋友进入界面，输入邀请码', (windowW - 240) / 2, (windowH + 430) / 2 )
      
      context.draw()
      
      },
      
      // 点击保存按钮，同时将画布转化为图片
      
      daochu: function () {
      var that = this;
      wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: 'firstCanvas',
      fileType: 'jpg',
      quality: 1,
      success: function (res) {
      that.setData({
      shareImage: res.tempFilePath
      })
      
      setTimeout(function(){
      
      wx.showModal({
      title: '提示',
      content: '将生成的海报保存到手机相册，可以发送给微信好友或分享到朋友圈',
      success(res) {
        if (res.confirm) {
        that.eventSave()
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
        })
        },1000)
        }
        })
      },
      
      // 将商品分享图片保存到本地
      
      eventSave() {
        wx.saveImageToPhotosAlbum({
          filePath: this.data.shareImage,
          success(res) {
            wx.showToast({
              title: '保存图片成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      
      //将线上图片地址下载到本地，此函数进行了封装，只有在需要转换url的时候调用即可
      
      getBG(url) {
      
      // Promise函数给我很大的帮助，让我能return出回调函数中的值
      
      return new Promise(function (resolve) {
      
      wx.downloadFile({
      
      url: url,
      
      success: function (res) {
      
      url = res.tempFilePath
      
      resolve(url);
      
      }
      
      })
      
      })
      
      },
      cangan:function(e){
      console.log(111)
      } , 
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
    let levlid= this.data.levlid
    console.log(levlid);
   return {
     title: '天大云聘系统',
     path: '/packageB/friends/index/index?levlid='+levlid,
     desc: '',
     success: function (res) {
       app.msg("分享成功");
     }
   }
  }
})