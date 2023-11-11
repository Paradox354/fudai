// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {

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
