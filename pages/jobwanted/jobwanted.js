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
          keyword:key,
         jobPlace: that.data.adressid
        },
        header:'application/Json',
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {'Content-Type': 'application/x-www-form-urlencoded'},
        success: function(res){
          // success
          console.log("联网"+res.data.result);

 if(res.data.result !=null && res.data.result.length>9){
            
            that.setData({
            hasMore:true,
            showText:false
            });
             
          }else{
             that.setData({
            showText:true,
            hasMore:false
            });
             
          }

            that.setData({hidden:false,
            newsList:res.data.result});
          
        
        
        
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
 focus:false,
      newsList:[],
        hiddenLoading:false,
  hidden:false,
 hasMore:false,
  showText:false,
     hasRefesh:false,
     adress:'北京市',
     adressid:'101',
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
     
     
   },
onShow: function () {
    // 生命周期函数--监听页面显示
    var that=this
    var res = app.globalData.citydata;
    console.log(res+"///"+app.globalData.citydata.cityname);
   var Ndress=app.globalData.citydata.cityname ==null ?'北京市':app.globalData.citydata.cityname;
   var Nid=app.globalData.citydata.cityid ==null ?'101':app.globalData.citydata.cityid;
  
    that.setData({
  adress:Ndress,
  adressid:Nid,
   inputVal: "",
   inputShowed: false
    });
     key='';
     page=1;
getMoreList(that);
  },
    onReachBottom:function(){
   var that = this;

    page++;
        wx.request({
        url: path,
        data: {
          page:page,
          pagesize:pagesize,
          keyword:key,
         jobPlace: that.data.adressid
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
      var that=this
      key='';
        that.setData({
            inputVal: "",
            inputShowed: false
        });
        getMoreList(that);
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
