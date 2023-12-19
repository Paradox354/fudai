// app.js
App({
  globalData:{
    zhuti: 'container1',
    zhuti2: 'choose2',
    zhuti3: 'addressinfo1',
    zhuti3: 'addinfo1',
    pg:'',
    headurl:'',
    tanchuan:''
  },
  onLaunch() {
    wx.loadFontFace({
      family: "STFangsong", //名称去掉后缀
      source: 'url("https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/STFANGSO.TTF")',
      global: true,
      success(res) {
        console.log("load " + "STFangsong" + " success")
        console.log(res)
      },
      fail(res) {
        console.log(res) //出错则打印信息
      }
    })
    wx.loadFontFace({
      family: "STHupo", //名称去掉后缀
      source: 'url("https://bucketofpicture.oss-cn-hangzhou.aliyuncs.com/STHUPO.TTF")',
      global: true,
      success(res) {
        console.log("load " + "STHupo" + " success")
        console.log(res)
      },
      fail(res) {
        console.log(res) //出错则打印信息
      }
    })
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    defaultable:0
  }
  
})
