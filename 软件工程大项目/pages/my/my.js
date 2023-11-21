// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rooturl: 'https://rrewuq.com',
    avatarUrl: '',
    name: "",
  },
  onLoad() {
    const token = wx.getStorageSync('token') || '';
    if (token) {
      console.log(token);
      this.getinfo()
    } else {
      wx.showModal({
        title: '请登录',
        content: '',
        complete: (res) => {
          if(res.confirm){this.login();}
          else{}
        }
      })
    }
  },
  getinfo()
  {
    let that = this
    wx.getStorage({ //异步获取缓存
      key: "name", //本地缓存中指定的 key
      success: (res) => {
        console.log('获取缓存成功', res)
        this.setData({
          name: res.data.nickName,
          avatarUrl: res.data.avatarUrl
        })
      },
      fail(res) {
        console.log(res)
        wx.showModal({
          title: '感谢您使用！',
          content: '请允许小程序可以使用您的头像和名字！',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.getUserProfile()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
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
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于保存用户的昵称',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
        })
        wx.setStorage({
          key: 'name', //本地缓存中指定的 key(类型：string)
          data: res.userInfo,
          success: (s) => {
            this.setData({
              avatarUrl: res.userInfo.avatarUrl,
              name: res.userInfo.nickName
            })
          },
          fail: (f) => {}
        })
      }
    })
  },
  //登录的回调函数
  login() {
    var that = this;
    wx.login({
      success: res => {
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
            wx.setStorageSync('token', res.data.data.token);
            wx.setStorageSync('userid', res.data.data.userId);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

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
      url: '../idconfig/idconfig',
      /*跳转到course页面*/
    })
  },
})