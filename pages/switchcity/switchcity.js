var city = require('../../utils/city.js');
var app = getApp()
var cityname;
var cityid;
var urltypecode;
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "北京市",
    hotcityList: [{ code: 101, city: '北京市' }, { code: 19, city: '上海市' }, { code: 290, city: '广州市' }, { code: 300, city: '深圳市' }, { code: 178, city: '杭州市' }, { code: 163, city: '南京市' }, { code: 259, city: '武汉市' }, { code: 242, city: '郑州市' }, { code: 12, city: '天津市' }, { code: 397, city: '西安市' }, { code: 325, city: '成都市' }, { code: 37, city: '重庆市' }]
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    urltypecode = options.urltypecode;
    console.log(urltypecode)
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    cityname = app.globalData.citydata.cityname;
    if (cityname == "" || cityname == null) {
      this.setData({ city: '北京市' })
    } else {
      this.setData({ city: cityname })
    }
    console.log(cityname);
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    cityname = e.currentTarget.dataset.city;
    cityid = e.currentTarget.dataset.citycode;
    if (urltypecode == 1) {
      app.globalData.citydata = { cityname: cityname, cityid: cityid };
    } else if (urltypecode == 2) {
      app.globalData.peopledata = { cityname: cityname, cityid: cityid };
    } else {
      app.globalData.educationdata = { cityname: cityname, cityid: cityid };
    }
    this.setData({ city: e.currentTarget.dataset.city })
    wx.navigateBack()
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  }
})