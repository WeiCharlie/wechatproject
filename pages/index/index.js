//index.js
//获取应用实例
var app = getApp();
var path=app.getpath+'/Position/selectEPositionByPage';
var page=1;
var pagesize=10;
console.log(path);
var getMoreList=function(that){
 wx.request({
        url: path,
        data: {
          page:page,
          pagesize:pagesize,
          isHot:1
        },
        header:'application/Json',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          if(res.data.result !=null && res.data.result.length>9){
            
            that.setData({
            hasMore:true
            });
          }else{
             that.setData({
            showText:true
            });
            
          }
          that.setData({newsList:res.data.result});
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
    imageUrls :[],
      newsList:[],
  hiddenLoading:false,
  hasMore:false,
  showText:false,
     hasRefesh:false,
   indicatorDots: true,  
    autoplay: true,  
    interval: 3000,  
    duration: 1000
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
      wx.request({
        url: app.getpath+'/Ad/selectAdByPage',
        data: {
          position:1
        },
       header:'application/Json',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          that.setData({imageUrls:res.data.result})
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
     getMoreList(that);
     
   },
  
    onPullDownRefresh: function () {
        // do somthing
     that.setData({hiddenLoading:false});
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
          for(var i=0;i<res.data.result.length;i++){
            list.push(res.data.result[i]);
          }
          that.setData({newsList :list});
          if(res.data.result.length <10){
            that.setData({
              hasMore :false,
              hasRefesh:false,
              showText:true
            });
          }
        
        },
        fail: function() {
          // fail
           wx.showToast({
    title: "网络连接异常，请检查网络",
    icon: 'fail',
    duration: 2000
  })
        },
        complete: function() {
          // complete
            that.setData({hiddenLoading:true});
        }
      })

     
    }
})
