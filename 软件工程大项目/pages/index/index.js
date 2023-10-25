// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {

  },
  jumptotake:function(){
    wx.navigateTo({
        url: '/pages/takekuaidi/takekuaidi',  /*跳转到course页面*/
      })
}
})
