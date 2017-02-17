var app = getApp();
var path = app.getpath + '/resume/selectUserJobResumeByPage';
Page({
  data:{
    resmeDetail: null,
    imgUrl: null,
    dictionary: null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var uid = options.uid
    uid = uid > 0 ? uid : 4
    if(uid > 0) {
      ResumeDetial(that, uid)
    } else {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },
  setPhotoInfo: function(){
    var that = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // success
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imgUrl:tempFilePaths
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
	onPullDownRefresh: function () {
		wx.stopPullDownRefresh()
	}
})
var ResumeDetial = function (that, uid) {
  wx.request({
    url: path,
    data: {uid: 4},
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