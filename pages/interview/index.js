// pages/interview/index.js
var app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
        * 页面配置
        */
       toView:'',
       winWidth: 0,
       winHeight: 0,
       // tab切换
       currentTab: 0,
       //id=lin的跳转
       aa:'',//锚点距离屏幕顶部的位置
       bb:'',//起点距离屏幕顶部位置
       //id=lins的跳转
       cc:'',//锚点距离屏幕顶部的位置
       dd:'',//起点距离屏幕顶部位置
       dates:'1995-01-01',
       date: '',
       sex:'',
       marriage:'',
       nature: '',
       Mingzu:['汉族','回族','藏族','穿青族','苗族','彝族','壮族','布依族','蒙古族','维吾尔族','朝鲜族','满族','侗族','瑶族','白族','土家族','哈尼族','哈萨克族','傣族','黎族','僳僳族','佤族','畲族','高山族','拉祜族','水族','东乡族','纳西族','景颇族','柯尔克孜族','土族','达斡尔族','仫佬族','羌族','布朗族','撒拉族','毛南族','仡佬族','锡伯族','阿昌族','普米族','塔吉克族','怒族','乌孜别克族','俄罗斯族','鄂温克族','德昂族','保安族','裕固族','京族','塔塔尔族','独龙族','鄂伦春族','赫哲族','门巴族','珞巴族','基诺族'],
       education:'',
      channel: '',
      tattoo: '',
      bottom: '',
      deformity: '',
      stay: '',
      experience: '',
      Entry: '',
      wordarea: '',
       onemergencycontact:['请选择','父女','父子','母女', '母子','配偶','子女', '兄弟姐妹', '朋友'],
       date2: [],
       date3: [],
       unitNmae:[],
       post:[],
       number:1,
       lists:[{}],
       hzid:'',
       imgindex:'',
       show:'',
       title:'',
       display1:'block',
       display:'none',
       seleshow:false,
       Skill:[],
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;

    var scene = decodeURIComponent(options.scene);  
   console.log(typeof( wx.getStorageSync('scene')))
    if(wx.getStorageSync('scene').length>0){
      console.log(111)
      let scene = wx.getStorageSync('scene');
      wx.setStorageSync('scene',scene);
    }else{
      console.log(222);
      if(scene&&scene!='undefined'){
        wx.setStorageSync("scene",scene)
     }
     if(!scene){
       console.log(333);
      wx.setStorageSync("scene",1)
      }
    }
   
    that.GetSkill();
    /**
     * 获取系统信息
     */
    wx.getSystemInfo( {
      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  GetSkill:function(e){
    let that = this;
    let data ={};
    let rendata = app.requestfun(data, '/Api/Interviewvue/GetSkill'); 
    rendata.then((v) => {
      if(v.data.status==1){
        if(v.data.skill){
          let skill =v.data.skill;
          for (let index = 0; index < skill.length; index++) {
            skill[index].selected = false;
          }
          that.setData({
            GetSkill:skill
          })
        }
        else{
          that.setData({
            GetSkill:[]
          })
        }
      }else{
        that.setData({
          GetSkill:[]
        })
      }
    });
  },
  checkboxChange(e) {
    let index = e.target.dataset.index ;
    let GetSkill = this.data.GetSkill;
    let string = "GetSkill[" + e.target.dataset.index + "].selected"
    console.log(string);
    this.setData({
     [string]: !this.data.GetSkill[e.target.dataset.index].selected
    })
    let detailValue = this.data.GetSkill.filter(it => it.selected).map(it => it.name)
   
    let id = '';
    for (let i = 0; i < GetSkill.length; i++) {
        if(true == GetSkill[i]['selected']){
          if(i==0){
            id=GetSkill[i]['id'];
            console.log(222)
          }else{
            if(!id){
              id=GetSkill[i]['id'];
            }else{
              id+=','+GetSkill[i]['id'];
            }
          }
          
        }
    }
    this.setData({
      ids:id,
       Skill:detailValue,
    })
    console.log(GetSkill,id);


   },
  //滚动获取元素id距顶部的位置
  bindscroll:function(e){
    
    var that = this;
  
      wx.createSelectorQuery().select('#lint').boundingClientRect(function(rect){
        let distance = rect.top;
        if(distance>=-200){
         that.setData({
           currentTab:0
         });
        }
        if(distance<=-200){
         that.setData({
           currentTab:1
         });
        }
       }).exec();
       wx.createSelectorQuery().select('#lints').boundingClientRect(function(rect){
         let distance = rect.top;
          if(-200<distance>400){
          that.setData({
            currentTab:1
          });
         }
         if(distance<=500){
          that.setData({
            currentTab:2
          });
         }
        }).exec()
  },
  swichNav: function( e ) {
    // 获取标签元素上自定义的 data-opt 属性的值
    let current = e.currentTarget.dataset.current;
    let target = e.currentTarget.dataset.opt;
    this.setData({
      toView: target,
      currentTab:current
    })
  },
  //姓名
  userName:function(e){
    this.setData({
      userName:e.detail.value
    })
    
  },
  //身份证
  identity:function(e){
    this.setData({
      identity:e.detail.value
    })
  },
  //户籍地址
  Nationality:function(e){
    this.setData({
      Nationality:e.detail.value
    })
  },
  //面试吗
  code:function(e){
    this.setData({
      code:e.detail.value
    })
  },
  //联系电话
  userPhone:function(e){
    this.setData({
      userPhone:e.detail.value
    })
  },
  //紧急联系人
  urgentName:function(e){
    this.setData({
      urgentName:e.detail.value
    })
  },
  //紧急联系人电话
  urgentPhone:function(e){
    this.setData({
      urgentPhone:e.detail.value
    })
  },
  //出生日期
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
   // 性别
   onChange(event) {
    this.setData({
      sex: event.detail,
    });
  },
  Mingzu:function(e){
   
    this.setData({
      Mingzuindex: this.data.Mingzu[e.detail.value]
    })
  },
  education:function(e){
    this.setData({
      education: e.detail,
    });
  },
   //婚姻状况
   marriage: function(e) {
    this.setData({
      marriage: e.detail
    })
  },
  onemergencycontact:function(e){
    this.setData({
      onemergencycontactindex: e.detail.value
    })
  },
   //户口性质
   nature: function(e) {
    this.setData({
      nature: e.detail
    })
  },
    //面试时间
    // bindDateChange1: function(e) {
    //   this.setData({
    //     date1: e.detail.value
    //   })
    // },
     //来源渠道
     channel: function(e) {
    this.setData({
      channel: e.detail
    })
  },
    //有误纹身
    tattoo: function(e) {
      this.setData({
        tattoo: e.detail
      })
    },
      //有误案底
      bottom: function(e) {
        this.setData({
          bottom: e.detail
        })
      },
    //有无残疾
    deformity: function(e) {
      this.setData({
        deformity: e.detail
      })
    },
       //贵阳住宿
       stay: function(e) {
        this.setData({
          stay: e.detail
        })
      },
    //工厂经验
    experience: function(e) {
    this.setData({
      experience: e.detail
    })
    },
     //可入职时间
     Entry: function(e) {
      this.setData({
        Entry: e.detail
      })
      },
      //接受工作区域
      wordarea: function(e) {
      this.setData({
        wordarea: e.detail
      })
      },


     //工作开始时间
     bindDateChange2: function(e) {
      var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
      var val=e.detail.value;//获取输入的值
      var oldVal=this.data.date2;
      oldVal[nowIdx]=val;//修改对应索引值的内容
      this.setData({
        date2:oldVal
      })
    },

    //工作结束时间
    bindDateChange3: function(e) {
      var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
      var val=e.detail.value;//获取输入的值
      var oldVal=this.data.date3;
      oldVal[nowIdx]=val;//修改对应索引值的内容
      this.setData({
        date3: oldVal
      })
    },

  //工作单位
  unitNmae:function(e){
    var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
    var val=e.detail.value;//获取输入的值
    var oldVal=this.data.unitNmae;
    oldVal[nowIdx]=val;//修改对应索引值的内容
    this.setData({
      unitNmae:oldVal
    })
  },

  post:function(e){
    var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
    var val=e.detail.value;//获取输入的值
    var oldVal=this.data.post;
    oldVal[nowIdx]=val;//修改对应索引值的内容
    this.setData({
      post:oldVal
    })
  },
  seleshow:function(e){
    this.setData({
      seleshow:true
    })
  },
  onClose:function(e){
    this.setData({
      seleshow:false
    })
  },
  //添加多条工作经历
  add:function(){
    var list = this.data.lists;
    let date2 = this.data.date2;
    let date3 = this.data.date3;
    let unitNmae = this.data.unitNmae;
    let post = this.data.post;
    if(list.length>=10){
      app.msg("最多只能添加10条");
        return;
    }else{
        if(date2.length!=list.length&&date3.length!=list.length&&unitNmae.length!=list.length&&post.length!=list.length){
          app.msg("请填写完上一条");
          return;
        }else{
            list.push({});
            this.setData({
            lists: list
             })
          }
    }
  },
  //取消按钮
  reduce:function(e){   
    let that = this;
    let  position_id = e.currentTarget.dataset.position_id;
    let  user_id = that.data.user_id;
    if(position_id){
      wx.login({
        success:function(res){
          if(res.code){
            let data ={
              code:res.code,
              id:position_id,
              uid:user_id
            }
            let rendata = app.requestfun(data, '/Api/Interviewvue/delworkinfo'); 
            rendata.then((v) => {
              if(v.data.status==1){
                  let lists = that.data.lists;//循环内容
                  let date2 = that.data.date2;////所有的input值
                  let date3 = that.data.date3;//所有的input值
                  let unitNmae = that.data.unitNmae;//所有的input值
                  let post = that.data.post;//所有的input值
                  let productIndex = e.currentTarget.dataset.idx;//当前索引
                  lists.splice(productIndex,1);//删除当前索引的内容，这样就能删除view了
                  date2.splice(productIndex,1);//view删除了对应的input值也要删掉
                  date3.splice(productIndex,1);//view删除了对应的input值也要删掉
                  unitNmae.splice(productIndex,1);//view删除了对应的input值也要删掉
                  post.splice(productIndex,1);//view删除了对应的input值也要删掉
                  let position = that.data.position_id;
                  util.arrRemoveObj(position, position_id);
                  if (lists.length < 1) {
                    lists = [0]  //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
                  }
                  that.setData({
                    lists:lists,
                    date2: date2,
                    date3: date3,
                    unitNmae: unitNmae,
                    post:post,
                    position_id:position
                })
              }
            });
          }
        }
      })
    }else{
      let lists = that.data.lists;//循环内容
      let date2 = that.data.date2;////所有的input值
      let date3 = that.data.date3;//所有的input值
      let unitNmae = that.data.unitNmae;//所有的input值
      let post = that.data.post;//所有的input值
      let productIndex = e.currentTarget.dataset.idx;//当前索引
      lists.splice(productIndex,1);//删除当前索引的内容，这样就能删除view了
      date2.splice(productIndex,1);//view删除了对应的input值也要删掉
      date3.splice(productIndex,1);//view删除了对应的input值也要删掉
      unitNmae.splice(productIndex,1);//view删除了对应的input值也要删掉
      post.splice(productIndex,1);//view删除了对应的input值也要删掉
      if (lists.length < 1) {
        lists = [0]  //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
      }
      that.setData({
        lists:lists,
        date2: date2,
        date3: date3,
        unitNmae: unitNmae,
        post:post
      })
    } 
  },
  //提交
  submit:function(e){
      var that = this;
      let date2 =that.data.date2;
      let date3 =that.data.date3;
      let unitNmae =that.data.unitNmae;
      let post =that.data.post;
      var json = [];
      var array = {};
      for(var i = 0; i < date2.length; i++){
          array['stdate'] = date2[i];
          array['endate'] = date3[i];
          array['wordunit'] = unitNmae[i];
          array['duty'] = post[i];
          json.push(array)
          array = {};
      }
      var json_arrays = JSON.stringify(json);
     let userName = that.data.userName;
      if (!userName) {
        that.setData({
          currentTab:0,
          roll:'1',
          toView: 'userName',
        })
        app.msg("请输入姓名");
        return;
      }
      let identity = that.data.identity;
      var pattsss = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!identity) {
        that.setData({
          currentTab:0,
          roll:'4',
          toView: 'identity',
        })
        app.msg("请输入身份证号");
        return;
      }
      let Nationality = that.data.Nationality;
      if (!Nationality) {
        that.setData({
          currentTab:0,
          roll:'5',
          toView: 'Nationality',
        })
        app.msg("请输入户籍地址");
        return;
      }
    if (!pattsss.test(identity)) {
      that.setData({
        currentTab:0,
        roll:'4',
        toView: 'identity',
      })
      app.msg("身份证号不正确");
      return;
    }
      let date = that.data.date;
      if (!date) {
        that.setData({
          currentTab:0,
          roll:'2',
          toView: 'date',
        })
        app.msg("请选择出生日期");
        return;
      }
      let Mingzu = that.data.Mingzuindex;
      if (!Mingzu) {
        that.setData({
          currentTab:0,
          roll:'3',
          toView: 'Mingzu',
        })
        app.msg("请选择名族");
        return;
      }
      let nature = that.data.nature;
      if (!nature) {
        app.msg("请选择户口性质");
        return;
      }
      let sex = that.data.sex;
      if (!sex) {
        app.msg("请选择性别");
        return;
      }
      let marriage = that.data.marriage;
      if (!marriage) {
        app.msg("请选择婚姻状况");
        return;
      }
      let education = that.data.education;
      if (!education) {
        app.msg("请选择学历");
        return;
      }
      let code = that.data.code;
      if (!code) {
        that.setData({
          currentTab:1,
          roll:'6',
          toView: 'Nationality',
        })
        app.msg("请输入面试邀请码");
        return;
      }
      let userPhone = that.data.userPhone;
      var patts = /^\d{11}$/g;
      if (!userPhone) {
        that.setData({
          currentTab:1,
          roll:'7',
          toView: 'userPhone',
        })
        app.msg("请输入联系电话");
        return;
      }
      if (!patts.test(userPhone)) {
        that.setData({
          currentTab:1,
          roll:'7',
          toView: 'userPhone',
        })
        app.msg("联系电话方式不正确");
        return;
      }
      let urgentName = that.data.urgentName;
      if (!urgentName) {
        that.setData({
          currentTab:1,
          roll:'8',
          toView: 'urgentName',
        })
        app.msg("请输入紧急联系人");
        return;
      }
      let urgentPhone = that.data.urgentPhone;
      var pattss = /^\d{11}$/g;
      if (!urgentPhone) {
        that.setData({
          currentTab:1,
          roll:'9',
          toView: 'urgentName',
        })
        app.msg("请输入紧急联系人关系电话");
        return;
      }
      if (!pattss.test(urgentPhone)) {
        app.msg("紧急联系人关系电话方式不正确");
        return;
      }
      let relation =that.data.onemergencycontactindex;
      if (!relation||relation==0) {
        that.setData({
          currentTab:1,
          roll:'10',
          toView: 'relation',
        })
        app.msg("请输入与紧急联系人关系");
        return;
      }
      let tattoo = that.data.tattoo;
      if (!tattoo) {
        app.msg("请选择有无纹身");
        return;
      }
      let bottom = that.data.bottom;
      if (!bottom) {
        app.msg("请选择有无案底");
        return;
      }
      let deformity =that.data.deformity;
      if (!deformity) {
        app.msg("请选择有无残疾");
        return;
      }
      let stay =that.data.stay;
      if (!stay) {
        app.msg("请选择有无贵阳住宿");
        return;
      }
      let experience = that.data.experience;
      if (!experience) {
        app.msg("请选择有无工厂经验");
        return;
      }
      let channel = that.data.channel;
      if (!channel) {
        app.msg("请选择应聘渠道");
        return;
      }
      let Entry = that.data.Entry;
      if (!Entry) {
        app.msg("请选择可入职时间");
        return;
      }
      let wordarea = that.data.wordarea;
      if (!wordarea) {
        app.msg("请选择工作范围");
        return;
      }
      let hzid =wx.getStorageSync('scene');
     
     console.log(hzid);
     
    let id = that.data.position_id;
    wx.showLoading({
      title: '正在提交中',
      duration: 1000,
      success:function(){
       wx.login({
         success (res) {
          let  codes = res.code;
          if(codes!=''){
           let userinfo = {
             username:userName,
             birthday:date,
             sex:sex,
             mobile:userPhone,
             race:Mingzu,
             education:education,
             marriage:marriage,
             uid:identity,
             censusaddress:Nationality,
             registered:nature,
             invitecode:code,
             tattoo:tattoo,
             source:channel,
             criminal:bottom,
             disability:deformity,
             address:stay,
             plantundergo:experience,
             entrytime:Entry,
             wordarea:wordarea,
             emergencycontact:urgentName,
             onemergencycontact:relation,
             nomobile:urgentPhone,
             woerkund:json_arrays,
             hzid:hzid,
             skill :that.data.ids ,
            //  id:id,
             code:codes
           }
           let rendata = app.requestfun(userinfo, '/Api/Interviewvue/addwork'); 
           rendata.then((v) => {
             if(v.data.status==1){
               that.setData({
                 display1:"none",
                 display:"block",
                 show:v.data.status,
                 title:v.data.message
               })
             }else{
               that.setData({
                 display1:"block",
                 display: "none",
                 show:0
               })
             }
           });
          }
         }
       });
    }
  })
  },
  hideviews: function() {
    let yes= 1;
    // wx.switchTab({
    //   url: '/pages/work/work',
    // })
    this.onUnload(yes);
   this. onHide(yes)
    this.setData({
      display1: "block",
      display: "none",
      show:0
      
    })
  },
  hideview: function() {
    this.setData({
      display1: "block",
      display: "none",
      show:0
    })
  },
  
  // onBeforeBack: function () {
  //   // 只要页面存在这个方法，并返回return wx.showModal就会监听拦截用户返回动作
  //   return wx.showModal({
  //     title: '提示',
  //     content: '信息尚未保存，确定要返回吗？',
  //     confirmStay: !1 //结合content意思，点击确定按钮后，是否留在原来页面，confirmStay默认false
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
          let data ={
            code:res.code
          }
          let rendata = app.requestfun(data, '/Api/Interviewvue/GetReservedUser'); 
          rendata.then((v) => {
            console.log(v);
            if(v.data.status==1&&v.data.userwork){
              let lists = [{}];
              let date2 =[];
              let date3 =[];
              let unitNmae =[];
              let post =[];
              let position_id= [];
              let list= v.data.userwork[0].worklest;
              let Skill = v.data.userwork[0].skill;
              let sk = [];
              let GetSkill = that.data. GetSkill;
              let dates =that.data.dates;
              let scene = v.data.userwork[0].hzid;
              // if(scene&&scene!=0&&scene!='undefined'){
              //   console.log(111);
              //   wx.setStorage({
              //     key:"scene",
              //     data:scene
              //   })
              // }
              if(v.data.userwork[0].birthday){
                dates = v.data.userwork[0].birthday;
              }
              if(Skill&&GetSkill.length>=1&&Skill!='undefined'){
                for (let i = 0; i < GetSkill.length; i++) {
                  if(typeof(Skill[i])==typeof(GetSkill[i]['id'])){
                    sk[i] = GetSkill[i]['name'];
                    GetSkill[i]['selected']=true;
                  }
                }
              }else{
                Skill=[];
                sk=[];
              }
              if(!list){
                lists = [{}];
                date2=[];
                position_id=''
                date3=[];
                unitNmae = [];
                post = [];
              }else{
                for (let index = 0; index < list.length; index++) {
                  lists[index] = index;
                  date2[index] =  v.data.userwork[0].worklest[index].stdate;
                  position_id[index] = v.data.userwork[0].worklest[index].id;
                  date3[index] =v.data.userwork[0].worklest[index].endate;
                  unitNmae[index] = v.data.userwork[0].worklest[index].wordunit;
                  post[index] = v.data.userwork[0].worklest[index].duty
               }
              }
              that.setData({
                dates:dates,
                GetSkill:GetSkill,
                ids:Skill,
                Skill:sk,
                user_id:v.data.userwork[0].id,//用户id
                userName:v.data.userwork[0].username,//姓名
                date:v.data.userwork[0].birthday,//,//出生年月
                sex:v.data.userwork[0].sex,//性别 1 男 2女
                Mingzuindex:v.data.userwork[0].race,//民族 
                education:v.data.userwork[0].education,//学历 
                marriage:v.data.userwork[0].marriage,//婚姻状况 1已婚 2未婚
                identity:v.data.userwork[0].uid,//身份证号
                Nationality:v.data.userwork[0].censusaddress,//户籍地址
                nature:v.data.userwork[0].registered,//户口性质
                userPhone:v.data.userwork[0].mobile,//联系电话
                code:v.data.userwork[0].invitecode,//邀 请 码
                channel:v.data.userwork[0].source,//应聘渠道
                tattoo:v.data.userwork[0].tattoo,//有无纹身
                bottom:v.data.userwork[0].criminal,//有无案底
                deformity:v.data.userwork[0].disability,//有无残疾
                stay:v.data.userwork[0].address,//贵阳住宿
                experience:v.data.userwork[0].plantundergo,//工厂经验 
                Entry:v.data.userwork[0].entrytime,//可入职时间  1当天 2 第二天 3第三天
                wordarea:v.data.userwork[0].wordarea,//接受工作区域 1省内 2省外 3都可以
                urgentName:v.data.userwork[0].emergencycontact,//紧急联系人
                onemergencycontactindex: v.data.userwork[0].onemergencycontact,//与紧急联系人关系  1父女 2父子 3母女 4母子  5配偶  6子女 7兄弟姐妹 8朋友
                urgentPhone:v.data.userwork[0].nomobile,//紧急联系人电话
                lists:lists,
                date2:date2,
                date3:date3,
                unitNmae:unitNmae,
                post:post,
                position_id: position_id
              })
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function (y) {
    var that = this;
    wx.onAppHide(function(){
        if(y==1){
            return;
            }
          
          let date2 =that.data.date2;
          let date3 =that.data.date3;
          let unitNmae =that.data.unitNmae;
          let post =that.data.post;
          var json = [];
          var array = {};
          for(var i = 0; i < date2.length; i++){
              array['stdate'] = date2[i];
              array['endate'] = date3[i];
              array['wordunit'] = unitNmae[i];
              array['duty'] = post[i];
              json.push(array)
              array = {};
          }
          var json_arrays = JSON.stringify(json);
          let userName = that.data.userName;
          let date = that.data.date;
          let sex = that.data.sex;
          let Mingzu = that.data.Mingzuindex;
          let education = that.data.education;
          let marriage = that.data.marriage;
          let identity = that.data.identity;
          let Nationality = that.data.Nationality;
          let nature = that.data.nature;
          let userPhone = that.data.userPhone;
          let code = that.data.code;
          let channel = that.data.channel;
          let tattoo = that.data.tattoo;
          let bottom = that.data.bottom;
          let deformity =that.data.deformity;
          let stay =that.data.stay;
          let experience = that.data.experience;
          let Entry = that.data.Entry;
          let wordarea = that.data.wordarea;
          let urgentName = that.data.urgentName;
          let relation =that.data.onemergencycontactindex;
          let urgentPhone = that.data.urgentPhone;
          let id =that.data.position_id;
          let hzid =wx.getStorageSync('scene');
            wx.login({
              success (res) {
              if(res.code){
                let userinfo = {
                  username:userName,
                  birthday:date,
                  sex:sex,
                  mobile:userPhone,
                  race:Mingzu,
                  education:education,
                  marriage:marriage,
                  uid:identity,
                  censusaddress:Nationality,
                  registered:nature,
                  invitecode:code,
                  tattoo:tattoo,
                  source:channel,
                  criminal:bottom,
                  disability:deformity,
                  address:stay,
                  plantundergo:experience,
                  entrytime:Entry,
                  wordarea:wordarea,
                  emergencycontact:urgentName,
                  onemergencycontact:relation,
                  nomobile:urgentPhone,
                  woerkund:json_arrays,
                  hzid:hzid,
                  skill :that.data.ids ,
                //  id:id,
                  code:res.code
                }
                let rendata = app.requestfun(userinfo, '/Api/Interviewvue/saveuserbasev1'); 
                rendata.then((v) => {
                  console.log(111);
                  console.log(v);
                });
              }
              }
            });
    })
    // console.log(222)
   
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (y) {
     console.log(111)
   if(y==1){
    return;
   }
   if(y!=1){
    var that = this;
   let date2 =that.data.date2;
   let date3 =that.data.date3;
   let unitNmae =that.data.unitNmae;
   let post =that.data.post;
   var json = [];
   var array = {};
   for(var i = 0; i < date2.length; i++){
       array['stdate'] = date2[i];
       array['endate'] = date3[i];
       array['wordunit'] = unitNmae[i];
       array['duty'] = post[i];
       json.push(array)
       array = {};
   }
   var json_arrays = JSON.stringify(json);
   let userName = that.data.userName;
   let date = that.data.date;
   let sex = that.data.sex;
   let Mingzu = that.data.Mingzuindex;
   let education = that.data.education;
   let marriage = that.data.marriage;
   let identity = that.data.identity;
   let Nationality = that.data.Nationality;
   let nature = that.data.nature;
   let userPhone = that.data.userPhone;
   let code = that.data.code;
   let channel = that.data.channel;
   let tattoo = that.data.tattoo;
   let bottom = that.data.bottom;
   let deformity =that.data.deformity;
   let stay =that.data.stay;
   let experience = that.data.experience;
   let Entry = that.data.Entry;
   let wordarea = that.data.wordarea;
   let urgentName = that.data.urgentName;
   let relation =that.data.onemergencycontactindex;
   let urgentPhone = that.data.urgentPhone;
   let id =that.data.position_id;
   let hzid =wx.getStorageSync('scene');
     
   console.log(hzid);
    wx.login({
      success (res) {
       let  codes = res.code;
       if(codes!=''){
        let userinfo = {
          username:userName,
          birthday:date,
          sex:sex,
          mobile:userPhone,
          race:Mingzu,
          education:education,
          marriage:marriage,
          uid:identity,
          censusaddress:Nationality,
          registered:nature,
          invitecode:code,
          tattoo:tattoo,
          source:channel,
          criminal:bottom,
          disability:deformity,
          address:stay,
          plantundergo:experience,
          entrytime:Entry,
          wordarea:wordarea,
          emergencycontact:urgentName,
          onemergencycontact:relation,
          nomobile:urgentPhone,
          woerkund:json_arrays,
          hzid:hzid,
          skill :that.data.ids ,
          // id:id,
          code:codes
        }
        let rendata = app.requestfun(userinfo, '/Api/Interviewvue/saveuserbasev1'); 
        rendata.then((v) => {
        });
       }
      }
    });
    }
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