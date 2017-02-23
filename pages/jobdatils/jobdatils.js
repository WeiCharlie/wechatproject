var app = getApp();
var path = app.getpath + '/Position/selectEPositionDetail';
var applypostionpath = app.getpath + '/Position/applicationPositionV1_1_4';
var isappPath = app.getpath + '/Position/isApplyPosition';
var eid = '';
var uid = '';
//获取职位详情
var getPostionDatils = function (that, id) {
  wx.request({
    url: path,
    data: {
      pid: id,
      uid: uid
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success

      that.setData({
        dataDatils: res.data.result
      });
    },
    fail: function () {
      // fail
      toash('服务器异常');
    },
    complete: function () {
      // complete
        that.setData({hiddenLoading:true});
    }
  })
};
//申请职位
var applyPostion = function ( that) {

  if (uid == 0) {
    wx.navigateTo({
 url: '/pages/login/login'
    })
    
  } else {
    wx.request({
      url: applypostionpath,
      data: {
        uid: uid,
        epid: eid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        var code = res.data.code;
        var msg = res.data.message;
        if (code == 0) {
          toash(msg);
          getPostionDatils(that,eid);
        } else {
          toash(msg);
        }
      },
      fail: function () {
        // fail
        toash('服务器异常');
      },
      complete: function () {
        // complete
      }
    })

  }





};

Page({
  data: {
    rightimg: '/images/jian_r.png',
    dataDatils: '',
      hiddenLoading:false,
    isapply: false
  },
  onLoad: function (options) {
    var id = options.id;
    eid = id;


    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ width: res.windowWidth, height: res.windowHeight })

      }
    });

  },

  onShow: function (e) {
 
    var that = this
    // 页面显示
    var user = wx.getStorageSync('User');
    if (user == null || user == "") {
      uid = 0;
    } else {
      uid = user.uid;
    }

    console.log("onshow==" + user + "//" + uid);
    getPostionDatils(that, eid);
  },
  applyPostion:function(e){
    var that = this
    applyPostion(that);
  }

})

var toash = function (str) {
  wx.showToast({
    title: str,
    icon: 'fail',
    duration: 2000
  })
};