// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    rooturl:'https://rrewuq.com',
    zhuti:'',
    i: 1,
    zhuti:'container1',
    url1:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/e1a1622441554299a4c9b730cd84be29.jpg',
    url2:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/3e1a6176e09b43c189c817ce01baecf6.jpg',
    url3:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/b2492418b6c8474bb9a72a38027eafdc.jpg',
    url4:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/c3c59acbf3dc4996a7570134b6dc6d28.jpg',
    url5:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/cc5c798660ff44eab9239e48a5727f6a.jpg',
    url6:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/dbe11b02ed224a92bad21e7072d502c7.jpg'
  },
  onLoad(){
    const app=getApp();
    if(!app.globalData.zhuti||!app.globalData.zhuti2||!app.globalData.zhuti3||!!app.globalData.zhuti4){
      app.globalData.zhuti='container1',
      app.globalData.zhuti2='choose2',
      app.globalData.zhuti3='addressinfo1',
      app.globalData.zhuti4='addinfo1'
    }
    this.setData({
      zhuti:app.globalData.zhuti
    })
    if(app.globalData.zhuti=='container2'){
      this.setData({
        url1:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/44789731d5954f02820dc2ee29cc9a9b.jpg',
        url2:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/6f2d89bb1171404580ff532e4e14ce9a.jpg',
        url3:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/f7b90e36c27240ca9f027caacd9683ff.png',
        url4:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/443b0f34269e45db8b91da72684a6f70.png',
        url5:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/06bf34e0af1f46ab8e71c793d48ed7ff.jpg',
        url6:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/443b0f34269e45db8b91da72684a6f70.png'
      })
    }
    const token=wx.getStorageSync('token')
    if(token)
    {
      wx.request({
      url: this.data.rooturl+'/token/renew',
      method:'POST',
      header:
      {
        'token':token
      },
      success(res)
      {
        if(res.data.status==500)
        {
          wx.setStorageSync('token', '')
          wx.setStorageSync('name', '')
          wx.showModal({
            title: '请登录',
            content: '',
            complete: (res) => {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/my/my',
                })
              }
            }
          })
        }
      }
    })
    }
    else{
      wx.showModal({
        title: '请登录',
        content: '',
        complete: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
        }
      })
    }
    
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //就是页面显示出来后，让相应的tab改变颜色 图标等样式，也就是这一步可能造成的自定义tab会闪屏  
        selected: 0
      })
    }
  },
  jumptotake:function(){
    wx.navigateTo({
        url: '/pages/takekuaidi/takekuaidi',  /*跳转到course页面*/
      })
},
  change:function(){
    const app=getApp();
    if(this.data.i==1){
      app.globalData.zhuti='container2';
      app.globalData.zhuti2='choose1';
      app.globalData.zhuti3='addressinfo2'
      app.globalData.zhuti4='addinfo2'
      this.setData({
        i:2,
        zhuti:app.globalData.zhuti,
        url1:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/44789731d5954f02820dc2ee29cc9a9b.jpg',
        url2:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/6f2d89bb1171404580ff532e4e14ce9a.jpg',
        url3:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/f7b90e36c27240ca9f027caacd9683ff.png',
        url4:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/443b0f34269e45db8b91da72684a6f70.png',
        url5:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/06bf34e0af1f46ab8e71c793d48ed7ff.jpg',
        url6:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/443b0f34269e45db8b91da72684a6f70.png'
      }
      )
    }
    else {
      app.globalData.zhuti='container1';
      app.globalData.zhuti2='choose2';
      app.globalData.zhuti3='addressinfo1'
      app.globalData.zhuti4='addinfo1'
      this.setData({
        zhuti: app.globalData.zhuti,
        i:1,
        url1:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/e1a1622441554299a4c9b730cd84be29.jpg',
        url2:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/3e1a6176e09b43c189c817ce01baecf6.jpg',
        url3:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/b2492418b6c8474bb9a72a38027eafdc.jpg',
        url4:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/c3c59acbf3dc4996a7570134b6dc6d28.jpg',
        url5:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/cc5c798660ff44eab9239e48a5727f6a.jpg',
        url6:'https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/dbe11b02ed224a92bad21e7072d502c7.jpg'
      }
      )
    }
    
  }
})
