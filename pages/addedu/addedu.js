// pages/addedu/addedu.js
Page({
  data:{
    loading:false,
    cData:[],
    edulist:[],
    ctype:2,
       starttime:'',
       endtime:'',
       schoolname:'',
       cername:'',
       degree:'',
       rightimg:'/images/jian_r.png'
  },
  onLoad:function(options){
    var that=this
    // 页面初始化 options为页面跳转所带来的参数
    var type=options.type;//标示编辑还是添加 1编辑2 标示编辑还是添加
  
    if(type == 1){
      var pos=options.pos;
     
     var obj=JSON.parse(options.list);
 that.setData({
   ctype:1,
  cData:obj[0]
 });

    };
    

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
    if(that.data.endtime==null || that.data.endtime==""){
       wx.showModal({
                title:'提示',
                content:'请选择毕业时间',
                showCancel:false,
                success: function(res){
             
                }
                

            });
           return;
    }
    if(that.data.starttime==null || that.data.starttime==""){
       wx.showModal({
                title:'提示',
                content:'请选择入学时间',
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
    
  }
})