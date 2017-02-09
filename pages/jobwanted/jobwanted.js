var app=getApp()
Page({
    data:{
 newsList:[
     {id:1,title:'平安普惠企业管理有限公司北京分公司',img:"../../images/myselfbj.png",time:'2017-02-06:11:04'},
     {id:2,title:'北京知云科技公司',img:"../../images/myselfbj.png",time:'2017-02-06:11:04'},
     {id:3,title:'北京未知动漫股份有限公司',img:"../../images/myselfbj.png",time:'2017-02-06:11:04'},
     {id:4,title:'ddd',img:"../../images/myselfbj.png",time:'2017-02-06:11:04'}
 ]
    },
    onLoad:function(){
        wx.request({
          url: 'http://192.168.1.1:8080/photo/getphoto?id=1',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);
          },
          fail: function() {
            // fail
            console.log("eror");
          },
          complete: function() {
            // complete
          }
        })
    }

 
 
})