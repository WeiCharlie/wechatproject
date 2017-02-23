// pages/resume/edit.js
var app = getApp();
var utils = require('../../utils/util.js')
var path = app.getpath + '/resume/lectUserJobResumeByPage';
var addJobResume = app.getpath + '/resume/addJobResume';
var uid = 0;
Page({
  data: {
    resmeDetail: null,
    imgUrl: null,
    hiddenLoading: false,
    rid: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var user = wx.getStorageSync('User')
    uid = user.uid
    console.log(uid)
    that.setData({
      uid: uid
    })
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        imgUrl: userInfo.avatarUrl
      })
    })
  },
  onShow: function () {
    // 页面显示
    var that = this
    if (uid > 0) {
      ResumeDetial(that, uid)
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
var ResumeDetial = function (that, uid) {
  wx.request({
    url: path,
    data: { uid: uid },
    success: function (res) {
      // success
      if (res.data.code == 0 && res.data.result != null) {
        that.setData({
          resmeDetail: res.data.result,
          rid: res.data.result.id,
          hiddenLoading: true
        })
      } else {
        AddResume(that)
      }
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}
var AddResume = function (that) {
  wx.request({
    url: addJobResume,
    data: {
      uid: uid,
      resumeType: 1
    },
    success: function (res) {
      // success
      if (res.data.code == 0) {
        that.setData({
          rid: res.data.result,
          hiddenLoading: true
        })
      }
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}