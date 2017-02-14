var app=getApp();
var path=app.getpath+'/Position/selectEPositionDetail';
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
  }    
})