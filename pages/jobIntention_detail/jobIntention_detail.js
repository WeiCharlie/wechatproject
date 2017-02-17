// pages/jobIntention_detail/jobIntention_detail.js
Page({
  data:{
    infolist:['工作性质','工作地点','职位类别','行业类别','期望薪金'],


  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

      var that=this
      wx.getSystemInfo({
        success: function(res) {
            that.setData({width:res.windowWidth,height:res.windowHeight})
          
        }
      })
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