// pages/resume/information.js
var app = getApp();
var path = app.getpath + '/resume/selectJobUserInfo';
var Util = require( '../../utils/util.js');
var tcity = require("../../utils/citys.js");
Page({
  data:{
    information:{},
    imgUrl: null,
    rightimg:'/images/jian_r.png',
    startDate: '1977-01-01',
    endDate: Util.formatDate_(new Date()),
    bdate: '',
    jdate: '',
    birthdays: Util.formatDate_(new Date()),
    joinJobDates: Util.formatDate_(new Date()),
    byears: Util.formatMonth(new Date()),
    jyears: Util.formatMonth(new Date()),
    hiddenLoading: true,
    registryText: "",
    registry: "",
    cityId: "",
    cityText: "",
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var uid = options.uid
    uid = uid > 0 ? uid : 7
    app.getUserInfo(function(userInfo){
        //更新数据
          that.setData({
            imgUrl:userInfo.avatarUrl
          })
    })
    lodingCity(that)
    Information(that, uid)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that = this
    if(app.globalData.peopledata.cityid != null) {
      that.setData({
        registryText: app.globalData.peopledata.cityname,
        registry: app.globalData.peopledata.cityid
      })
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindBirthdayChange: function(e) {
    var that = this
    var val = e.detail.value
    that.setData({
      bdate: val,
      byears: Util.splitDate(val)
    })
  },
  bindJoinJobDateChange: function(e) {
      var that = this
      var val = e.detail.value
      that.setData({
        jdate: val,
        jyears: Util.splitDate(val)
      })
  },
  formSubmit:function(e) {
    var formData = e.detail.value
    var that = this
    //手机验证
    if(!Util.verifyPhoneNumber(formData.iphone)) {
      wx.showModal({
        title: '手机号输入有误',
        showCancel: false
      })
      return
    }
    //身份证号验证
    if(Util.verifyCard(formData.card) == false){
      wx.showModal({
        title: '身份证号输入有误',
        showCancel: false
      })
      return
    }
    //邮箱验证
    if(Util.verifyEmail(formData.email) == false){
      wx.showModal({
        title: '邮箱输入有误',
        showCancel: false
      })
      return
    }
    that.setData({
      hiddenLoading: false
    })
    wx.request({
      url: app.getpath + "/resume/updateJobUserInfo",
      data: formData,
      header: {'content-Type': 'application/json;charset=UTF-8;'},
      method: 'POST',
      success: function(res){
        // success
        that.setData({
          hiddenLoading: true
        })
        wx.navigateBack()
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  changePlace:function(e){
    wx.navigateTo({
      url: '/pages/switchcity/switchcity?urltypecode=2'
    })
  },
  changeCity:function(e) {
    this.setData({
      condition: !this.data.condition,
    })
  },
  changeCitySure:function(e) {
    var provinceCode = this.data.province.code ? this.data.province.code + "," : ""
    var cityCode = this.data.city.code ? this.data.city.code + "," : ""
    var countyCode = this.data.county.code ? this.data.county.code : ""
    var provinceName = this.data.province.name ? this.data.province.name : ""
    var cityName = this.data.city.name ? this.data.city.name : ""
    var countyName = this.data.county.name ? this.data.county.name : ""
    if(provinceName == cityName) {
      cityName = ""
    }
    this.setData({
      condition: !this.data.condition,
      cityId: provinceCode + cityCode + countyCode,
      cityText: provinceName + cityName + countyName
    })
  },
  bindChange: function (e) {
    var val = e.detail.value;
    var t = this.data.values;
    var cityData = this.data.cityData;
    if (val[0] != t[0]) {
      const citys = [];
      const countys = [];
      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i])
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i])
      }
      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0],
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0],
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })
      return;
    }
    if (val[1] != t[1]) {
      const countys = [];
      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i])
      }
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0],
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  }
})
var Information = function (that, uid) {
  wx.request({
    url: path,
    data: {uid: uid},
    success: function(res){
      if(res.data.code == 0) {
        var results = res.data.result
        that.setData({
          information: results,
          birthdays: Util.subString(results.birthday, 10) ,
          joinJobDates: Util.subString(results.joinJobDate, 10) ,
          byears: Util.splitDate(results.birthday),
          jyears: Util.splitDate(results.joinJobDate),
          registryText: results.registryText,
          registry: results.registry,
          cityText: results.cityText,
          cityId: results.city
        })
      }
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}
var lodingCity = function(that) {
  tcity.init(that);
  var cityData = that.data.cityData;
  const provinces = [];
  const citys = [];
  const countys = [];
  for (let i = 0; i < cityData.length; i++) {
    provinces.push(cityData[i]);
  }
  for (let i = 0; i < cityData[0].sub.length; i++) {
    citys.push(cityData[0].sub[i])
  }
  for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
    countys.push(cityData[0].sub[0].sub[i])
  }
  that.setData({
    'provinces': provinces,
    'citys': citys,
    'countys': countys,
    'province': cityData[0],
    'city': cityData[0].sub[0],
    'county': cityData[0].sub[0].sub[0]
  })
}