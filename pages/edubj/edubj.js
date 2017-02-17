// pages/edubj/edubj.js
var app = getApp();
var path=app.getpath+"/resume/selectEduExperienceListBy";
var delpath=app.getpath+"/resume/deleteEduExperience";
var rid=0;
var edulist=function(that){
  wx.request({
    url: path,
    data: {
      resumeId:5,
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      // success
        console.log(res)
        that.setData({EduListData:res.data.result});
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
    EduListData:[],
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
      edulist(that);
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
  mytouchstart: function(e){
     console.log(e.timeStamp + '- touch start')
},
//长按事件
mylongtap: function(e){ 
    
  var that=this
  var pos=e.currentTarget.dataset.index;
  var chData=e.currentTarget.dataset.list;
  console.log(e);
  wx.showActionSheet({
            itemList: ['编辑', '删除'],
            success: function(res) {
                if (!res.cancel) {
                  if(res.tapIndex == 0){
        

                    wx.navigateTo({
                      url: '/pages/addedu/addedu?type=1&pos='+pos+'&list='+ JSON.stringify(chData),
                      success: function(res){
                        // success
                      }
                    })
                  }else{
                    
                    console.log(e.currentTarget.dataset.id);
                    // delEdu(e.currentTarget.dataset.id);
                  }
                    
                }
            }
        });
  
 
}
})
var delEdu=function(rid){
  wx.request({
    url: delpath,
    data: {
      id:rid
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
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

