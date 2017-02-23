var Api = require('../../utils/Api.js');
var util = require('../../utils/util.js');


var app = getApp()
var countDown = 60;
var countdown = function (that) {
    if (countDown == 0) {
        that.setData({
            second: '重新发送',
            isSecondFinish: true,
            disabled: false
        })
        countDown = 60;
        return;
    }
    var time = setTimeout(function () {
        that.setData({
            second: countDown + 's',
        });
        countDown--;
        countdown(that);
    }, 1000)
}
Page({
    data: {
        loading: false,
        phoneNumber: '',
        securityNumber: '',
        isSecondFinish: true,
        second: '发送验证码',
        disabled: false,
        loginNotice: '登录'
    },
    SendSecurityCode: function (e) {
        if (this.data.phoneNumber) {
            if (!util.verifyPhoneNumber(this.data.phoneNumber)) {
                wx.showModal({
                    title: '手机号输入有误',
                    showCancel: false
                })
            } else {
                Api.fetchPost('/user/sendVerifyCode', {
                    'telephone': this.data.phoneNumber,
                    'type': 1
                }, (err, res) => {
                    if (res.code == 0) {
                        console.log(res);
                        if (this.data.isSecondFinish) {
                            countdown(this);
                            this.setData({
                                isSecondFinish: false,
                                disabled: true
                            })
                        }
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: res.message,
                            showCancel: false,
                            success: function (res) {
                            }
                        })
                    }
                })
            }
        } else {
            wx.showModal({
                title: '提示',
                content: '请输入电话号码',
                showCancel: false,
                success: function (res) {
                }
            })
        }

    },
    bindPhoneInput: function (e) {
        this.setData({
            phoneNumber: e.detail.value,
        })
    },
    bindSecurityCodeInput: function (e) {
        this.setData({
            securityNumber: e.detail.value,
        })
        console.log(this.data);
    },
    Login: function (e) {
        if (this.data.phoneNumber && this.data.securityNumber) {
            this.setData({
                loading: true,
                loginNotice: '正在登录'
            })
            Api.fetchPost('/user/login', {
                'telephone': this.data.phoneNumber,
                'verifyCode': this.data.securityNumber
            }, (err, res) => {
                if (res.code == 0) {
                    wx.setStorageSync('User', { 'uid': res.result.uid, 'uname': res.result.uname })
                    this.setData({
                        loading: false,
                        loginNotice: '完成'
                    })
                    wx.navigateBack({ delta: 1 })
                } else {
                    this.setData({
                        loading: false,
                        loginNotice: '登录'
                    })
                    wx.showModal({
                        title: '提示',
                        content: res.message,
                        showCancel: false,
                        success: function (res) {
                        }
                    })
                }
            })
        } else if (!this.data.phoneNumber) {
            wx.showModal({
                title: '提示',
                content: '请输入电话号码',
                showCancel: false,
                success: function (res) {
                }
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '请输入验证码',
                showCancel: false,
                success: function (res) {
                }
            })
        }
    }
})