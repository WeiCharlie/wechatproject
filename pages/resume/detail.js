var app = getApp();
var path = app.getpath + '/resume/lectUserJobResumeByPage';
var utils = require('../../utils/util.js');
Page({
  data: {
    resmeDetail: null,
    imgUrl: null,
    dictionary: null,
    birthday: utils.formatMonth(new Date()),
    hiddenLoading: false
  },
  onLoad: function (options) {
    var that = this
    var user = wx.getStorageSync('User')
    var uid = user.uid
    that.setData({
      uid: uid
    })
    if(uid > 0) {
      ResumeDetial(that, uid)
    } else {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        imgUrl: userInfo.avatarUrl
      })
    })
  },
  onShow:function(){
    // 页面显示
    var that = this

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
        var detail = res.data.result
        that.setData({
          resmeDetail: detail,
          birthday: utils.splitDate(detail.jobUserInfo.birthday),
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