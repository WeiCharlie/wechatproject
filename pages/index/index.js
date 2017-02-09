//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imageUrls :[
      {
      link:'aa',

url:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
{
      link:'aa',
url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
      link:'aa',
url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      },
    ],
      newsList:[
     {id:1,
      title:'销售精英+五险二金',
      price:'￥8千-1万',
      adress:'北京市丰台区',
      stu:'应届毕业生',
      education:'大专',
     company:'平安普惠企业管理有限公司北京分公司',
     rnumber:'5人',
     img:"../../images/myselfbj.png",time:'2017-02-06 11:04'},
     {id:2,
     title:'销售精英+五险二金',
      price:'￥8千-1万',
      adress:'北京市丰台区',
      stu:'应届毕业生',
      education:'大专',
     company:'北京知云科技公司',
      rnumber:'5人',
     img:"../../images/myselfbj.png",time:'2017-02-06 11:04'},
     {id:3,
      title:'销售精英+五险二金',
      price:'￥8千-1万',
      adress:'北京市丰台区',
      stu:'应届毕业生',
      education:'大专',
     company:'北京未知动漫股份有限公司',
      rnumber:'5人',
   img:"../../images/myselfbj.png",time:'2017-02-06 11:04'},
     {id:4,
       title:'销售精英+五险二金',
      price:'￥8千-1万',
      adress:'北京市丰台区',
      stu:'应届毕业生',
      education:'大专',
     company:'北京未知动漫股份有限公司',
     img:"../../images/myselfbj.png",time:'2017-02-06 11:04'}
 ],
   indicatorDots: true,  
    autoplay: true,  
    interval: 5000,  
    duration: 1000
  },
   onLoad: function () {  
      //onload 进入页面加载
    var that=this
      wx.getSystemInfo({
        success: function(res) {
            that.setData({width:res.windowWidth,height:res.windowHeight})
          
        }
      })
   },
   dataCode:function(data){
      var str="11:09";
      return str;
   }
})
