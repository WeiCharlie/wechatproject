// pages/selectIndustry/selectIndustry.js
var industryUtil = require("../../utils/industry_bole.js");
Page({
  data:{
    industrys: [],
    selectIndustry: ""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    lodingIndustry(that)
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
  checkboxChange: function(e) {
    var that = this
    const selectIndustrys = [];
    console.log(e.target.dataset)
    that.setData({
      selectIndustry: selectIndustrys.push(e.target.dataset.name)
    })
  }
})
var lodingIndustry = function(that) {
  industryUtil.init(that);
  var industrys = that.data.industryData;
  that.setData({
    industrys: industrys
  })
}