// pages/workbj/addSalary.js
Page({
  data:{
    salaryList:[]
  },

  chooseClick : function(x){
    console.log(x);
    console.log(x.target.dataset.mydictkey);
    console.log(x.target.dataset.mydictvalue);
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        // success

        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
          salaryKey: x.target.dataset.mydictkey,
          salaryValue: x.target.dataset.mydictvalue
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

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this

    wx.getStorage({
      key: 'dictionary',
      success: function(res){
        // success
        that.setData({
          salaryList : res.data[5].list
        }) 

        console.log(that.data)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
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