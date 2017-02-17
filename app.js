//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.dictionaryData()
  },
  getpath:'https://www.mofajiaoyu.com',
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  dictionaryData:function(){
    wx.request({
      url: this.getpath + '/dictionary/getList',
      success: function(res){
        wx.setStorageSync('dictionary', res.data.result)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  globalData:{
    userInfo:null,
    citydata:{cityname:null,cityid:null},//职位筛选城市
    peopledata:{cityname:null,cityid:null},//个人信息户口所在地城市
    educationdata:{cityname:null,cityid:null}//求职地点
  }
})