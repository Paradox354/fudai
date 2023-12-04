// pages/my/my.js
Page({
  data: {
    rooturl: 'https://rrewuq.com',
    avatarUrl: '',
    avatarUrl1:'',
    nickname: "",
    zhuti: '',
    isCertificate: true,
    open: 0,
    imgpath: ''
  },
  onLoad() {
    const app = getApp();
    this.setData({
      zhuti: app.globalData.zhuti
    })
    const token = wx.getStorageSync('token') || '';
    if (token) {
      console.log(token);
      this.gewxMsg()
    } else {
      wx.showModal({
        title: '请登录',
        content: '',
        complete: (res) => {
          if (res.confirm) {
            this.login();
          }
        }
      })
    }
  },
  gewxMsg()
  {
    var that=this;
    wx.request({
      url: that.data.rooturl+'/user/wxMsg',
      method:'GET',
      header:
      {
        'token':wx.getStorageSync('token')
      },
      success(res)
      {
        var name={
          nickName:res.data.data.username,
          avatarUrl:res.data.data.avatar
        }
        that.setData({
          nickname:name.nickName,
          avatarUrl:name.avatarUrl
        })
        console.log(name)
        wx.setStorageSync('name', name)
      }
    })
  },
  upwxMsg(imgpath) {
    var that = this;
    wx.request({
      url: that.data.rooturl + '/user/wxMsg',
      method: 'POST',
      data: {
        'name': that.data.nickname,
        'avatar': imgpath
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success(res)
      {
        console.log(res)
      }
    })
    that.setData({
      open: 0
    })
    wx.hideLoading()
  },
  upimg() {
    var that = this
    wx.showLoading({
      title: '正在上传',
    })
    wx.uploadFile({
      url: that.data.rooturl + "/file/upload",
      filePath: that.data.avatarUrl,
      name: 'files',
      formData: {},
      header: {
        "Content-Type": "application/form-data",
        'token': wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        const data = JSON.parse(res.data);
        var imgpath = data.data[0]
        that.upwxMsg(imgpath)
      },
    })
  },
  getinfo() {
    let that = this
    wx.showModal({
      title: '感谢您使用！',
      content: '请允许小程序可以使用您的头像和名字！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            open: 1
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  logout: function () {
    wx.removeStorage({
      key: 'name',
      success(res) {
        wx.showModal({
          title: '提示',
          content: '真的要退出了吗',
          cancelText: '我骗你的',
          confirmText: '是的没错',
          confirmColor: '#000000',
          cancelColor: '#576b95',
          success(res) {
            if (res.confirm) {
              wx.removeStorage({
                key: 'token',
              })
              wx.removeStorage({
                key: 'userid',
              })
              wx.reLaunch({
                url: '/pages/my/my',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },

  login() {
    var that = this;
    wx.login({
      success: res => {
        wx.showLoading({
          title: '登录中...',
        })
        const code = res.code;
        console.log(code)
        wx.request({
          url: that.data.rooturl + '/wx/login',
          method: 'post',
          data: {
            'code': code
          },
          success: (res) => {
            console.log(res)
            that.setData({
              isCertificate: res.data.data.isCertificate,
            })
            wx.setStorageSync('token', res.data.data.token);
            wx.setStorageSync('userid', res.data.data.userId);
            wx.hideLoading()
            that.getinfo()
          }
        })
      }
    })
  },
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const app = getApp();
    this.setData({
      zhuti: app.globalData.zhuti
    })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
  onShareAppMessage() {},
  changeNickName(e) {
    let name = e.detail.value;
    if (name.length === 0) return;
    this.setData({
      nickname: e.detail.value
    })
  },
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    console.log(avatarUrl);
    this.setData({
      avatarUrl: avatarUrl,
    })
    const app=getApp()
    app.globalData.headurl=avatarUrl
    console.log(app.globalData.headurl)
  },
  jumptoprivacy: function () {
    wx.navigateTo({
      url: '/pages/selfprivacy/selfprivacy',
      /*跳转到course页面*/
    })
  },
  jumptosetting: function () {
    wx.navigateTo({
      url: '/pages/setting/setting',
      /*跳转到course页面*/
    })
  },
  jumptoconfig: function () {
    wx.navigateTo({
      url: '../idconfig/idconfig?isCertificate=' + this.data.isCertificate,
      /*跳转到course页面*/
    })
  },
})