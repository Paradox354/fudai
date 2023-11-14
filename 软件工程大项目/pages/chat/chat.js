Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',  // 输入框的值
    messages: [],  // 聊天记录
    scrollIntoView: '',  // 滚动到指定位置
    socketOpen: false,  // WebSocket连接状态
    token:'',
    userId:'',
    socketMsgQueue: [],  // WebSocket消息队列
    url: 'wss://rrewuq.com/websocketServer/',
    taskid:'65507dbe198e3906f0e6d437'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token=wx.getStorageSync('token')||'';
    const userId=wx.getStorageSync('userid')||'';
    this.setData({
      token:token,
      userId:userId
    })
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
    var that = this
    wx.connectSocket({
      url:that.data.url+that.data.taskid+'/'+that.data.userId,
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
      if(that.data.socketOpen)
      {
        wx.sendSocketMessage({
        data:JSON.stringify({
          'type':0,
          'msg':that.data.token
        }),
        success(res){console.log(res)}
      })
      }
      for (var i = 0; i < that.data.socketMsgQueue.length; i++) {
        that.sendSocketMessage(that.data.socketMsgQueue[i])
      }
      that.setData({
        socketMsgQueue: []
      })
      that.startHeartbeat();
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败:', res)
      that.stopHeartbeat();
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭:', res)
      that.setData({
        socketOpen: false
      })
      that.stopHeartbeat();
    })
    wx.onSocketMessage(function (res) {
      console.log('接收到服务器发送的数据:',res.data)
      var messages = that.data.messages
      that.setData({
        messages: JSON.parse(res.data),
        scrollIntoView: 'message-' + messages.length
      })
      console.log(that.data.messages)
    })
  },
  /**
   * 发送消息
   */
  closeWebSocket: function () {
    // 关闭 WebSocket 连接
    if (socketTask) {
      socketTask.close({
        code: 1000,
        reason: 'Page unload',
      });
    }
  },
  stopHeartbeat: function () {
    // 停止心跳机制
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  },
  startHeartbeat: function () {
    const that = this;
    // 每隔一定时间发送心跳数据
    this.heartbeatInterval = setInterval(function () {
      that.sendHeartbeat();
    }, 10000); // 间隔时间为 5 秒，根据需要调整
  },
  sendHeartbeat: function () {
    wx.sendSocketMessage({
      data:JSON.stringify({
        "type": 0,
        "msg": "token"
      }),
      success: function () {
        console.log('Heartbeat sent successfully');
      },
      fail: function (err) {
        console.error('Failed to send heartbeat:', err);
      },
    });
  },
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
  sendSocketMessage: function (message) {
    if (this.data.socketOpen) {
      wx.sendSocketMessage({
        data: JSON.stringify({
          type: 1,
          msg: message
        }),
        success(res){console.log(res)}
      })
    } else {
      this.data.socketMsgQueue.push(message)
    }
  },
  onInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  }
})
