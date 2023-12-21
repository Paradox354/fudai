// pages/order/allorders/allorders.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rooturl: 'https://rrewuq.com',
    positiveReviews: '',
    token: '',
    page: 1,
    from: '',
    builidng: '',
    layer: '',
    type: '',
    size: '',
    elseTo: '',
    pagesize: 4,
    minP: 24323,
    maxP: 100000,
    list: [],
    zhuti: '',
    zhuti2: '',
    flag1: 0,
    flag2: 0,
    dis: 1,
    open: 1,
    index: 0,
    selectedBuilding: '1号楼',
    building: 0,
    buildingOptions: generateBuildingOptions(),
    price1: '',
    price2: '',
    choosetype: 'item',
    choosetype1: 'item',
    choosetype2: 'item',
    choose2: 'item',
    choose3: 'item',
    choosesize1: 'item',
    choosesize2: 'item',
    choosesize3: 'item',
    selectedtype: 0, //0表示未选中任何服务类型，1表示选中代取快递
    selectedkuaidi: 0, //0表示未选中任何快递点，1表示选中快递中心，2表示选中邮政
    selectedsize: 0, //0表示未选中任何快递规模，1表示选中小件，2为中件，3为大件
    pg: '',
    tanchuan:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  recieve(e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    if (that.data.token == '') {
      wx.showModal({
        title: '请登录',
        complete: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '再次确认',
        content: '是否接单',
        complete: (res) => {
          if (res.cancel) {
            return;
          }
          if (res.confirm) {
            wx.showLoading({
              title: '接单中',
            })
            wx.request({
              url: that.data.rooturl + '/pt/acp',
              method: 'POST',
              data: {
                'taskId': id
              },
              header: {
                'token': that.data.token
              },
              success(res) {
                if (res.data.status == 500) {
                  wx.showModal({
                    title: '您无法承接自己发布的订单',
                    content: '',
                    complete: (res) => {
                      if (res.cancel) {}
                      if (res.confirm) {}
                    }
                  })
                } else {
                  wx.hideLoading()
                  wx.showModal({
                    title: '接单成功',
                    content: '',
                    complete: (res) => {
                      if (res.confirm) {
                        that.onShow()
                      }
                    }
                  })
                }
              },
            })
          }
        }
      })
    }
  },
  takeUserMsg(e) {
    var userId = e.currentTarget.dataset.publisherid;
    var that = this;
    var index=e.currentTarget.dataset.index
    wx.request({
      url: that.data.rooturl + '/statistics/get',
      method: 'POST',
      data: {
        'id': userId
      },
      header: {
        'token': that.data.token
      },
      success(res) {
        console.log(res)
        var temp=that.data.list
        temp[index]["msglist"]= res.data.data;
        that.setData({
          list: temp
        })
        console.log(that.data.list)
      },
    })
    var temp = that.data.list
    temp[index].flag= -temp[index].flag
    this.setData({
      list:  temp,
      //positiveReviews: (that.data.list.msglist.positiveReviews)/(that.data.list.msglist.totalOrders)*100,
    })
  },
  onLoad() {
    const app = getApp();
    this.setData({
      zhuti: app.globalData.zhuti
    })
    console.log(app.globalData.zhuti)
    console.log(this.data.zhuti)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const app = getApp();
    this.setData({
      zhuti: app.globalData.zhuti,
      zhuti2: app.globalData.zhuti2,
      pg: app.globalData.pg,
      tanchuan:app.globalData.tanchuan,
    })
    console.log(this.data.zhuti2)
    var that = this;
    const token = wx.getStorageSync('token') || ''
    this.setData({
      list: [],
      token: token
    })
    var data = {
      "page": 1,
      "pageSize": 100000,
      'priceOrder': this.data.flag2,
      'timeOrder': this.data.flag1,
      'minp': this.data.minP,
      'maxp': this.data.maxP,
    };
    if (this.data.from) {
      data.from = this.data.from
    }
    if (this.data.size) {
      data.size = this.data.size
    }
    if (this.data.building) {
      data.building = this.data.building
    }
    if (this.data.type) {
      data.type = this.data.type;
    };
    if (this.data.from) {
      data.from = this.data.from
    }
    if (this.data.userAvatar) {
      data.userAvatar = this.data.userAvatar
    }
    if (this.data.publisherId) {
      data.publisherId = this.data.publisherId
    }
    if (this.data.id) {
      data.id = this.data.id
    }
    console.log(data)
    wx.request({
      url: that.data.rooturl + '/pt/list',
      method: 'post',
      data: data,
      header: {
        'token': that.data.token
      },
      success(res) {
        var item=res.data.data
        for(var i = 0;i<item.length;i++){
          item[i]["flag"]=-1;
        }
        that.setData({
          list: that.data.list.concat(item)
        })
        console.log(that.data.list)
      }
    })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //就是页面显示出来后，让相应的tab改变颜色 图标等样式，也就是这一步可能造成的自定义tab会闪屏  
        selected: 1
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
  typechange1: function () {
    if (this.data.choosetype == 'item1' && this.data.choosetype1 == 'item' && this.data.choosetype2 == 'item') {
      this.setData({
        choosetype: 'item',
        selectedtype: 0,
        type: ''
      })
    } else if (this.data.choosetype == 'item' && this.data.choosetype1 == 'item' && this.data.choosetype2 == 'item') {
      this.setData({
        choosetype: 'item1',
        selectedtype: 1,
        type: '快递代拿'
      })
    } else if (this.data.choosetype == 'item' && this.data.choosetype1 == 'item7' && this.data.choosetype2 == 'item') {
      this.setData({
        choosetype: 'item1',
        choosetype1: 'item',
        type: '快递代拿'
      })
    } else if (this.data.choosetype == 'item' && this.data.choosetype1 == 'item' && this.data.choosetype2 == 'item8') {
      this.setData({
        choosetype: 'item1',
        choosetype2: 'item',
        type: '快递代拿'
      })
    }
  },
  typechange2: function () {
    if (this.data.choosetype == 'item1' && this.data.choosetype1 == 'item' && this.data.choosetype2 == 'item') {
      this.setData({
        choosetype: 'item',
        choosetype1: 'item7',
        type: '快递代寄'
      })
    } else if (this.data.choosetype == 'item' && this.data.choosetype1 == 'item' && this.data.choosetype2 == 'item') {
      this.setData({
        choosetype1: 'item7',
        type: '快递代寄'
      })
    } else if (this.data.choosetype == 'item' && this.data.choosetype1 == 'item7' && this.data.choosetype2 == 'item') {
      this.setData({
        choosetype1: 'item',
        type: ''
      })
    } else if (this.data.choosetype == 'item' && this.data.choosetype1 == 'item' && this.data.choosetype2 == 'item8') {
      this.setData({
        choosetype1: 'item7',
        choosetype2: 'item',
        type: '快递代寄'
      })
    }
  },
  typechange3: function () {
    if (this.data.choosetype == 'item1' && this.data.choosetype1 == 'item' && this.data.choosetype2 == 'item') {
      this.setData({
        choosetype: 'item',
        choosetype2: 'item8',
        type: '外卖代拿'
      })
    } else if (this.data.choosetype == 'item' && this.data.choosetype1 == 'item' && this.data.choosetype2 == 'item') {
      this.setData({
        choosetype2: 'item8',
        type: '外卖代拿'
      })
    } else if (this.data.choosetype == 'item' && this.data.choosetype1 == 'item7' && this.data.choosetype2 == 'item') {
      this.setData({
        choosetype1: 'item',
        choosetype2: 'item8',
        type: '外卖代拿'
      })
    } else if (this.data.choosetype == 'item' && this.data.choosetype1 == 'item' && this.data.choosetype2 == 'item8') {
      this.setData({
        choosetype2: 'item',
        type: ''
      })
    }
  },
  choosechange2: function () {
    if (this.data.choose2 == 'item2' && this.data.choose3 == 'item') {
      this.setData({
        choose2: 'item',
        selectedkuaidi: 0,
        from: ''
      })
    } else if (this.data.choose2 == 'item' && this.data.choose3 == 'item3') {
      this.setData({
        choose2: 'item2',
        choose3: 'item',
        selectedkuaidi: 1,
        from: '快递站'
      })
    } else {
      this.setData({
        choose2: 'item2',
        selectedkuaidi: 1,
        from: '快递站'
      })
    }
  },
  choosechange3: function () {
    if (this.data.choose2 == 'item2' && this.data.choose3 == 'item') {
      this.setData({
        choose2: 'item',
        choose3: 'item3',
        selectedkuaidi: 2,
        from: '邮政'
      })
    } else if (this.data.choose2 == 'item' && this.data.choose3 == 'item3') {
      this.setData({
        choose3: 'item',
        selectedkuaidi: 0,
        from: ''
      })
    } else {
      this.setData({
        choose3: 'item3',
        selectedkuaidi: 2,
        from: '邮政'
      })
    }
  },
  sizechange1: function () {
    if (this.data.choosesize1 == 'item' && this.data.choosesize2 == 'item' && this.data.choosesize3 == 'item') {
      this.setData({
        choosesize1: 'item4',
        selectedsize: 1,
        size: '小件'
      })
    } else if (this.data.choosesize1 == 'item4' && this.data.choosesize2 == 'item' && this.data.choosesize3 == 'item') {
      this.setData({
        choosesize1: 'item',
        selectedsize: 0,
        size: ''
      })
    } else if (this.data.choosesize1 == 'item' && this.data.choosesize2 == 'item5' && this.data.choosesize3 == 'item') {
      this.setData({
        choosesize1: 'item4',
        choosesize2: 'item',
        selectedsize: 1,
        size: '小件'
      })
    } else if (this.data.choosesize1 == 'item' && this.data.choosesize2 == 'item' && this.data.choosesize3 == 'item6') {
      this.setData({
        choosesize1: 'item4',
        choosesize3: 'item',
        selectedsize: 1,
        size: '小件'
      })
    }
  },
  sizechange2: function () {
    if (this.data.choosesize1 == 'item' && this.data.choosesize2 == 'item' && this.data.choosesize3 == 'item') {
      this.setData({
        choosesize2: 'item5',
        selectedsize: 2,
        size: '中件'
      })
    } else if (this.data.choosesize1 == 'item4' && this.data.choosesize2 == 'item' && this.data.choosesize3 == 'item') {
      this.setData({
        choosesize1: 'item',
        choosesize2: 'item5',
        selectedsize: 2,
        size: '中件'
      })
    } else if (this.data.choosesize1 == 'item' && this.data.choosesize2 == 'item5' && this.data.choosesize3 == 'item') {
      this.setData({
        choosesize2: 'item',
        selectedsize: 0,
        size: ''
      })
    } else if (this.data.choosesize1 == 'item' && this.data.choosesize2 == 'item' && this.data.choosesize3 == 'item6') {
      this.setData({
        choosesize2: 'item5',
        choosesize3: 'item',
        selectedsize: 2,
        size: '中件'
      })
    }
  },
  sizechange3: function () {
    if (this.data.choosesize1 == 'item' && this.data.choosesize2 == 'item' && this.data.choosesize3 == 'item') {
      this.setData({
        choosesize3: 'item6',
        selectedsize: 3,
        size: '大件'
      })
    } else if (this.data.choosesize1 == 'item4' && this.data.choosesize2 == 'item' && this.data.choosesize3 == 'item') {
      this.setData({
        choosesize1: 'item',
        choosesize3: 'item6',
        selectedsize: 3,
        size: '大件'
      })
    } else if (this.data.choosesize1 == 'item' && this.data.choosesize2 == 'item5' && this.data.choosesize3 == 'item') {
      this.setData({
        choosesize2: 'item',
        choosesize3: 'item6',
        selectedsize: 3,
        size: '大件'
      })
    } else if (this.data.choosesize1 == 'item' && this.data.choosesize2 == 'item' && this.data.choosesize3 == 'item6') {
      this.setData({
        choosesize3: 'item',
        selectedsize: 0,
        size: ''
      })
    }
  },
  refresh: function () {
    this.setData({
      price1: '',
      price2: '',
      choosetype: 'item',
      choosetype1: 'item',
      choosetype2: 'item',
      choose2: 'item',
      choose3: 'item',
      choosesize1: 'item',
      choosesize2: 'item',
      choosesize3: 'item',
      selectedBuilding: '1号楼',
      selectedtype: 0,
      selectedkuaidi: 0,
      selectedsize: 0,
      type: '',
      from: '',
      size: '',
      building: 0
    })
    this.onShow()
  },
  ChangeTimeOrder: function () {
    var a = 0;
    if (this.data.flag1 == 0) {
      a = 1;
    }
    this.setData({
      flag1: a
    })
    this.onShow()
  },
  handlePhoneNumberInput: function (event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      price1: value, // 更新 phoneNumber 属性的值
    });
  },
  handlePriceInput: function (event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      price2: value, // 更新 phoneNumber 属性的值
    });
    console.log(this.data.price2)
  },
  cancel: function () {
    this.setData({
      open: -(this.data.open)
    })
  },
  ChangePriceOrder: function () {
    var a = 0;
    if (this.data.flag2 == 0) {
      a = 1;
    }
    this.setData({
      flag2: a
    })
    this.onShow()
  },
  OpenChoose: function () {
    this.setData({
      open: -(this.data.open)
    })
    console.log(this.data.open)
  },
  handleBuildingChange: function (e) {
    const index = e.detail.value;
    var a = parseInt(index) + 1
    const selectedBuilding = this.data.buildingOptions[index];
    this.setData({
      selectedBuilding: selectedBuilding,
      building: index,
      building: a
    });
  },
})

function generateBuildingOptions() {
  const buildingOptions = [];
  for (let i = 1; i <= 61; i++) {
    buildingOptions.push(i + '号楼');
  }
  return buildingOptions;
}