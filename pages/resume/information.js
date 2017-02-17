// pages/resume/information.js
var app = getApp();
var path = app.getpath + '/resume/selectJobUserInfo';
var Util = require( '../../utils/util.js');
Page({
  data:{
    information:{},
    imgUrl: null,
    rightimg:'/images/jian_r.png',
    startDate: '1977-01-01',
    endDate: Util.formatDate_(new Date()),
    date: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var uid = options.uid
    app.getUserInfo(function(userInfo){
        //更新数据
          that.setData({
            imgUrl:userInfo.avatarUrl
          })
    })
    Information(that, uid)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindDateChange: function(e) {
    var that = this
    that.setData({
      date: e.detail.value
    })
  },
  formSubmit:function(e) {
    var formData = e.detail.value
    console.log(formData)
    /*wx.request({
      url: app.getpath + "/resume/updateJobUserInfo",
      data: formData,
      header: {'content-Type': 'application/json;charset=UTF-8;'},
      method: 'POST',
      success: function(res){
        // success
        console.log(res.data)
        wx.navigateBack()
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })*/
  }
})
var Information = function (that, uid) {
  wx.request({
    url: path,
    data: {uid: 7},
    success: function(res){
      if(res.data.code == 0) {
        that.setData({
          information: res.data.result
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