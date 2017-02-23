// pages/workbj/addWorkbj.js
var util = require('../../utils/util.js')
var rid;
var app = getApp();
var editPath=app.getpath+"/resume/updateJobExperience";

Page({
  data: {
    singleDict: {}, // 编辑时用
    isEdit: false, // 是否编辑 默认否
    startDatelimit: '1977-01-01',
    endDatelimit: util.formatDate_(new Date()),
    rid: 0, // 简历id
    id : 0, // 该工作经历id  （主键）


/* 添加经历所需参数 */
    companySizeKey: "",
    companySizeValue: "", // 公司规模
    salaryKey: "",
    salaryValue: "", // 薪资
    jobDiscr: "", // 工作描述
    company: "", // 公司名称
    positionName: "", // 职位名称
    position: "", // 职位id
    industry: "", // 行业id
    beginDate : "", // 任职开始日期 2017-01-01
    endDate : "", // 任职结束日期 2017-01-01

    beginDateTemp: "", // 用于显示：任职开始日期 2017年2月
    endDateTemp: "", // 用于显示：任职结束日期 2017年2月
  },

  bindDateBegin: function (e) {

    var that = this;
    that.setData({
      beginDateTemp: util.splitDate(e.detail.value),
      beginDate : e.detail.value+"-01"  // 2017-02 提交需要2017-02-02的格式
    })
    console.log(that.data.beginDateTemp)
  },

  bindDateEnd: function (e) {

    var that = this;
    that.setData({
      endDateTemp: util.splitDate(e.detail.value),
      endDate : e.detail.value+"-01"
    })
    console.log(that.data.endDateTemp)
  },

  // 添加工作经历
  sureClick: function (e) {

    // e.detail.value.beginDate = util.formatDate_(e.detail.value.beginDate)
    // e.detail.value.endDate = util.formatDate_(e.detail.value.endDate)
    var that = this;
    var commitdata = e.detail.value;
    
    commitdata.position = that.data.position
    commitdata.industry = that.data.industry
    console.log(commitdata)

    // 编辑工作经历
    if(that.data.isEdit){

              commitdata.id = that.data.id

                wx.request({
              url: editPath,
              data: commitdata,
              header:{'content-type': 'application/json;charset=UTF-8'},
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function(res){
                  // success
                  console.log("res.data.result1 "+ res.data.result);
                  wx.navigateBack()
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            })

    }else{
      commitdata.uid = 15
      commitdata.rid = that.data.rid
    }
    
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    var that = this;


    // 如果options为空（非编辑情况）return
    if (!options.singleDict) {
      that.setData({
        rid: options.rid
      })
      return
    }


    /*  编辑工作经历  */


    // 解析数据字典
    var obj = JSON.parse(options.singleDict);


    that.setData({
      singleDict: obj,
      isEdit: options.isEdit,
      rid: obj.rid
    });

    if (that.data.isEdit) {
      console.log("是编辑经历哦 数据绑定")

      that.setData({
        companySizeKey: obj.eScale,
        companySizeValue: obj.eScaleText,
        salaryKey: obj.salary,
        salaryValue: obj.salaryText,
        beginDateTemp: util.splitDate(obj.beginDate),
        endDateTemp: util.splitDate(obj.endDate),
        beginDate : util.subString(obj.beginDate,10),
        endDate : util.subString(obj.endDate,10),
        jobDiscr: obj.jobContent,
        company: obj.company,
        positionName: obj.positionName,
        position: obj.position, // 职位id
        industry: obj.industry, // 行业id
        id : obj.id // 该工作经历id  （主键）
      });

      console.log(that.data)
    }

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
