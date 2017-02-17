// pages/workbj/workbj.js
var app = getApp();
var path=app.getpath+"/resume/selectJobExperienceListBy";
var rid=0;
var requestWorkExpList = function(that){
  wx.request({
    url: path,
    data: {
      resumeId:rid,
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      // success
        that.setData({workListData:res.data.result});
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}
Page({
  data:{
    workListData:[],
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this
    wx.getSystemInfo({
        success: function(res) {
            that.setData({width:res.windowWidth,height:res.windowHeight})
           
        }
      }),
     rid= options.id;
      requestWorkExpList(that);
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