var app=getApp();
var path=app.getpath+'/Position/selectEPositionDetail';
var applypostionpath=app.getpath+'/Position/applicationPositionV1_1_4';
var  getPostionDatils=function(that,id){
   wx.request({
     url: path,
     data: {
       pid:id
     },
     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     // header: {}, // 设置请求的 header
     success: function(res){
       // success
      
      that.setData({
         dataDatils:res.data.result
       });
     },
     fail: function() {
       // fail
     toash('服务器异常');
     },
     complete: function() {
       // complete
     }
   })
};
//服务端需要增加接口 7、17日通知伟豪增加
var applyPostion=function(epid,that){
  wx.request({
    url: applypostionpath,
    data: {
      uid:5,
      epid:epid
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      // success
       var code=res.data.code;
       var msg=res.data.message;
       if(code == 0){
      toash(msg);
       }else{
            toash(msg);
       }
    },
    fail: function() {
      // fail
      toash('服务器异常');
    },
    complete: function() {
      // complete
    }
  })
};

Page({  
  data: {
     rightimg:'/images/jian_r.png',
    dataDatils:'',
  },
  onLoad: function(options) { 
    var id=options.id;
   var that=this;
    wx.getSystemInfo({
        success: function(res) {
            that.setData({width:res.windowWidth,height:res.windowHeight})
           
        }
      });
    this.setData({    
      title: options.id    
    })   ;
    getPostionDatils(that,id) ;
  } ,
  applypos:function(e){
    var that=this
    applyPostion(that.data.dataDatils.id,that)
  }   
})

var toash=function(str){
  wx.showToast({
  title: str,
  icon: 'fail',
  duration: 2000
})
};