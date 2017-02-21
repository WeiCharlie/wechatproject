// pages/workbj/addWorkSummary.js
Page({
  data:{
    jobDiscr : null
  },

  sureClick:function(e){

      
      console.log("e "+e)
      var that = this;
      var commitdata = e.detail.value;
      console.log("commitdata "+commitdata)
      


      wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        // success

        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
          jobDiscr: commitdata.jobDiscr,
        })

        console.log("prevPage.data"+prevPage.data)

      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    that.setData({
      jobDiscr : options.jobDiscr
    });
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