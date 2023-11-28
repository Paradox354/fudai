// pages/upinfo/state/state.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rooturl: 'https://rrewuq.com',
    token: '',
    list: [],
    inter: '',
    statu: [],
    message: ['1', '2', '3', '4', '5', '6', '7'],
    zhuti: '',
    check: 1,
    confirm: 1,
    image:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();
    this.setData({
      zhuti: app.globalData.zhuti
    })
    const token = wx.getStorageSync('token') || ''
    const list = wx.getStorageSync('orderlist');
    this.setData({
      list: list,
      token: token,
    })
    console.log(list)
    this.startInter()
  },
  getdetails() {
    var that = this;
    wx.request({
      url: this.data.rooturl + '/pt/process/detail?taskId=' + this.data.list.id,
      header: {
        'token': this.data.token
      },
      success(res) {
        that.setData({
          statu: res.data.data.msgList
        })
        console.log(that.data.statu)
      }
    })
  },
  check() {
    var that = this
    wx.showModal({
      title: '请确认您的快递',
      complete: (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          wx.request({
            url: this.data.rooturl + '/pt/check',
            method: 'POST',
            data: {
              'taskId': this.data.list.id
            },
            header: {
              'token': this.data.token
            },
            success(res) {
              console.log(res)
              wx.showToast({
                title: '已确认货物',
                icon:'success'
              })
              that.setData({
                check: 0
              })
            }
          })
        }
      }
    })

  },
  comfirm() {
    var that = this
    wx.showModal({
      title: '请确认送达',
      content: '',
      complete: (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          wx.request({
            url: that.data.rooturl + '/pt/confirm',
            method: 'POST',
            data: {
              'taskId': that.data.list.id
            },
            header: {
              'token': that.data.token
            },
            success(res) {
              console.log(res)
              wx.showToast({
                title: '已确认收货',
                icon:'success'
              })
              that.setData({
                confirm: 0
              })
              console.log(that.data.confirm)
            }
          })
        }
      }
    })
  },
  startInter: function () {
    this.getdetails();
    var that = this;
    that.data.inter = setInterval(
      function () {
        that.getdetails();
        console.log('setInterval 每过500毫秒执行一次任务')
      }, 500 * 60);
  },
  endInter: function () {
    var that = this;
    clearInterval(that.data.inter)
  },

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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
    this.endInter()
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
  previewImage: function (e) {
    var current = e.target.dataset.imgsrc
    var that=this;
    wx.previewImage({
      urls:[current],
      current:current
    })
  },
})