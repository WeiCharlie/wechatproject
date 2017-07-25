
## 本项目分为四个模块如下图
```代码片段```
```index.js
//获取应用实例
var app = getApp();
var path=app.getpath+'/Position/selectEPositionByPage';
var page=1;
var pagesize=10;
console.log(path);
var getMoreList=function(that){
 wx.request({
        url: path,
        data: {
          page:page,
          pagesize:pagesize,
          isHot:1
        },
        header:'application/Json',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          if(res.data.result !=null && res.data.result.length>9){
            
            that.setData({
            hasMore:true
            });
          }else{
             that.setData({
            showText:true
            });
            
          }
          that.setData({newsList:res.data.result});
        },
        fail: function() {
          // fail
          
           console.log('fail')
        },
        complete: function() {
          // complete 
           that.setData({hiddenLoading:true});
        }
      })
};
Page({
  data: {
    imageUrls :[],
      newsList:[],
  hiddenLoading:false,
  hasMore:false,
  showText:false,
     hasRefesh:false,
   indicatorDots: true,  
    autoplay: true,  
    interval: 3000,  
    duration: 1000
  },
   onLoad: function () {  
      //onload 进入页面加载
    var that=this
      wx.getSystemInfo({
        success: function(res) {
            that.setData({width:res.windowWidth,height:res.windowHeight})
           
        }
      }),
     that.setData({hidden:false});
      wx.request({
        url: app.getpath+'/Ad/selectAdByPage',
        data: {
          position:1
        },
       header:'application/Json',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          that.setData({imageUrls:res.data.result})
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
     getMoreList(that);
     
   },
  
    onPullDownRefresh: function () {
        // do somthing
     that.setData({hiddenLoading:false});
        page=1;
            console.log('我来刷新数据了'+page);
        var that=this;
        getMoreList(that);
    },
    onReachBottom:function(){
   var that = this;

    page++;
        wx.request({
        url: path,
        data: {
          page:page,
          pagesize:pagesize
        },
        header:'application/Json',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          // console.log(res.data.result)
          var  list=[];
           list=that.data.newsList;
          for(var i=0;i<res.data.result.length;i++){
            list.push(res.data.result[i]);
          }
          that.setData({newsList :list});
          if(res.data.result.length <10){
            that.setData({
              hasMore :false,
              hasRefesh:false,
              showText:true
            });
          }
        
        },
        fail: function() {
          // fail
           wx.showToast({
    title: "网络连接异常，请检查网络",
    icon: 'fail',
    duration: 2000
  })
        },
        complete: function() {
          // complete
            that.setData({hiddenLoading:true});
        }
      })

     
    }
})
```
```index.json
{
    "navigationBarTitleText": "首页",
    "enablePullDownRefresh": true
}
```
```index.wxml
<!--index.wxml-->
<swiper indicator-dots="{{indicatorDots}}"  
        autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" style="width:{{width}}px;height:{{height/4}}px;background-size:100%;">  
      <block wx:for="{{imageUrls}}">  
        <swiper-item>  
           <navigator url="" hover-class="navigator-hover">  
            <image src="{{item.fid}}" class="slide-image" style="width:{{width}}px;height:{{height/4}}px;background-size:100%;"/>  
           </navigator>   
        </swiper-item>  
      </block>  
</swiper> 
  <loading hidden="{{hiddenLoading}}">正在加载</loading>
<view style="width:{{width}}px;height:{{height}}px;backgroud:#f3f4f8;" class="itemb">

<!--数据列表模版 begin-->
   <template name="lists">
 
 <scroll-view scroll-y="true" style="height: 100%; background: #ffffff" bindscrolltolower="loadMore" bindscrolltoupper="refesh">
      <view wx:if="{{hasRefesh}}" style="display: flex;flex-direction: row;align-items: center;align-self: center;justify-content: center;">
      <icon type="waiting" size="45"/><text class="_head_price">刷新中...</text></view>

   <navigator url="/pages/jobdatils/jobdatils?id={{id}}"  class="navigator"> 
 
     <view class="_head">
     <text class="_head_title">{{positionText}}</text>
     <view class="_head_price" wx:if="{{salaryText == '面议' || salaryText==''}}">{{salaryText}}</view>
     <view class="_head_price" wx:else>￥{{salaryText}}</view>
     </view>
     <view class="middle">
    <view class="middle_view" >
            <view class="weui_cell_hd"><image src="/images/btn_dingwei.png"></image></view>
            <view class="weui_cell_bd">
                <view class="weui_cell_bd_p"> {{cityText}}{{districtText}} </view>
            </view>
          
        </view>
 <view class="middle_view" >
            <view class="weui_cell_hd"><image src="/images/btn_degree.png"></image></view>
            <view class="weui_cell_bd">
                <view class="weui_cell_bd_p"> {{jobExperienceText}} </view>
            </view>
            </view>
          <view class="middle_view" >
            <view class="weui_cell_hd"><image src="/images/btn_experience.png"></image></view>
            <view class="weui_cell_bd">
                <view class="weui_cell_bd_p"> {{degreeText}} </view>
            </view>   
          </view>
        
        </view>
        <view class="middle_view.h"></view>
     <view class="viewH">
      <image wx:if="{{logo ==null || logo==''}}" src="/images/logo58.png" class="item_img"  mode="scaleToFill"></image>
      <image wx:else src="{{logo}}" class="item_img"  mode="scaleToFill"></image>
     <view class="viewV">
           <view class="bottom">
           <view class="bottom_textview" >{{ename}}</view>
            <image src="/images/btn_v.png"  class="viewH_img" ></image>
           </view>
          <view class="bottom">
           <view class="bottom_textview1" wx:if="{{hireNum == null || hireNum==''}}" >招聘人数:若干</view>
           <view class="bottom_textview1" wx:else >招聘人数:{{hireNum}}人</view>
            <view class="bottom_textview2" >{{lastRefreshDate}}</view>
           </view>
          
          
            
            </view>
            </view>
        
    </navigator>
    
 </scroll-view>

    </template>
   
    <!--数据列表模版 end-->

    <!--列表 循环 start-->
        <view wx:for="{{newsList}}">
        <template is="lists" data="{{...item}}"/>

    </view>
    
    <!--列表 循环 end-->

     <view class="tips1">
      <view wx:if="{{hasMore}}" style="display: flex;flex-direction: row;align-items: center;align-self: center;justify-content: center;">
 <view class="weui-loading"></view>
            <view class="weui-loadmore__tips">正在加载</view>
        </view>

      
      <view wx:if="{{showText}}" style="display: flex;flex-direction: row;align-items: center;align-self: center;justify-content: center;"><text>没有更多职位了</text></view>
    </view>
</view>




```


  
     
￼
