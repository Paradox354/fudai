var app = getApp();
var socketOpen = false;
var token=wx.getStorageSync('token')
var frameBuffer_Data, session, SocketTask;
var url = 'wss://rrewuq.com/websocketServer/';
//var upload_url ='请填写您的图片上传接口地址'
Page({
  data: {
    user_input_text: '',//用户输入文字
    inputValue: '',
    returnValue: '',
    addImg: false,
    messages:[],
    userId:'',
    //格式示例数据，可为空
    allContentList: [],
    num: 0,
    taskId:'',
    scrollTop:0,
    images:[],
    imgindex:0,
    zhuti:''
  },
  // 页面加载
  onLoad: function (option) {
    const app=getApp();
    this.setData({
      zhuti:app.globalData.zhuti
    })
    const userId=wx.getStorageSync('userid')||'';
    const taskId=option.taskId;
    this.setData({
      userId:userId,
      taskId:taskId
    })
  },
  onShow: function (e) {
    if (!socketOpen) {
      this.webSocket();
    }
  },
  // 页面加载完成
  onReady: function () {
    var that = this;
    SocketTask.onOpen(res => {
      socketOpen = true;
      sendSocketMessage(0,token)
      console.log('监听 WebSocket 连接打开事件。', res)
      that.startHeartbeat()
    })
    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
      socketOpen = false;
      this.webSocket()
    })
    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError)
      socketOpen = false
    })
    SocketTask.onMessage(onMessage => {
      console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息')
      that.setData({
        messages: this.data.messages.concat(JSON.parse(onMessage.data)),
      })
      for(var i=0;i<that.data.messages.length;i++)
      {
        if(that.data.messages[i].type==2)
        {
          that.setData({
            images:that.data.images.concat(that.data.messages[i].msg)
          })
        }
      }
      console.log(that.data.images)
      console.log(that.data.messages)
      that.bottom()
    })
  },
  webSocket: function () {
    SocketTask = wx.connectSocket({
      url: url+this.data.taskId+'/'+this.data.userId,
      success: function (res) {
        console.log('WebSocket连接创建', res)
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
  },
  submitTo: function (e) {
    let that = this;
    if (socketOpen) {
      var data={
        msg:that.data.inputValue,
        senderId:that.data.userId,
        type:1
      }
      sendSocketMessage(1,that.data.inputValue)
      this.setData({
        inputValue: '',
        messages:that.data.messages.concat(data)
      })
      that.bottom()
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value,
    })
  },
  onUnload: function () {
    var that=this
    SocketTask.close(function (close) {
      console.log('关闭 WebSocket 连接。',close)
    })
    that.stopHeartbeat()
  },
  stopHeartbeat: function () {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  },
  startHeartbeat: function () {
    const that = this;
    this.heartbeatInterval = setInterval(function () {
      that.sendHeartbeat();
    }, 10000);
  },
  sendHeartbeat: function () {
    sendSocketMessage(0,'1')
  },
  upimg: function () {
    var that = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img: res.tempFilePaths[0]
          })
          console.log(res.tempFilePaths[0])
          wx.uploadFile({
            url: 'https://rrewuq.com/file/upload',
            filePath: res.tempFilePaths[0],
            name: 'files',
            header: {
              "Content-Type": "application/form-data",
              'token':token
            },
            success: function (res) {
              console.log(res.data)
              var imgpath=JSON.parse(res.data).data[0]
              console.log(imgpath)
              sendSocketMessage(2,imgpath)
                wx.showToast({
                  title: '图片发送成功！',
                  duration: 3000
                });
                var data={
                  msg:imgpath,
                  senderId:wx.getStorageSync('userid'),
                  type:2
                }
                that.setData({
                  images:that.data.images.concat(JSON.parse(res.data).data),
                  messages:that.data.messages.concat(data)
                })
                that.bottom();
            },
            fail(res){console.log(res)}
          })
          that.bottom();
        }
      })
  },   
  previewImage: function (e) {
    let current = e.currentTarget.dataset.index
    console.log(current)
    var that=this
    var a=that.data.messages[current].msg
    var list=[]
    list.push(a)
    wx.previewImage({
      urls:list,
      current:0
    })
  },
  addImg: function () {
    this.setData({
      addImg: !this.data.addImg
    })
  },
  bottom: function () {
    this.setData({
      scrollTop: 1000000000
    })
  },
})
function sendSocketMessage(type,msg) {
  console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
  SocketTask.send({
    data: JSON.stringify(
      {
        'type':type,
        'msg':msg
      }
    )
  }, function (res) {
    console.log('已发送', res)
  })
} 