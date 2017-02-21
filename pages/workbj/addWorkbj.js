// pages/workbj/addWorkbj.js
Page({
  data:{
    companySizeKey : "",
    companySizeValue : "", // 公司规模
    salaryKey : "",
    salaryValue : "", // 薪资
    beginDate : "", // 任职开始日期
    endDate : "", // 任职结束日期
    jobDiscr : "" // 工作描述
  },

  bindDateBegin: function(e) {
    
    var that = this;
    that.setData({
      beginDate: e.detail.value
    })
    console.log(that.data.beginDate)
  },

  bindDateEnd: function(e) {
    
    var that = this;
    that.setData({
      endDate: e.detail.value
    })
    console.log(that.data.endDate)
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数



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