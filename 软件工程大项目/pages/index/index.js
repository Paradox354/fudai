// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    rooturl:'https://rrewuq.com',
  },
  onLoad(){
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
}
})
