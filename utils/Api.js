'use strict'
var HOST = 'https://www.mofajiaoyu.com';
// get request
function fetchGet(action, callback){

    wx.request({
      url: HOST + action,
      data: {},
      header:{'Content-type': 'application/json'},

      success(res) {
          callback(null, res.data)
      },
      fail(e){
          console.error(e)
          callback(e)
      }
    
    })
}

function fetchPost(action, data, callback){
    wx.request({
      url: HOST + action,
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success (res){
          callback(null, res.data)
      },
      fail(e){
          console.error(e)
          callback(e)
      }
    
    })
}

module.exports = {

    //method
    fetchGet: fetchGet,
    fetchPost: fetchPost
}