var Api = require('../../utils/Api.js');



var app=getApp()
var countDown = 60;

var countdown =  function(that){

    if(countDown == 0){

      that.setData({

        second : '重新发送',
        
        isSecondFinish : true,
        disabled:false


      })

      countDown = 60;
      

      return;


    }

    var time = setTimeout(function(){

        that.setData({

            second : countDown + 's',

        });
        countDown--;
       countdown(that);

    },1000)

  }

Page({
    data:{

        loading: false,
        phoneNumber:'',
        securityNumber:'',
        isSecondFinish: true,
        second:'发送验证码',
        disabled: false,
        loginNotice:'登录'
    },

    SendSecurityCode: function(e){

        if(this.data.phoneNumber)
        {   
            Api.fetchPost('/user/sendVerifyCode', {'telephone':this.data.phoneNumber, 'type' : 1}, (err,res) => {

                if(res.code == 0){

                    console.log(res);
                    if(this.data.isSecondFinish)
             {
             countdown(this);
             this.setData({

                 isSecondFinish : false,
                 disabled:true
             })

            }
            else{
            
          
            }

                }
                else{

                      wx.showModal({
                title:'提示',
                content:res.message,
                showCancel:false,
                success: function(res){

                    
                }
                

            })

                }


            })
            
        }
        else{
              wx.showModal({
                title:'提示',
                content:'请输入电话号码',
                showCancel:false,
                success: function(res){

                    
                }
                

            })
        }
  
    },

    bindPhoneInput: function(e){

        this.setData({
            phoneNumber:e.detail.value,

        })


    },

    bindSecurityCodeInput: function(e){
         this.setData({
            securityNumber:e.detail.value,

        })

        console.log(this.data);

        
    },

    Login: function(e){

        if(this.data.phoneNumber && this.data.securityNumber){
            
            this.setData({
                loading: true,
                loginNotice:'正在登录'


            })
        }
        else if(!this.data.phoneNumber)
        {
            wx.showModal({
                title:'提示',
                content:'请输入电话号码',
                showCancel:false,
                success: function(res){

                    
                }
                

            })
        }
        else{

             wx.showModal({
                title:'提示',
                content:'请输入验证码',
                showCancel:false,
                success: function(res){

                    
                }
                

            })
        }

    }



})