// pages/jobIntention_detail/jobIntention_detail.js

var Api = require('../../utils/Api.js');
var event = require('../../utils/event.js');
var app = getApp();
var industryDatas = require('../../utils/industry_bole.js');
var positionDatas = require('../../utils/position_bole.js');
var arr = [];


Page({
  data:{
    array:[],
    link:"pages/switchcity/switchcity",
    workProperty:[],
    salaryProperty:[],
    workState:[],
    index:0,
    industry_level1:[],
    industry_level2:[],
    indsutry_level3:[],
    position_level1:[],
    position_level2:[],
    industryValues: [0, 0, 0],
    positionValues:[0,0],
    industryValue:[0,0,0],
    positionValue:[0,0],
    
    checked : false,
    industryChecked:false,
    positionChecked: false,

    jobModel:{
      
    rid:1,

      uid:10,
      salary:'',
      salaryText:'选择',
      positionText:'选择',
      position:'',
      industryText:'选择',
      industry:'',
      regionText:'选择',
      region:'',
      isShow:false,
      jobStatusText:'选择',
      jobStatus:'',
      jobPropertyText:'选择',
      jobProperty:''



    }
 



  },


  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

      var that=this
      wx.getSystemInfo({
        success: function(res) {
            that.setData({width:res.windowWidth,height:res.windowHeight})
          
        }
      })

      

         Api.getDictionary(11, (res)=>{

          var arr1 = [];

        for(var b of res){

          arr1.push(b.dictRemark)
        }
        
        that.setData({

          workProperty : arr1

        })

        that.data.array.push(res);



    })

     Api.getDictionary(5, (res)=>{

        
           var arr2 = [];

        for(var b of res){

          arr2.push(b.dictRemark)
        }
        that.setData({

          salaryProperty : arr2

        })

        that.data.array.push(res);



    })
     Api.getDictionary(8, (res)=>{

        
           var arr2 = [];

        for(var b of res){

          arr2.push(b.dictValue)
        }
        that.setData({

          workState : arr2

        })

        that.data.array.push(res);



    })

    console.log(that.data);


    
    industryDatas.init(that);

    var industryData = that.data.industryData;

    
    const industry_level1 = [];
    const industry_level2 = [];
    const industry_level3 = [];

    for(let i=0;i<industryData.length;i++){
      industry_level1.push(industryData[i].name);
    }
    console.log('level1');
    for (let i = 0 ; i < industryData[0].sub.length; i++) {
      industry_level2.push(industryData[0].sub[i].name)
    }
    console.log('level2');
    for (let i = 0 ; i < industryData[0].sub[0].sub.length; i++) {
      industry_level3.push(industryData[0].sub[0].sub[i].name)
    }

    that.setData({
      'industry_level1': industry_level1,
      'industry_level2':industry_level2,
      'industry_level3':industry_level3,

    })
    console.log('初始化完成');


// Position
    positionDatas.init(that);

    var positionData = that.data.positionData;

     const position_level1 = [];
    const position_level2 = [];
    

    for(let i=0;i<positionData.length;i++){
      position_level1.push(positionData[i].name);
    }
    console.log('level1');
    for (let i = 0 ; i < positionData[0].sub.length; i++) {
      position_level2.push(positionData[0].sub[i].name)
    }


    that.setData({
      'position_level1': position_level1,
      'position_level2':position_level2,


    })
    console.log('初始化完成');

    





  },
  open: function(e){

        var industryData = this.data.industryData;
        var val = this.data.industryValues;
      var model = this.data.jobModel
        model.industryText = industryData[val[0]].sub[val[1]].sub[val[2]].name

      
         model.industry = industryData[val[0]].sub[val[1]].sub[val[2]].code
             this.setData({
                jobModel : model

          
        })

  },
    cancel: function(e)
  {
    this.setData({

      industryChecked : false,

      
    })
  },


  open1: function(e){

        var positionData = this.data.positionData;
        var val = this.data.positionValues;
      var model = this.data.jobModel
        model.positionText = positionData[val[0]].sub[val[1]].name

      
         model.position = positionData[val[0]].sub[val[1]].code
             this.setData({
                jobModel : model

          
        })

  },
    cancel1: function(e)
  {
    this.setData({

      positionChecked : false,

      
    })
  },


// 选择方法
   bindChange: function(e) {
    var val = e.detail.value
    var t = this.data.industryValues;

    var industryData = this.data.industryData;
    if(val[0] != t[0]){
      console.log('province no ');
      const industry_level2 = [];
      const industry_level3 = [];

      for (let i = 0 ; i < industryData[val[0]].sub.length; i++) {
        industry_level2.push(industryData[val[0]].sub[i].name)
      }
      for (let i = 0 ; i < industryData[val[0]].sub[0].sub.length; i++) {
        industry_level3.push(industryData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
   

        industry_level2:industry_level2,

        industry_level3:industry_level3,
        industryValues: val,
        industryValue:[val[0],0,0]

      })
      
      return;
    }
    if(val[1] != t[1]){
      console.log('city no');
      const industry_level3 = [];

      for (let i = 0 ; i < industryData[val[0]].sub[val[1]].sub.length; i++) {
        industry_level3.push(industryData[val[0]].sub[val[1]].sub[i].name)
      }
      
      this.setData({
       
        industry_level3:industry_level3,
         industryValues: val,
        //  industryValue:[val[0],val[1],0]

      })
      return;
    }
    if(val[2] != t[2]){
      console.log('county no');
      this.setData({
         industryValues: val

      })
      return;
    }
    },




    bindChange1: function(e) {
    var val = e.detail.value
    var t = this.data.positionValues;

    var positionData = this.data.positionData;
    if(val[0] != t[0]){
      console.log('province no ');
      const position_level2 = [];

      for (let i = 0 ; i < positionData[val[0]].sub.length; i++) {
        position_level2.push(positionData[val[0]].sub[i].name)
      }

      this.setData({
   

        position_level2:position_level2,

        positionValues: val,
        positionValue:[val[0],0,0]

      })
      
      return;
    }
    if(val[1] != t[1]){
      console.log('city no');
      


      this.setData({
       
 
         positionValues: val,
          positionValue:[val[0],val[1],0]
        //  industryValue:[val[0],val[1],0]

      })
      return;
    }
    // if(val[2] != t[2]){
    //   console.log('county no');
    //   this.setData({
    //      industryValues: val

    //   })
    //   return;
    // }
    },

   chooseType: function(e){

    switch(e.target.id){

      case "3":
      {
          wx.navigateTo({
            url: '../../pages/switchcity/switchcity?urltypecode=3',
            success: function(res){
              console.log(res);

            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
      }
      break;
      case "4":
      {
        this.setData({

          industryChecked : false,
          positionChecked: !this.data.positionChecked
        })
      }
      break;
      case "5":
      {
        this.setData({

          industryChecked : !this.data.industryChecked,
          positionChecked: false
        })
      }
      break;

    }

  },

  checkShow : function(e){

      var model = this.data.jobModel
        model.isShow =  !this.data.checked

        
      this.setData({

        checked : !this.data.checked,
        jobModel: model

      })

  },
  saveJobIntention : function(e){

    console.log(this.data);

  },

  bindPickerChange: function(e) {
    
    switch(e.target.id){
      case '0':
      {
        var model = this.data.jobModel
        model.jobProperty =  this.data.array[0][e.detail.value].dictKey

         model.jobPropertyText = this.data.array[0][e.detail.value].dictRemark
             this.setData({
                jobModel : model

          
        })
      }
      break
      case '1':
      {
        var model = this.data.jobModel
        model.salary =  this.data.array[1][e.detail.value].dictKey

         model.salaryText = this.data.array[1][e.detail.value].dictRemark
             this.setData({
                jobModel : model

          
        })
      }
      break;
      
      case '2':
      {
        var model = this.data.jobModel
        model.jobStatus =  this.data.array[2][e.detail.value].dictKey

         model.jobStatusText = this.data.array[2][e.detail.value].dictValue
             this.setData({
                jobModel : model

          
        })
      }
      break

    }

    console.log(this.data)
  
  },
 



  
  onReady:function(){
    // 页面渲染完成

    console.log('1111');

  },
  onShow:function(){
    var that = this
     var model = that.data.jobModel
        model.regionText =  app.globalData.educationdata.cityname == null ? "选择" :  app.globalData.educationdata.cityname
      
         model.region = app.globalData.educationdata.cityid
             that.setData({
                jobModel : model

        })

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    app.globalData.educationdata = null;

  }
})