//index.js
//获取应用实例
const app = getApp()

Page({
  data: { 
    ifName2:false,       
    ifName1:false,
    ifNames: false,
    btussdwhon2:1,
    btussdwhon1:1,    
    ifName: false,//是否隐藏对话框
    ifswoh:true,
    id:'',
    list:null,
    list1:{},    
    typeid:'',
    index:10000,   
  },

 
   
  abandonon: function () {
    this.setData({
      ifName1: 0,
    })
  },   

  abandonon2: function () {
    this.setData({
      ifName2: 0,
    })
  }, 
//设为已读
  operation:function(e){
    //console.loge);
    this.setData({
      ifName2: 1,
      id:e.currentTarget.dataset.id,
      index:e.currentTarget.dataset.index,
    })
  },


   //删除通知
   abandon:function(e){
    //console.loge);     
    this.setData({
      ifName1: 1,
      id:e.currentTarget.dataset.id,
      index:e.currentTarget.dataset.index,
    })
  }, 
 
  //确定删除
  abandonyse: function () {
    let _this = this;
    this.setData({
      ifName1: 0,
    });
    var datad = {
      id:this.data.id,
      type:2
    };
    var lists = _this.data.list;
    lists.splice(_this.data.index,1);    
    let rendata = app.requestfun(datad, '/Api/Message/setworddel'); 
    rendata.then((v) => {
      _this.setData({
        list:lists,
      });   
      
      


      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];     //获取上一个页面
      var types = this.data.typeid;
      if(1==types){
        if(prevPage.data.sysNotice1>=1){
          var is = prevPage.data.sysNotice1 - 1;
          prevPage.setData({                                      //修改上一个页面的变量
            sysNotice1: is
            })              
        }            
      }else if(2==types){
        if(prevPage.data.sysNotice2>=1){
          var is = prevPage.data.sysNotice2 - 1;
          prevPage.setData({                                      //修改上一个页面的变量
            sysNotice2: is
            })              
        }            
      }else if(3==types){
        if(prevPage.data.sysNotice3>=1){
          var is = prevPage.data.sysNotice3 -1;
          prevPage.setData({                                      //修改上一个页面的变量
            sysNotice3: is
            })              
        }            
      }else if(4==types){
        if(prevPage.data.sysNotice4>=1){
          var is = prevPage.data.sysNotice4 -1;
          prevPage.setData({                                      //修改上一个页面的变量
            sysNotice4: is
            })              
        }            
      }else if(5==types){
        if(prevPage.data.sysNotice5>=1){
          var is = prevPage.data.sysNotice5 -1;
          prevPage.setData({                                      //修改上一个页面的变量
            sysNotice5: is
            })
        }
      }
      //console.logprevPage.data); 

      
      //console.logv.data);              
    })    
  },  

    //确定设为已读
    abandonyse2: function () {
      var _this = this;
      this.setData({
        ifName2: 0,
      });
      var datad = {
        id:this.data.id,
        type:1
      };   
      var lists = _this.data.list;
      lists[_this.data.index].status = 1;
      let rendata = app.requestfun(datad, '/Api/Message/setworddel'); 
      rendata.then((v) => {
          _this.setData({
            list:lists,
          });


          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];     //获取上一个页面
          var types = this.data.typeid;
          if(1==types){
            if(prevPage.data.sysNotice1>=1){
              var is = prevPage.data.sysNotice1 - 1;
              prevPage.setData({                                      //修改上一个页面的变量
                sysNotice1: is
                })              
            }            
          }else if(2==types){
            if(prevPage.data.sysNotice2>=1){
              var is = prevPage.data.sysNotice2 - 1;
              prevPage.setData({                                      //修改上一个页面的变量
                sysNotice2: is
                })              
            }            
          }else if(3==types){
            if(prevPage.data.sysNotice3>=1){
              var is = prevPage.data.sysNotice3 -1;
              prevPage.setData({                                      //修改上一个页面的变量
                sysNotice3: is
                })              
            }            
          }else if(4==types){
            if(prevPage.data.sysNotice4>=1){
              var is = prevPage.data.sysNotice4 -1;
              prevPage.setData({                                      //修改上一个页面的变量
                sysNotice4: is
                })              
            }            
          }else if(5==types){
            if(prevPage.data.sysNotice5>=1){
              var is = prevPage.data.sysNotice5 -1;
              prevPage.setData({                                      //修改上一个页面的变量
                sysNotice5: is
                })
            }
          }
          //console.logprevPage.data); 

          //console.logv.data);  

      })    
    }, 

  onLoad: function (e) {
    //console.loge);
    let _this = this;
    var ids = e.id;
    this.setData({
      typeid:ids
    });
    var postda = {
      mesype:ids,
      lslsll:5324313
    };
    //console.logpostda);
    let rendata = app.requestfun(postda, '/Api/Message/index'); 
    rendata.then((v) => {
      var lists = v.data.list;
      _this.setData({
        list:lists
      })
    });    
  },
 
})
