var app = getApp()
Page({
  data: {
    userInfo: {},
    userListInfo: [ {
      icon: '/images/myorder.png',
      text: '我的订单',
      link:'/pages/aboutus/aboutus',
      isunread: true
  
    }, {
        icon: '/images/myresume.png',
        text: '我的简历',
          link:'/pages/aboutus/aboutus',
        isunread: false
  
      },  {
        icon: '/images/myjobwanted.png',
          link:'/pages/aboutus/aboutus',
        text: '求职意向'
        
      }, {
        icon: '/images/mycall.png',
          link:'//pages/aboutus/aboutus',
        text: '联系客服'
      }, {
        icon: '/images/myhelp.png',
          link:'/pages/aboutus/aboutus',
        text: '关于我们'
      }]
  },
  onLoad: function () {  
      //onload 进入页面加载
    var that=this
      wx.getSystemInfo({
        success: function(res) {
            that.setData({width:res.windowWidth,height:res.windowHeight})
          
        }
      })
     
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
      userInfo:userInfo
      })
    })
  }, 
  getInfoimage:function(){

  },
    setIcon:function(){
      var that = this
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res){
          // success
          var tempFilePaths = res.tempFilePaths
          that.setData({image:tempFilePaths})
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
  listtouch:function(e){
    
  var num=  e.target.id;
   var path;
   
  switch(num){
    case '0':
     path='/pages/aboutUs/aboutus';
    break;
    
    case '1':
     path="../pages/jobwanted/jobwanted";
    break;

     case '2':
        path="../pages/jobwanted/jobwanted";
    break;
  
     case '3':
       path="../pages/jobwanted/jobwanted";
    break;

     case '4':
      path="../pages/aboutUs/aboutus";
    break;
  }
 
  wx.navigateTo({
    url: path
   
  });
  }
})