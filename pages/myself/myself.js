var app = getApp()
var uid='';

Page({
  data: {
    userInfo: {},
    uname:'',
    img:'',
    rightimg:'/images/jian_r.png',
  },
  onLoad: function () {  
      //onload 进入页面加载
    var that=this
    wx.getSystemInfo({
      success: function(res) {
          that.setData({width:res.windowWidth,height:res.windowHeight})
      }
    })
    app.getUserInfo(function(userInfo){
        //更新数据
          that.setData({
            userInfo:userInfo
          })
    })
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

   onShow: function () {
    var that = this

    // 页面显示
    var user = wx.getStorageSync('User');
    if (user == null || user == "") {
      uid = 0;
      that.setData({
        uname:'',
        img:''
      })
       
    } else {
      uid = user.uid;
      that.setData({
        uname: user.uname,
        img:user.img
      })
        
    }

 
  },
  resumeclass:function(e){
    var path='';
    if(uid ==0){
      path='/pages/login/login';
    
    }else{
       path='/pages/resume/detail'; 
    }
     wx.navigateTo({
       url: path
    })

   },
   resumeeditclass:function(e){
        
         var path='';
    if(uid ==0){
      path='/pages/login/login';
    
    }else{
       path='/pages/resume/edit'; 
    }
     wx.navigateTo({
       url: path
    })
   },
   jobclass:function(e){

      var path='';
    if(uid ==0){
      path='/pages/login/login';
    
    }else{
       path='/pages/myjob/myjob'; 
    }
     wx.navigateTo({
       url: path
    })
   },
   aboutclass:function(e){
       wx.navigateTo({
       url: '/pages/aboutus/aboutus'
    })
     
   }
})