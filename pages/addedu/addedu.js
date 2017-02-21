// pages/addedu/addedu.js
var app = getApp();

var Util = require( '../../utils/util.js');
var upEdupath=app.getpath+"/resume/updateEduExperience";
var addEdupath=app.getpath+"/resume/addEduExperience";
Page({
  data:{
    loading:false,
    cData:[],
    itemid:[],
    items:[],
    ctype:2,
    zid:'',
    Rid:'',
  actionSheetHidden: true,
    startDate: '1977-01-01',//开始时间
       schoolname:'',
       cername:'',
       degree:'',
       degreeText:'',
       rightimg:'/images/jian_r.png',
  entrancetime: Util.formatDate_(new Date()),//入学时间
    graduationtime: Util.formatDate_(new Date()),//毕业时间
      bdate: '',
    jdate: '',
    byears: Util.formatMonth(new Date()),
    jyears: Util.formatMonth(new Date())
  },
  onLoad:function(options){
    var that=this
    // 页面初始化 options为页面跳转所带来的参数
    var type=options.type;//标示编辑还是添加 1编辑2 标示编辑还是添加
   var rid=options.rid;
   console.log("来了rid="+rid);
    if(type == 1){
      var pos=options.pos;
     var obj=JSON.parse(options.list);
      that.setData({
        ctype:1,
        cData:obj[0],

        entrancetime: Util.subString(obj[0].enrollmentDate, 10) ,
          graduationtime: Util.subString(obj[0].graduationDate, 10) ,
          byears: Util.splitDate(obj[0].enrollmentDate),
          jyears: Util.splitDate(obj[0].graduationDate),
        cername:obj[0].specialfieldName,
        schoolname:obj[0].schoolName,
      degree:obj[0].degree,
      degreeText:obj[0].degreeText,
      zid:obj[0].id
 });

    };
    that.setData({
      Rid:rid
    });
    wx.getStorage({
        key: 'dictionary',
        success: function(res){
  console.log(res.data[6]);
             var  list=[];
             var item=[];
             
           for(var i=0;i<res.data[6].list.length;i++){
             list.push(res.data[6].list[i].dictKey);
           item.push(res.data[6].list[i].dictRemark);
          }
     that.setData({
     items:item,
    itemid:list
     });
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });


  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  input1js:function(e){
     this.setData({
      schoolname: e.detail.value
    })
  },
  input2js:function(e){
     this.setData({
      cername: e.detail.value
    })
  },
  sumbitbutton:function(e){
  
    var that=this
   
     this.setData({
          loading: true
    });
    if(that.data.schoolname==null || that.data.schoolname==""){
       wx.showModal({
                title:'提示',
                content:'请输入学校名称',
                showCancel:false,
                success: function(res){
             
                }
                

            });
           return;
    }
     if(that.data.entrancetime==null || that.data.entrancetime==""){
       wx.showModal({
                title:'提示',
                content:'请选择入学时间',
                showCancel:false,
                success: function(res){
             
                }
                

            });
           return;
    }
    if(that.data.graduationtime==null || that.data.graduationtime==""){
       wx.showModal({
                title:'提示',
                content:'请选择毕业时间',
                showCancel:false,
                success: function(res){
             
                }
                

            });
           return;
    }
   
    if(that.data.cername==null || that.data.cername==""){
       wx.showModal({
                title:'提示',
                content:'请填写专业名称',
                showCancel:false,
                success: function(res){
             
                }
                

            });
           return;
    }
     if(that.data.ctype== 1){
upData(that);
     }else{
AddData(that);
     }
  },
   bindstartsttuChange: function(e) {
    var that = this
    var val = e.detail.value
    that.setData({
       bdate: val,
      byears: Util.splitDate(val)
    })
  },
  bindgradtimeChange: function(e) {
    var that = this
    var val = e.detail.value
    that.setData({
      jdate: val,
        jyears: Util.splitDate(val)
    })
  },
  choose:function(e){
  var that=this
  that.setData({
    actionSheetHidden: !that.data.actionSheetHidden,
  });
  
  },
  bindItemTap:function(e){
     var that=this
    
    var num=  e.currentTarget.dataset.id;
   
  
    
  that.setData({
    actionSheetHidden:!that.data.actionSheetHidden,
    degreeText:e.currentTarget.dataset.name,
    degree:that.data.itemid[num]});
    
  }
})
var upData=function(that){
  console.log(that.data.schoolname);
wx.request({
  url: upEdupath,
  data: {
    id:that.data.zid,
    schoolName:that.data.schoolname,
    enrollmentDate:that.data.entrancetime,
    graduationDate:that.data.graduationtime,
    specialfieldName:that.data.cername,
    degree:that.data.degree

  },
  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  // header: {}, // 设置请求的 header
   header:{'content-type': 'application/json;charset=UTF-8'},
  success: function(res){
    // success
  
    if(res.data.code ==0){
 wx.navigateBack();
    }else{
      
       wx.showModal({
                title:'提示',
                content:res.data.message,
                showCancel:false,
                success: function(res){
             
                }
                

            });
    }
      
  },
  fail: function() {
    // fail
      wx.showModal({
                title:'提示',
                content:'更新数据失败,请重试',
                showCancel:false,
                success: function(res){
             
                }
                

            });
  },
  complete: function() {
    // complete
  }
})
};
var AddData=function(that){
  console.log("rid="+that.data.Rid);
  wx.request({
    url: addEdupath,
    data: {
schoolName:that.data.schoolname,
uid:418,
rid:that.data.Rid,
enrollmentDate:that.data.entrancetime,
graduationDate:that.data.graduationtime,
specialfieldName:that.data.cername,
    degree:that.data.degree
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header:{'content-type': 'application/json;charset=UTF-8'},
    // header: {}, // 设置请求的 header
    success: function(res){
      // success
   
    if(res.data.code ==0){
 wx.navigateBack();
    }else{
      
       wx.showModal({
                title:'提示',
                content:res.data.message,
                showCancel:false,
                success: function(res){
             
                }
                

            });
    }
    },
    fail: function() {
      // fail
        wx.showModal({
                title:'提示',
                content:'添加教育背景失败,请重试',
                showCancel:false,
                success: function(res){
             
                }
                

            });
    },
    complete: function() {
      // complete
    }
  })
}
