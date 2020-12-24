const QQMapWX  = require("../../../utils/qqmap-wx-jssdk");
const qqmapsdk = new QQMapWX({
    key: 'JJPBZ-DXYYS-AT3OH-6AJSG-ZCP22-ECFYS'
  });
Page({
    data: {
        //城市下拉
        citySelected: '',
        city: '',
        cityData: {},
        hotCityData: [],
        _py: ["hot", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
        //搜索列表
        inputVal: '',
        searchList: [],
        cityListShow: true,
        inputListShow: false,
        hidden: true,
        showPy: '★',
        //搜索历史记录
        historyListShow: true,
        historyList: [],
        cityData:{},
        hotCityData: [
          {
            "id": "0",
            "name": "全国",
            "fullname": "全国",
        }, 
          {
                "id": "110000",
                "name": "北京",
                "fullname": "北京市",
            },
            {
                "id": "310000",
                "name": "上海",
                "fullname": "上海市",
            },
            {
                "id": "320500",
                "name": "苏州",
                "fullname": "苏州市",
            },
            {
                "id": "330100",
                "name": "杭州",
                "fullname": "杭州市",
            },
            {
                "id": "440100",
                "name": "广州",
                "fullname": "广州市",
            },
            {
                "id": "440300",
                "name": "深圳",
                "fullname": "深圳市",
            },
            {
                "id": "510100",
                "name": "成都",
                "fullname": "成都市",
            }
        ]
    },
    onLoad: function(options) {
       let city = options.currentCity;
       this.setData({
        city:city
       })
    },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function (res) {//成功后的回调
        var params = res.result[0];
        var cityList = []
        for (var i = 0; i < params.length; i++) {
          var letterFirst = params[i].pinyin[0].substr(0, 1).toUpperCase();
          if (isCityList(letterFirst)) {
            for (var k = 0; k < cityList.length; k++) {
              if (letterFirst == cityList[k].index) {
                cityList[k].list.push({
                    id: params[i].id,
                  fullname: params[i].fullname,
                });
                break;
              }
            }
          } else {
            cityList.push({
              index: letterFirst,
              list: [{
                id: params[i].id,
                fullname: params[i].fullname,
              }]
            })
          }
        }
 //判断当前标识是否在cityList当中
        function isCityList(letterFirst) {
          var bStop = false;
          for (var i = 0; i < cityList.length; i++) {
            if (cityList[i].index == letterFirst) {
              bStop = true;
              break;
            }
          }
  
          return bStop; //存在为true 不存在未false
        }
        //     //排序
        cityList.sort((item1, item2) => {
          if (item1.index > item2.index) {
            return 1;
          } else {
            return -1;
          }
        })
        _this.setData({
            cityData:cityList
        })

      },
      fail: function (error) {
        console.error(error);
      }
    });
  },

    //搜索关键字
    keyword: function(keyword) {
        var that = this;
        $.map.getInputtips({
            keywords: keyword,
            location: that.data.longitude + "," + that.data.latitude,
            success: function(data) {
                if (data && data.tips) {
                    var searchList = data.tips.filter((item) => {
                        return typeof item.location != 'undefined';
                    })
                    that.setData({
                        searchList: searchList
                    });
                }
            }
        });
    },
    //选择城市
    selectCity: function(e) {
        var cityNameTemp = e.currentTarget.dataset;
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
        let prevPage = pages[ pages.length - 2 ];  
        prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
          cityNameTemp:cityNameTemp,
        })
        wx.navigateBack({
          data:-1
        })
    },
   
    touchend: function(e) {
        var history = this.data.historyList;
        var move = this.data.Mstart - e.changedTouches[0].pageX;
        history[this.data.index].x = move > 100 ? -180 : 0;
        this.setData({
            historyList: history
        });
    },
    //获取文字信息
    getPy: function(e) {
        this.setData({
            hidden: false,
            showPy: e.target.id,
        })
    },

    setPy: function(e) {
        this.setData({
            hidden: true,
            scrollTopId: this.data.showPy
        })
    },

    //滑动选择城市
    tMove: function(e) {
        var y = e.touches[0].clientY,
            offsettop = e.currentTarget.offsetTop;

        //判断选择区域,只有在选择区才会生效
        if (y > offsettop) {
            var num = parseInt((y - offsettop) / 12);
            this.setData({
                showPy: this.data._py[num]
            })
        };
    },

    //触发全部开始选择
    tStart: function() {
        this.setData({
            hidden: false
        })
    },

    //触发结束选择
    tEnd: function() {
        this.setData({
            hidden: true,
            scrollTopId: this.data.showPy
        })
    },
   
})