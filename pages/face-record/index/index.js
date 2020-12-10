// pages/face-record/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display:'',
    list:[],
    list1:[],
    list2:[],
    page:0,
    page1:0,
    page2:0,
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    banner:[],
    swiper:{
      indicatorDots:true,
      indicatorColor:"rgba(255,255,255,.6)",
      indicatorActiveColor:"rgba(255,255,255)",
      autoplay:true,
    },
    search:'',
    searchlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let currentTab =options.currentTarget;//返回的类型
    // let type = options.type;//判断是否为返回
    // let search = options.search;//搜索返回
    // if(typeof(search)!='undefined'&&type==1){
    //   this.setData({
    //     search:search
    //   })
    //   this.searchlist();
    // }
    // let c= '';
    // if(typeof(currentTab)!='undefined'){
    //   c=currentTab;
    // }
    // else{
    //   c=this.data.currentTab
    // }
    this.setData({
      list:[],
      list1:[],
      list2:[],
      searchlist:[],
    })
    this.GetAdvertImg();
    this.GetInterviewList(this.data.currentTab,0);
  },
  swichNav:function(e){
    var that = this;
    that.setData({
    currentTab: e.target.dataset.current,
    })
   if(this.data.searchlist.length>=1){
    this.setData({
      currentTab:e.target.dataset.current,
      searchlist:[]
    })
  }
   let page = '0';
   if(e.target.dataset.current==0){
     this.setData({
      currentTab:e.target.dataset.current,
       list:[]
     })
   }
   if(e.target.dataset.current==1){
    this.setData({
      currentTab:e.target.dataset.current,
      list1:[]
    })
   } 
   if(e.target.dataset.current==2){
    this.setData({
      currentTab:e.target.dataset.current,
      list2:[]
    })
   } 
   that.GetInterviewList(e.target.dataset.current,page);
  },
  show:function(e){
    
    let id = e.currentTarget.dataset.id;
    let type = this.data.currentTab;
    let search = this.data.search;
    let listtype = e.currentTarget.dataset.list;
    let sl = e.currentTarget.dataset.sl;
    let list ={};
      if(listtype==0){
        list =JSON.stringify(this.data.list[id])
      }
      if(listtype==1){
        list =JSON.stringify(this.data.list1[id])
      }
      if(listtype==2){
        list =JSON.stringify(this.data.list2[id])
      }
      if(listtype==3){
        list =JSON.stringify(this.data.searchlist[id])
      }
     
    wx.navigateTo({
      url: '/pages/face-record/details/details?list=' + list + '&type=' + this.data.currentTab +'&search=' +search +'&sl=' +sl ,
    })
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  GetAdvertImg:function(){
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
        let data = {
          code:res.code,
          position_id : 5
        }
        let rendata = app.requestfun(data, '/Api/business/GetAdvertImg');    
        rendata.then((v) => {
          that.setData({
            banner:v.data.imglist
          })
         
        })
        } 
      }
    })
  },
  GetInterviewList:function(c,t){
    
    let that = this;
    let type = '';
    let page='0';
    if(t==-1){
      type=c;
      page=0;
     }
     else{
       type=c;
       page=t;
    }
    wx.login({
      success (res) {
        if (res.code) {
          let data = {
            code:res.code,
            page:page,
            type:type
          }
          let rendata = app.requestfun(data, '/Api/Interviewvue/GetInterviewList');    
          if(type==0){
            rendata.then((v) => {
              let list = v.data.interviewlist;
              if(v.data.interviewlist){
                that.setData({
                  currentTab:0,
                  list:that.data.list.concat(list)
                });
              }else{
                app.msg("已经到底了")
                return;
              }  
          })
          }
          if(type==1){
            rendata.then((v) => {
              let list1 = v.data.interviewlist;
              if(v.data.interviewlist){
                that.setData({
                  currentTab:1,
                  list1:that.data.list1.concat(list1)
                });
               
              }else{
                app.msg("已经到底了")
                return;
              }  
          })
          }
          if(type==2){
            rendata.then((v) => {
              let list2 = v.data.interviewlist;
              if(v.data.interviewlist){
                that.setData({
                  currentTab:2,
                  list2:that.data.list2.concat(list2)
                });
              }else{
                app.msg("已经到底了")
                return;
              }  
          })
          }
        }
      }
    })
  },
  mobile:function(e){
    let mobile = e.currentTarget.dataset.mobile;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  search:function(e){
    this.setData({
      search:e.detail.value
    })
  },
  searchlist:function(e){
    let that = this;
    console.log(that.data.search);
    if(that.data.search==''||that.data.search=='null'||that.data.search=='undefined'){
      app.msg("请输入姓名/模糊查找");
      return
    }
    wx.login({
      success (res) {
        if (res.code) {
        let data = {
          code:res.code,
          username:that.data.search
        }
        let rendata = app.requestfun(data, '/Api/Interviewvue/FindInterview');    
        rendata.then((v) => {
          if(v.data.interviewlist){
            that.setData({
              currentTab:0,
              searchlist:v.data.interviewlist
            })
          }else{
            app.msg("未找到该人员");
              return
          }
        })
        } 
      }
    })
  },
  searchfrom:function(e){
    let that= this;
      let search =e.detail.value;
      if(!search){
        app.msg("请输入姓名/模糊查找");
        return
      }
      wx.login({
        success (res) {
          if (res.code) {
          let data = {
            code:res.code,
            username  : search
          }
          let rendata = app.requestfun(data, '/Api/Interviewvue/FindInterview');    
          rendata.then((v) => {
            if(v.data.interviewlist){
              that.setData({
                currentTab:0,
                searchlist:v.data.interviewlist
              })
            }else{
              app.msg("未找到该人员");
              return
              // that.setData({
              // searchlist:[]
              // })
            }
            
           
          })
          } 
        }
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
  if(currPage.__data__.search==''&&currPage.__data__.sl==0){
    if(currPage.__data__.currentTarget==0){
      this.setData({
        list:[],
      })
    }
    if(currPage.__data__.currentTarget==1){
      this.setData({
        list1:[],
      })
    }
    if(currPage.__data__.currentTarget==2){
      this.setData({
        list2:[],
      })
    }
    this.GetInterviewList(currPage.__data__.currentTarget,0);
  }
 if(currPage.__data__.type==1&&currPage.__data__.search!=''&&currPage.__data__.sl==1) {
  this.setData({
      searchlist:[],
      search:currPage.__data__.search
    })
    this.searchlist();
  }

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
     // 显示加载图标
     wx.showLoading({
      title: '玩命加载中',
      duration: 1000
    })
    let page = '';
   
    let currentTab = this.data.currentTab;
    if(currentTab==0){
      
      page=this.data.page+1;
      this.setData({
        page:this.data.page+1
      })
    }
    if(currentTab==1){
      page=this.data.page1+1;
      this.setData({
        page1:this.data.page1+1
      })
    }
    if(currentTab==2){
      page=this.data.page2+1;
      this.setData({
        page2:this.data.page2+1
      })
    }
    console.log(page);
    this.GetInterviewList(currentTab,page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})