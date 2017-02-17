//jobwanted.js
//获取应用实例
var app = getApp();
var path=app.getpath+'/Position/selectEPositionByPage';
var page=1;
var pagesize=10;
var key='';
console.log(path);
var getMoreList=function(that){
 wx.request({
        url: path,
        data: {
          page:page,
          pagesize:pagesize,
          keyword:key
        },
        header:'application/Json',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          // console.log(res.data.result)
        var len=  res.data.result.length;
        if(len<10){
  that.setData({hasMore:false});
        }else{
 that.setData({hasMore:true});
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
        }
      })
};
Page({
  data: {
 focus:false,
      newsList:[],
  hidden:false,
  hasMore:true,
     hasRefesh:false,
  searchData:'',
   inputShowed: false,
        inputVal: "",
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
     getMoreList(that);
     
   },
onShow: function () {
    // 生命周期函数--监听页面显示
    var res = app.globalData.citydata;
    console.log(res);
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

     
    },
    searchinput:function(e){
that.setData({searchData:e.detail.value})
    },
    bind:function(){
       wx.showToast({
  title: '不要乱点，我还没做那',
  icon: 'success',
  duration: 2000
    })
    },
    searchSubmit: function(e) {
        wx.showToast({
  title: '不要乱点，我还没做那',
  icon: 'success',
  duration: 2000
    })
    },
     showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    } ,

    sumit:function(e){
      key=e.detail.value
        
      var that=this
      
    
      page=1;
        getMoreList(that);
    } 
})
