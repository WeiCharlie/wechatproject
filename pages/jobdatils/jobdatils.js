var path='https://www.mofajiaoyu.com:8443/Position/selectEPositionDetail';
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
    dataDatils:'',
  },
  onLoad: function(options) { 
    var id=options.id;
   var that=this;
    this.setData({    
      title: options.id    
    })   ;
    getPostionDatils(that,id) ;
  }    
})