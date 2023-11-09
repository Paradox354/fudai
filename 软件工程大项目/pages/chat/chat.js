Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',  // 输入框的值
    messages: [],  // 聊天记录
    scrollIntoView: '',  // 滚动到指定位置
    socketOpen: false,  // WebSocket连接状态
    socketMsgQueue: [],  // WebSocket消息队列
    url: 'ws://47.113.216.236:9737/websocketServer/652a8c1447c06c3493c1b274/2'  // WebSocket服务器地址

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.connectWebSocket()  // 连接WebSocket服务器
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.closeSocket()  // 关闭WebSocket连接
  },
  /**
   * 连接WebSocket服务器
   */
  connectWebSocket: function () {
    var that = this;
    const token = wx.getStorageSync('token') || '';
    wx.connectSocket({
      url: that.data.url,
      header:{
        'token': token
      },
      success: function (res) {
        console.log('WebSocket连接成功')
      },
      fail: function (res) {
        console.log('WebSocket连接失败:', res)
      }
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开')
      that.setData({
        socketOpen: true
      })
      for (var i = 0; i < that.data.socketMsgQueue.length; i++) {
        that.sendSocketMessage(that.data.socketMsgQueue[i])
      }
      that.setData({
        socketMsgQueue: []
      })
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败:', res)
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭:', res)
      that.setData({
        socketOpen: false
      })
    })
    wx.onSocketMessage(function (res) {
      console.log('接收到服务器发送的数据:', res.data)
      var messages = that.data.messages
      messages.push(res.data)
      that.setData({
        messages: messages,
        scrollIntoView: 'message-' + messages.length
      })
    })
  },
  /**
   * 发送消息
   */
  sendMessage: function () {
    if (!this.data.socketOpen) {
      wx.showToast({
        title: 'WebSocket未连接',
        icon: 'none'
      })
      return
    }
    var message = this.data.inputValue
    if (message == '') {
      wx.showToast({
        title: '消息不能为空',
        icon: 'none'
      })
      return
    }
    this.sendSocketMessage(message)
    this.setData({
      inputValue: ''
    })
  },
  /**
   * 发送WebSocket消息
   */
  sendSocketMessage: function (message) {
    if (this.data.socketOpen) {
      wx.sendSocketMessage({
        data: message
      })
    } else {
      this.data.socketMsgQueue.push(message)
    }
  },
  /**
   * 监听输入框变化
   */
  onInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  }
})
