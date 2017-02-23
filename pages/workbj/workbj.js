// pages/workbj/workbj.js
var app = getApp();
var util = require('../../utils/util.js')
var path=app.getpath+"/resume/selectJobExperienceListBy";
var deletePath = app.getpath+"/resume/deleteJobExperience";
var requestWorkExpList = function(that){
  console.log(that.data.rid);
  wx.request({
    url: path,
    data: {
      resumeId:that.data.rid,
    },
    // header:{'content-type': 'application/json;charset=UTF-8'},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
        // success
        console.log("res.data.result1 "+ res.data.result);

        // 起始和结束时间格式转换
        var arr = res.data.result
        for(var i = 0 ; i<arr.length; i++){
          var mydict = arr[i];
          mydict["beginDateTemp"] = util.splitDate(mydict["beginDate"])
          mydict["endDateTemp"] = util.splitDate(mydict["endDate"])
        }

        that.setData({
          workListData:res.data.result,
        });
        console.log("res.data.result2 "+ res.data.result);
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}

// 删除工作经历
var deleteWorkExpList = function(myindex , that){
  var delid = that.data.workListData[myindex]
  console.log("工作经历id"+delid.id)

  wx.request({
    url: deletePath,
    data: {
      id : delid.id,
    },
    // header:{'content-type': 'application/json;charset=UTF-8'},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      // success
        // that.setData({workListData:res.data.result});
        that.onPullDownRefresh();
        
        console.log("res "+ res);
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
    rid : 0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
    var that=this
    wx.getSystemInfo({
        success: function(res) {
            that.setData({width:res.windowWidth,height:res.windowHeight})
           
        }
    });

    
    that.setData({
      rid:8,
      // rid : options.id,
    });

    // requestWorkExpList(that);
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    var that=this
    requestWorkExpList(that);
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onPullDownRefresh: function () {
		this.setData({
			workListData: [],
		});
		var that = this
		requestWorkExpList(that)

    console.log("下拉刷新了了了了")
		wx.stopPullDownRefresh()
	},

  mylongtap: function(e){ 
    
    var that=this
    var pos=e.currentTarget.dataset.idindex;
    var chData=e.currentTarget.dataset.list;
    var selectedDict = chData[pos]
    console.log(e);
    wx.showActionSheet({
              itemList: ['编辑', '删除'],
              success: function(res) {
                  if (!res.cancel) {
                    if(res.tapIndex == 0){
          

                      wx.navigateTo({
                        url: '/pages/workbj/addWorkbj?isEdit=1&singleDict='+JSON.stringify(selectedDict),
                        success: function(res){
                          // success
                        }
                      })
                    }else{
                      
                      console.log(e.currentTarget.dataset.idindex);
                      deleteWorkExpList(e.currentTarget.dataset.idindex , that);
                    }
                      
                  }
              }
          });
  
 
  } 
})