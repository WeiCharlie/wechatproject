// pages/resume/edit.js
var app = getApp();
var utils = require('../../utils/util.js')
var path = app.getpath + '/resume/selectUserJobResumeByPage';
var uid = 0;
Page({
  data:{
    resmeDetail: null,
    imgUrl: null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    uid = options.uid
    app.getUserInfo(function(userInfo){
        //更新数据
          that.setData({
            imgUrl:userInfo.avatarUrl
          })
    })
  },
  onShow:function(){
    // 页面显示
    var that = this
    uid = uid > 0 ? uid : 7
    if(uid > 0) {
      ResumeDetial(that)
    } else {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },
	onPullDownRefresh: function () {
		wx.stopPullDownRefresh()
	}
})
var ResumeDetial = function (that) {
  wx.request({
    url: path,
    data: {uid: uid},
    success: function(res){
      // success
      if(res.data.code == 0) {
        that.setData({
          resmeDetail: res.data.result[0]
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