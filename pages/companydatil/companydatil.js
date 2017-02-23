// pages/companydatil/companydatil.js
var app = getApp()
var path = app.getpath + '/enterpriseInfo/selectByEnterDetail';
Page({
  data:{
    companydatil: null,
    hiddenLoading: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var eid = options.eid
    Companydatil(that, eid)
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
  }
})
var Companydatil = function(that, eid) {
  wx.request({
    url: path,
    data: {
      eid: eid
    },
    success: function(res){
      console.log(res.data)
      that.setData({
        companydatil: res.data.result,
        hiddenLoading: true
      })
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}