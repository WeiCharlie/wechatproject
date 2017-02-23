// pages/myjob/myjob.js
//index.js
//获取应用实例
var app = getApp();
var path=app.getpath+'/UserInfo/selectUserApplyEPositionByPage';
var page=1;
var pagesize=10;
var uid='';
console.log(path);
var getMoreList=function(that){
 wx.request({
        url: path,
        data: {
          uid:uid,
          page:page,
          pagesize:pagesize
        },
        header:'application/Json',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          // console.log(res.data.result)
          if(res.data.result!=null || res.data.result.length <10){
              that.setData({
                hasMore:false,
                showText:true});
          }else{
              that.setData({hasMore:true,
              showText:false});
          }
          that.setData({newsList:res.data.result});
        that.setData({hidden:false});
        },
        fail: function() {
          // fail
           console.log('fail')
        },
        complete: function() {
          // complete
           that.setData({hiddenLoading:true});
        }
      })
};
Page({
  data: {
   
      newsList:[],
  hidden:false,
  hasMore:false,
   hasRefesh:false,
  hiddenLoading:false,
  showText:false,
  },
   onLoad: function () {  
      //onload 进入页面加载
    var that=this
      wx.getSystemInfo({
        success: function(res) {
            that.setData({width:res.windowWidth,height:res.windowHeight})
           
        }
      }),
     that.setData({hidden:false});
    
     
   },
  onShow: function (e) {
 
    var that = this
     var user = wx.getStorageSync('User');
    if (user == null || user == "") {
      uid = 0;
    } else {
      uid = user.uid;
    }

    page=1;
    // 页面显示
   getMoreList(that);
  },
    onPullDownRefresh: function () {
        // do somthing
    
        page=1;
            console.log('我来刷新数据了'+page);
        var that=this;
        getMoreList(that);
    },
    onReachBottom:function(){
   var that = this;

    page++;
        wx.request({
        url: path,
        data: {
          page:page,
          pagesize:pagesize
        },
        header:'application/Json',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          // console.log(res.data.result)
          var  list=[];
           list=that.data.newsList;
           if(res.data.result==null || res.data.result.length <=0){
           that.setData({
              hasMore :false,
              hasRefesh:false
            });
           }else{
            for(var i=0;i<res.data.result.length;i++){
            list.push(res.data.result[i]);
          }
            that.setData({newsList :list});
           }
          
        
          if(res.data.result==null ||res.data.result.length <10){
            that.setData({
              hasMore :false,
              hasRefesh:false
            });
          }
        
        },
        fail: function() {
          // fail
           console.log('fail')
        },
        complete: function() {
          // complete
        }
      })

     
    }
})
