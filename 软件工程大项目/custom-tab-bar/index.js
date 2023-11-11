Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/img/home6.png",
        "selectedIconPath": "/img/home.png"
      },
      {
        "pagePath": "/pages/order/allorders/allorders",
        "text": "订单",
        "iconPath": "/img/order16.png",
        "selectedIconPath": "/img/home.png"
      },
      {
        "pagePath": "/pages/chatroom/chatroom",
        "text": "聊天室",
        "iconPath": "/img/Rectangle 16.png",
        "selectedIconPath": "/img/home.png"
      },
      {
        "pagePath": "/pages/my/my",
        "text": "我的",
        "iconPath": "/img/my2.png",
        "selectedIconPath": "/img/my.png"
      }
    ],
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      //切换tab时，改变路由地址
      wx.switchTab({url})
      this.setData({
        //切换tab时，改变当前激活的序号，改变tab颜色图标等样式  
        selected: data.index
      })
    }
  }
})