var Api = require('../../utils/Api.js');


var app = getApp()
var path = app.getpath + '/MsgInfo/selectByInfo';
var types = ['default', 'primary', 'warn']
var page = 1
var pagesize = 10
var GetList = function (that) {

    hiddenLoading: false,

        wx.request({
            url: path,
            data: {
                page: page,
                pagesize: pagesize,
                uid: 10,
                msgType: 1
            },
            header: { 'content-type': 'application/json' },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                // success



                console.log(res)
                var newList = that.data.msgArr



                for (var i = 0; i < res.data.result.length; i++) {
                    newList.push(res.data.result[i])
                }
                that.setData({ msgArr: newList });

                if (res.data.result.length < pagesize) {
                    that.setData({
                        hasMore: false,
                        hiddenLoading: true,
                    })
                }
                else {
                    that.setData({
                        hasMore: true,
                        hiddenLoading: true,
                    })
                }
            },
            fail: function () {
                // fail
                that.setData({
                    hasMore: true,
                    hiddenLoading: true,
                })
                page = 1
                console.log('ycfail')
            },
            complete: function () {
                // complete
            }
        });
}



Page({
    data: {
        msgArr: [],
        hasMore: true,
        hiddenLoading: false,
    },

    onLoad: function () {
        var that = this
        GetList(that)

        // console.log({ page:page,
        //     pagesize:pagesize , msgType:1 , uid: 10});


        // Api.fetchPost("/MsgInfo/selectByInfo", { page:page,
        //     pagesize:pagesize , msgType:1 , uid: 10}, (err, res) => {

        // if(res){

        //     console.log(res)


        // }else{
        //     console.log(err)
        // }

        // })


    },


    onPullDownRefresh: function () {
        page = 1;
        this.setData({
            msgArr: [],
            hiddenLoading: false,
        });
        var that = this
        GetList(that)

        console.log("下拉刷新了了了了")
        wx.stopPullDownRefresh()
    },
    onReachBottom: function () {

        // 上拉加载
        if (!this.data.hasMore) {
            console.log("没有更多了")
            return;
        }
        page++;
        var that = this
        GetList(that)
        console.log("到达底部了了")
    }


})