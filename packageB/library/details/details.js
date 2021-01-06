// packageB/library/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:2,
    down:2,
    strip:0,
    page:1,
    pages:0,
    userlist:[],
    BrowsHistory:[],
    background:[
      {
        id:1,
        background:'#2E54EB',
        select:false
    },{
      id:2,
      background:'#FFC069',
      select:false
    },{
      id:3,
      background:'#40A9FF',
      select:false
    },{
      id:4,
      background:'#B3B39A',
      select:false
    },{
      id:5,
      background:'#B388FF',
      select:false
    },{
      id:6,
      background:'#FF7875',
      select:false
    },{
      id:7,
      background:'#E2BB8D',
      select:false
    },{
      id:8,
      background:'#5CDBD3',
      select:false
    },{
      id:9,
      background:'#95DE64',
      select:false
    },{
      id:10,
      background:'#FF9C6E',
      select:false
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let own = options.own;
    let openid = options.openid;
    let level = options.level;
    let count2 = options.count2;
    let count3 = options.count3;
    console.log(level);
    let index = 2;
    if(level==1){
      index=1;
     
    }
    if(level==2){
      index=4;
      
    }
    this.setData({
      own:own,
      id:id,
      openid:openid,
      level:level,
      index:index,
      count2:count2,
      count3:count2
    })
    this.BrowsHistory(id);
    this.detail(id);
    if(index==1){
      this.getSubordinate(id,openid,1,count2,count3)
    }
    if(index==4){
      this.getSubordinate(id,openid,1,count2,count3)
    }
  },
  getSubordinate:function(id,openid,level,count2,count3){
    console.log(count2,count3);
    if(count2!=0||count3!=0){
      var datad = {
        openid:openid,
        leavl:level,
        uid:id,
        page:this.data.pages
      };
      let rendata = app.requestfun(datad, '/Api/Talentpool/getSubordinate'); 
      rendata.then((v)=>{
        if(v.data.status==1&&v.data.linkuser){
          let list = v.data.linkuser
          for (let index = 0; index < list.length; index++) {
          if(list[index].username=='undefined')
            list[index].username='';
          if(list[index].mobile=='undefined')
            list[index].mobile  =''
          if(list[index].status=='null')
            list[index].status  =''
          }
          this.setData({
            userlist:this.data.userlist.concat(list),
            pages:this.data.pages+1
          })
        }else{
          app.msg("暂无数据");
          return;
        }
      })
    }
    
  },
  detail:function(e){
    let id = e;
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          var datad = {
            uid:id,
            code: res.code,
          };
          let rendata = app.requestfun(datad, '/Api/Talentpool/detail'); 
          rendata.then((v)=>{
            if(v.data.status==1&&v.data.data.user){
              let user = v.data.data.user;
              if(user.username=='undefined')
                user.username = '';
              if(user.mobile=='undefined')
                user.mobile='';
              if(user.remarks){
                let background = that.data.background;
                for (let index = 0; index < background.length; index++) {
                    if(user.background==background[index].id){
                      user.background=background[index].background
                    }
                }
              }
              that.setData({
                user:user
              })
            }
           
          })
        } else {
          app.msg("网络连接失败，请稍后再试");
          return;
        }
      }
    })
  },
  BrowsHistory:function(e){
    let id = e;
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          var datad = {
            uid:id,
            code: res.code,
            page:that.data.page
          };
          let rendata = app.requestfun(datad, '/Api/BrowsHistory/index'); 
          rendata.then((v)=>{
            if(v.data.status==1&&v.data.data){
                that.setData({
                  BrowsHistory:that.data.BrowsHistory.concat(v.data.data),
                  strip:v.data.data.length,
                  page:that.data.page+1
                })
            }
          })
        } else {
          app.msg("网络连接失败，请稍后再试");
          return;
        }
      }
    })
  },
  choice:function(e){
    let index = e.currentTarget.dataset.index;
    let level = this.data.level;
    if(index==3&&level ==3){
      level = 0
    }

    this.setData({
      index:index,
      userlist:[],
      pages:0,
      page:1,
      level :level
    })
    if(index==1){
      // if()
      this.getSubordinate(this.data.id,this.data.openid,1,this.data.count2,this.data.count3)
    }
    if(index==4){
      if(this.data.level==1){
        this.getSubordinate(this.data.id,this.data.openid,2,this.data.count2,this.data.count3)
      }else{
        this.getSubordinate(this.data.id,this.data.openid,1,this.data.count2,this.data.count3)
      }
      
    }
  },
  down:function(e){
    let index = e.currentTarget.dataset.down;
    if(index==2){
      index=1
    }else{
      index=2
    }
    this.setData({
      down:index
    })
  },
  label:function(e){

    wx.navigateTo({
      url: '/packageB/library/label/label?id='+this.data.id,
    })
  },
  details:function(e){
    let nopenid= wx.getStorageSync('userinfo').openid
    let share = 0;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/job-hunting/details/details?id='+id +'&nopenid='+nopenid + '&share=' +share ,
    })
  },
  subordinate:function(e){
   let id= e.currentTarget.dataset.id;
   let level = e.currentTarget.dataset.level;
   let openid = e.currentTarget.dataset.openid;
   let own = e.currentTarget.dataset.own;
   let count2 = 0;
   if(e.currentTarget.dataset.count2!=undefined){
     count2= e.currentTarget.dataset.count2
   }
   let count3 = 0;
   if(e.currentTarget.dataset.count3!=undefined){
     count3=e.currentTarget.dataset.count3
   }
   console.log(id,level,openid,own,this.data.index)
   let index = 0;
  if(level==1&&this.data.index==1){
    index=4;
    level=2;
  }
  // if(level==1){
  //    level = 2
  // }
  if(level==1&&this.data.index==4){
    console.log(111111111111)
    index=2;
    level=0;
  }
  if(level==2&&this.data.index==4){
    index=2;
    level=0;
  }
  // if(this.data.index!=4){
    this.setData({
      index:index,
      level:level,
      own:own,
      openid:openid,
      uid:id,
      pages:0,
      page:1,
      userlist:[],
      count2:count2,
      count3:count2
    })
     if(index==4){
      this.getSubordinate(id,openid,1,count2,count3);
      this.detail(id)
    }
    if(index==2){
      this.setData({
        pages:1
      })
      this.detail(id);
      this.BrowsHistory();
    }
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
    this.detail(this.data.id);
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
    wx.showLoading({
      title: '玩命加载中',
      duration: 1000
    })
    let index = this.data.index;
    console.log(this.data.index,this.data.id,this.data.openid,this.data.level)
    if(index==1&&this.data.level==1){
      this.getSubordinate(this.data.id,this.data.openid,1)
    }
    if(index==4&&this.data.level==1){
      this.getSubordinate(this.data.id,this.data.openid,2)
    }
    if(index==4&&this.data.level==2){
      this.getSubordinate(this.data.id,this.data.openid,1)
    }
    if(index==2){
      this.BrowsHistory(this.data.id);
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})