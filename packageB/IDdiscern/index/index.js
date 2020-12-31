// packageB/IDdiscern/index/index.js
const app = getApp();
var amapFile = require('../../../utils/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list :[
      {
        name:'社会合伙人',
        type:12,
        status:3,
        desc:"定义：指不在平台上找工作就业的人员，愿意在平台的管理和指导下，开展就业平台推广工作的个人。"
      },
      {
        name:'在职推荐人',
        type:14,
        status:3,
        desc:"定义：指在平台上找到工作的就业者，愿意在平台的管理和指导下，开展就业平台推广工作的个人。"
      },
      {
        name:'校园代理',
        type:15,
        status:3,
        desc:"定义：指在校学生，愿意在平台的管理和指导下，开展就业平台推广工作的个人。"
      },
      {
        name:'渠道运营商',
        type:16,
        status:3,
        desc:"定义：指配备有一定数量从业人员，愿意在平台的管理和指导下，负责指定区/县地区就业平台推广工作的独立法人机构或自然团体。"
      },{
        name:'站长合伙人',
        type:17,
        status:3,
        desc:"定义：指具有门店、固定场地、区域人脉，愿意在平台的管理和指导下，开展就业平台推广工作的个人。"
      },{
        name:'乡镇推荐人',
        type:18,
        status:3,
        desc:"定义：指在乡镇、村有一定人脉，愿意在平台的管理和指导下，开展就业平台推广工作的个人"
      },{
        name:'内部员工',
        type:4,
        status:3,
        desc:"定义：指平台内部从业人员。"
      },
    ],
    status:'',
    show:false,
    frame:false,
    province:[],
    pro:'',
    p_inx:null,
    p_code:null,
    citys:[],
    city:'',
    c_inx:null,
    c_code:null,
    countys:[],
    county:'',
    co_inx:null,
    cc_code:null,
    towns:[],
    town:'',
    t_inx:null,
    t_code:null
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let status = options.status;
    console.log(status)
    let Valuable = options.Valuable;
    console.log(Valuable);
    if(status&&Valuable){
     let list=this.data.list;
     for (let index = 0; index < list.length; index++) {
        if(Valuable==list[index].type){
          list[index].status=status;
        }
     }
     if(status!=0){
      this.setData({
        show:true,
        status:status,
        Valuable:Valuable,
        index:Valuable,
        list:list
      })
     }
     if(status==0){
      this.setData({
        show:false,
        status:status,
        Valuable:Valuable,
        index:Valuable,
        list:list
      })
     }
     
    }
   let subdistrict=1;
  let keywords='';
   this.amapFile(keywords,subdistrict)
  },
  amapFile:function(keyword,sub){
    let that = this;
    let data = {
      keywords:keyword,
      subdistrict : 1,
      key : '69c8498d07aefc3360063fb83c21e6fd',
      output:'JSON'
    }
     wx.request({
      url: "https://restapi.amap.com/v3/config/district",data,  //如果不设置method 则默认get请求地址
      success: function(res) {
        if(sub==1){
          that.setData({
            province:res.data.districts[0].districts
          })
        }
        if(sub==2){
          that.setData({
            citys:res.data.districts[0].districts
          })
        }
        if(sub==3){
          that.setData({
            countys:res.data.districts[0].districts
          })
        }
        if(sub==4){
          that.setData({
            towns:res.data.districts[0].districts
          })
        }
      },
    })
  },
  open:function(){
    this.setData({
      condition:!this.data.condition,
      address:this.data.pro  +this.data.city  + this.data.county  + this.data.town
    })
  },
  opens:function(){
    this.setData({
      condition:!this.data.condition,
    })
  },
  select:function(e){
    let sub = e.currentTarget.dataset.sub;
    if(sub==2){
      this.setData({
        pro:e.currentTarget.dataset.name,
        p_inx:e.currentTarget.dataset.index,
        p_code:e.currentTarget.dataset.code,

        citys:[],
        city:'',
        c_code:null,
        c_inx:null,

        countys:[],
        county:'',
        co_inx:null,
        cc_code:null,

        towns:[],
        town:'',
        t_inx:null,
        t_code:null,
        
      })
      this.amapFile(e.currentTarget.dataset.code,e.currentTarget.dataset.sub)
    }
    if(sub==3){
      this.setData({
        city:e.currentTarget.dataset.name,
        c_inx:e.currentTarget.dataset.index,

        countys:[],
        county:'',
        co_inx:null,
        cc_code:null,

        towns:[],
        town:'',
        t_inx:null,
        t_code:null,
        c_code:e.currentTarget.dataset.code
      })
      this.amapFile(e.currentTarget.dataset.code,e.currentTarget.dataset.sub)
    }
    if(sub==4){
      this.setData({
        county:e.currentTarget.dataset.name,
        co_inx:e.currentTarget.dataset.index,
        towns:[],
        town:'',
        t_inx:null,
        t_code:null,
        cc_code:e.currentTarget.dataset.code
      })
      this.amapFile(e.currentTarget.dataset.code,e.currentTarget.dataset.sub)
    }
    if(sub==5){
      this.setData({
        town:e.currentTarget.dataset.name,
        t_inx:e.currentTarget.dataset.index,
        t_code:e.currentTarget.dataset.code
      })
    }
  },
  close:function(){
    this.setData({
      show:false
    })
  },
  go:function(e){
    wx.navigateTo({
      url: '/packageB/library/index/index',
    })
  },
  phone:function(e){
    let mobile ='400-899-8877' ;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  addPartner:function(e){
    let that = this;
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;
    let status = that.data.status;
    let Valuable = that.data.Valuable;
    if(type==Valuable&&status==1){
      app.msg("你已申请，无需重复申请！");
       return;
    }
    if(status&&Valuable){
      let Tips1 = "你已申请";
      let Tips2= '';
      for (let index = 0; index < this.data.list.length; index++) {
       if(Valuable==this.data.list[index].type){
        Tips2=that.data.list[index].name
       }
      }
      let Tips3 = ",是否确认更换";
      let Tips = Tips1+Tips2+Tips3;
      wx.showModal({
        title: '提示',
        content: Tips,
        success: function (sm) {
          if (sm.confirm) {
            that.setData({
              frame:true,
              type:type,
              inx:index
            })
          }
          }
      })
    }else{
      let Tips1 = "你是否确定申请";
      let Tips2 = that.data.list[index].name;
      let Tips = Tips1+Tips2;
      wx.showModal({
        title: '提示',
        content: Tips,
        success: function (sm) {
          if (sm.confirm) {
            that.setData({
              frame:true,
              type:type,
              inx:index,
              pro:'',
              p_inx:null,
              p_code:null,

              citys:[],
              city:'',
              c_inx:null,
              c_code:null,

              countys:[],
              county:'',
              co_inx:null,
              cc_code:null,
              towns:[],
              town:'',
              t_inx:null,
              t_code:null
            })
          }
          }
      })
    }
    // if(status==0||status==1){
    //   app.msg("你已申请，无需重复申请！");
    //   return;
    // } else{
    //   
    //    }
  
    
    
  },
  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  ID:function(e){
    this.setData({
      ID:e.detail.value
    })
  },
  tel:function(e){
    this.setData({
      tel:e.detail.value
    })
  },
  detail:function(e){
    this.setData({
      details:e.detail.value
    })
  },
  quxiao:function(){
    this.setData({
      frame:false
    })
  },
  queren:function(){
    let name= this.data.name;
    if(!name){
      app.msg("请输入姓名");
      this.setData({
        roll:'1',
      })
      return;
    }
    let ID= this.data.ID;
    if(!ID){
      app.msg("请输入身份证");
      this.setData({
        roll:'2',
      })
      return;
    }
    var pattsss = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!pattsss.test(ID)) {
      this.setData({
        roll:'2',
      })
      app.msg("身份证号不正确");
      return;
    }
    let tel= this.data.tel;
    if(!tel){
      app.msg("请输入联系电话");
      this.setData({
        roll:'3',
      })
      return;
    }
    var patts = /^\d{11}$/g;
    if (!patts.test(tel)) {
      this.setData({
        roll:'3',
      })
      app.msg("联系电话方式不正确");
      return;
    }
    if(this.data.type==17){
      if(!this.data.pro){
        app.msg("请选择完整的工作区域");
        this.setData({
          roll:'4',
        })
        return;
      }
      if(!this.data.city){
        app.msg("请选择完整的工作区域");
        this.setData({
          roll:'4',
        })
        return;
      }
      if(!this.data.county){
        app.msg("请选择完整的工作区域");
        this.setData({
          roll:'4',
        })
        return;
      }
      if(!this.data.town){
        app.msg("请选择完整的工作区域");
        this.setData({
          roll:'4',
        })
        return;
      }
    }
    let address = this.data.pro+this.data.city+this.data.county+this.data.town;
    let code = this.data.p_code + ','+this.data.c_code+ ',' +this.data.cc_code + ',' +this.data.t_code;
    let type = this.data.type;
    let index = this.data.inx;
    var datad = {
        type:type,
        name:name,
        idcard:ID,
        mobile:tel,
        address:address,
        code:code
      };
      let rendata = app.requestfun(datad, '/Api/UserAuto/addPartner',true);    
      rendata.then((v) => {
        if(v.data.status==1){
          wx.showModal({
            title: '提示',
            content: '已提交申请',
            showCancel: false, 
            success: function (sm) {
                if (sm.confirm) {
                  wx.navigateBack();
                }
              }
          })
          //   let lists = this.data.list;
          //   for (let i = 0; i < lists.length; i++) {
          //     if(index==i){
          //       lists[index].status=0;
          //     }
          //     else{
          //       lists[i].status=3;
          //     }
          //   }
          // this.setData({
          //   index:type,
          //   list:lists,
          //   frame:false
          // }),
         
        }else{
          let that = this;
          wx.showModal({
            title: '提示',
            content: '您输入的信息与实名认证的信息不一致!',
            showCancel: false, 
            success: function (sm) {
              if (sm.confirm) {
                that.setData({
                  frame:false
                })
              }
              }
          })
        }
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