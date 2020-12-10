// pages/datacenter/index/index.js
import * as echarts from '../../ec-canvas/echarts';
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
   width: width,
   height: height
  });
  canvas.setChart(chart);
  
  //这里复制了官方示例配置
  var option = {
     //画布背景色设置
     title: {
         text: "各月面试数据",
         left: '20',
         top:5,
         textStyle: {
             //设置主标题字体颜色
             color: "#333333",
         },
     },
     tooltip: {
         trigger: "axis"
     },
     legend: {
     },
     grid: {
      top:40,
      y2:40
     },
     toolbox: {
         show: true,
     },
     calculable: true,
     xAxis: [
         {
             type: "category",
             data: [ "1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
             axisLabel:{ 
              interval:0,//横轴信息全部显示    
              },
              axisTick: {
                //刻度线
                show: false
            }
         },
         
     ],
     yAxis: [
         {
             type: "value",
             axisLine: {
                 //y轴
                 show: false
             },
             axisTick: {
                 //刻度线
                 show: false
             },
             splitLine: {
                 //网格线
                 show: true
             },
             
         }
     ],
     series: [
         {
             type: "bar",
             //设置柱状图宽度
             barWidth: "13",
             data: [2.0,4.9,7.0,23.2,25.6,76.7,135.6,162.2,32.6,20.0,6.4,3.3],
             itemStyle: {
                 normal: {
                  // color:'#8AB4EC',
                  barBorderRadius: [12, 12, 0, 0], //柱形图圆角，顺时针左上，右上，右下，左下）
                  barBorderWidth: 1,
                  //颜色渐变
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#8CB5EC'
                     
                  },
                  {
                      offset: 1,
                      color: '#3881E2'
                  }]),
                  label: {
                    show: true,		//开启显示
                    position: 'top',	//在上方显示
                   
                    textStyle: {	    //数值样式
                        // color: '#3781E2',
                        fontSize: 10
                        
                    }
                }
                     
                    

                 }
             }
         },
     ]
 };
  chart.setOption(option);
  return chart;
 }
 function initCharts(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '各月面试数据',
      left: '20',
      top:5
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['2020年', '2019年'],
      top: 5,
      left: '180',
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
     top:40,
     y2:40
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      axisLabel:{ 
        interval:0,//横轴信息全部显示    
        },
        axisTick: {
          //刻度线
          show: false
      }
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      axisLine: {
        //y轴
        show: false
    },
      axisLabel:{ 
        interval:0,//横轴信息全部显示    
        },
       
        axisTick: {
          //刻度线
          show: false
      }
      // show: false
    },
    series: [{
      name: '2020年',
      type: 'line',
      symbol: 'none',
      smooth: true,
      data: [1,2,3,4,5,6,7,8,9,10,11,12]
    }, {
      name: '2019年',
      type: 'line',
      symbol: 'none',
      smooth: true,
      data: [12,11,10,9,8,7,6,5,4,3,2,1]
    }]
  };

  chart.setOption(option);
  return chart;
}
function initChartss(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '各月面试数据',
      left: '20',
      top:5
    },
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      show:false
    },
    grid: {
      left: 60,
      y:80,
      y2:15,
      top: 40,
    },
    xAxis: [
      {
      type: 'value', // 坐标轴类型,   'value' 数值轴，适用于连续数据
          // 坐标轴刻度
          axisTick: {
            show: false // 是否显示坐标轴刻度 默认显示
          },
          // 坐标轴轴线
          axisLine: { // 是否显示坐标轴轴线 默认显示
            show: false // 是否显示坐标轴轴线 默认显示
          },
          // 坐标轴在图表区域中的分隔线
          splitLine: {
            show: false // 是否显示分隔线。默认数值轴显示
          },
          // 坐标轴刻度标签
          axisLabel: {
            show: false // 是否显示刻度标签 默认显示
          }
        }
    ],
    yAxis: [
      {
         // 左侧Y轴
          // 坐标轴类型,  'category' 类目轴，适用于离散的类目数据
          // 为该类型时必须通过 data 设置类目数据
          type: 'category', 
          // 坐标轴刻度
          axisTick: {
            show: false // 是否显示坐标轴刻度 默认显示
          },
          // 坐标轴轴线
          axisLine: { // 是否显示坐标轴轴线 默认显示
            show: false, // 是否显示坐标轴轴线 默认显示
            lineStyle: { // 坐标轴线线的颜色
              color: '#cdd3ee'
            }
          },
          // 坐标轴在图表区域中的分隔线
          splitLine: {
            show: false // 是否显示分隔线。默认数值轴显示
          },
          // 坐标轴刻度标签
          axisLabel: {
            show: true, // 是否显示刻度标签 默认显示
            fontSize: 12, // 文字的字体大小
            color: '#7A7A7A', // 刻度标签文字的颜色
            // 使用字符串模板，模板变量为刻度默认标签 {value}
            formatter: '{value}'
          },
        data: ['第一季度', '第二季度', '第三季度', '第四季度'],
       
      }
    ],
    series: [
      {
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344],
        barMaxWidth: 20, 
        itemStyle: {
          barBorderColor: '#0C98BA',
          barBorderRadius: [0, 10, 10, 0],
          barBorderWidth: 1,
          //颜色渐变
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: '#3680E2'
          },
          {
              offset: 0.8,
              color: '#8BB5EC'
          }]),
        
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData : 0,
    datatype:0,
   
    ec:{
      onInit:initChart
     },
     ecs: {
      onInit: initCharts
    },
    ecss:{
      onInit: initChartss
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;

    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  datatype:function(e){
    const that = this;

    if (that.data.datatype === e.target.dataset.current){
        return false;
    }else{

      that.setData({
        datatype: e.target.dataset.current
      })
    }
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