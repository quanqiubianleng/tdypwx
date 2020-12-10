// pages/blog1/canvas.js
const app = getApp()
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
/*         um3: 1,
        um2: 1,
        um1: 0,         
      //控制progress
      count: 0, // 设置 计数器 初始为0 */
      countTimer: null,// 设置 定时器
      progress_txt: '300人',// 提示文字
      list:null, 
      start_timer:null,
      counts:0,     
    },
   
 // 菜单链接
 checkLogin:function(e) {
    //console.loge.currentTarget.dataset.url);
    var url = e.currentTarget.dataset.url;
    if('..//'==url){
      wx.showToast({ icon: "none", title: '请先登录' });
      setTimeout(() => { wx.navigateTo({ url: '/pages/loginByWechat/loginByWechat' }) }, 1500);
    }else{
      wx.redirectTo({ url: url });  
      //wx.redirectTo({ url: "../home/home"  }) 
    }
  
  },      
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var datad = {
      };
      let rendata = app.requestfun(datad, '/Api/Bossboard/index'); 
      rendata.then((v) => {
        if (v.data.list) {
          //console.log(v.data);
          var list = v.data.list;          
          this.setData({
            list:list
          }); 
          var rolenames = wx.getStorageSync('rolename');
          this.setData({role_name:rolenames});
          var pagemessage = wx.getStorageSync('pagemessage');
          this.setData({pagemessage:pagemessage});      
          
          var lis1 = v.data.list;
          //console.log(lis1);
        //开始progress
        //入职
        this.startProgress(100,100,'canvasProgressbg','canvasProgress','#D7F0FC','#5ABDF2');
        this.startProgress(lis1[0].datesum,500,'canvasProgressbg1','canvasProgress1','#D7F0FC','#5ABDF2');  
          //邀约
        this.startProgress(100,100,'canvasProgressbg2','canvasProgress2','#F9B4A0','#FA541C');
        this.startProgress(lis1[1].datesum,500,'canvasProgressbg3','canvasProgress3','#F9B4A0','#FA541C');  
        //面试
        this.startProgress(100,100,'canvasProgressbg4','canvasProgress4','#D9E2FF','#3D6CFE');
        this.startProgress(lis1[2].datesum,500,'canvasProgressbg5','canvasProgress5','#D9E2FF','#3D6CFE');      
        }
      })  

/*       // 轮询未读消息数量
      var start_timer=  setInterval(()=>{
        var counts = wx.getStorageSync('messagecount');
        this.setData({
          counts:counts
        });
        ////console.log46464);
      },1000);    
      this.setData({
        start_timer:start_timer
      });   */  
    },
    /**
     * 生命周期函数--监听页面卸载
     */
/*     onUnload: function () {
      //console.log'页面走了onUnload');
        clearInterval(this.data.start_timer);
    },    */ 

    /**
    * 画progress底部背景
    */
    drawProgressbg: function (backid,backcolor) {
      
            // 使用 wx.createContext 获取绘图上下文 context
            var ctx = wx.createCanvasContext(backid)
            // 设置圆环的宽度
            ctx.setLineWidth(20);
            // 设置圆环的颜色
            ctx.setStrokeStyle(backcolor);
            // 设置圆环端点的形状
            ctx.setLineCap('round')
            //开始一个新的路径
            ctx.beginPath();
            //设置一个原点(110,110)，半径为100的圆的路径到当前路径
            ctx.arc(50, 50, 40, 0, 2 * Math.PI, false);
            //对当前路径进行描边
            ctx.stroke();
            //开始绘制
            ctx.draw();
        
    },
   
    /**
     * 画progress进度
     */
    drawCircle: function (step,noid,nocolor) {

            // 使用 wx.createContext 获取绘图上下文 context
            var context = wx.createCanvasContext(noid);
            // 设置圆环的宽度
            context.setLineWidth(20);
            // 设置圆环的颜色
            context.setStrokeStyle(nocolor);
            // 设置圆环端点的形状
            context.setLineCap('round')
            //开始一个新的路径
            context.beginPath();
            //参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
            context.arc(50, 50, 40, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
            //对当前路径进行描边
            context.stroke();
            //开始绘制
            context.draw();


    },
   
    /**
     * 开始progress
     * backcol
     */
    startProgress: function (mini,maxs,backid,noid,backcolor,nocolor) {
      //绘制背景
      this.drawProgressbg(backid,backcolor);

      this.setData({
        count: 0
      });
      // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
      this.countTimer = setInterval(() => {
        if (this.data.count <= mini) {
          /* 绘制彩色圆环进度条  
          注意此处 传参 step 取值范围是0到2，
          所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
          */
          this.drawCircle(this.data.count / (maxs / 2),noid,nocolor)
          this.data.count++;
        } else {
          clearInterval(this.countTimer);
          //this.startProgress();//重复执行
        }
      }, 30)
    },
   
  })