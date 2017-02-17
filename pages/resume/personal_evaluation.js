// pages/resume/personal_evaluation.js
Page({
  data:{
    id:0,
    evaluation:null

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    that.setData({
      id : options.id,
      evaluation : options.evaluation
    });
    console.log(that.data);
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
  },

  sureClick:function(e){

    var that = this;
    var comitdata = e.detail.value;

// 保存个人评价
    wx.request({
        
        url: getApp().getpath+'/resume/updateJobResume',
        data: comitdata,
        header:{'content-type': 'application/json;charset=UTF-8'},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          console.log(res)

        },
        fail: function() {
          // fail
           console.log('ycfail')
        },
        complete: function() {
          // complete
        }
      });


    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        // success


      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
  })
}
})


