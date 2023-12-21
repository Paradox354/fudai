// pages/order/allorders/allorders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rooturl: 'https://rrewuq.com',
    token: '',
    page: 1,
    from: '',
    builidng: '',
    layer: '',
    size: '',
    elseTo: '',
    pagesize: 4,
    minP: 1,
    maxP: 10,
    list: [],
    zhuti: '',
    respo: '',
    pg: '',
    selectedOption: '起点',
    selectedIndex1: 1,
    selectedOption2: '终点',
    selectedIndex2: 1,
    open: 1,
    path: '',
    pathlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();
    this.setData({
      zhuti: app.globalData.zhuti,
      pg: app.globalData.pg
    })
    console.log(this.data.zhuti)

  },
  cancelList: function (e) {
    var that = this
    wx.showModal({
      editable: true,
      title: '请输入取消原因',
      complete: (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          that.setData({
            respo: res.content
          })
          this.cancel(e)
        }
      }
    })
  },
  cancel(event) {
    var id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: that.data.rooturl + '/pt/acp/cancel',
      method: 'POST',
      data: {
        'taskId': id,
        'reason': that.data.respo
      },
      header: {
        'token': that.data.token
      },
      success(res) {
        console.log(res)
        that.onShow()
      }
    })
  },
  complete(event) {
    var id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: that.data.rooturl + '/pt/complete',
      method: 'POST',
      data: {
        'taskId': id
      },
      header: {
        'token': that.data.token
      },
      success(res) {
        that.onShow()
      }
    })
  },
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    const token = wx.getStorageSync('token') || ''
    this.setData({
      list: [],
      token: token
    })
    wx.request({
      url: that.data.rooturl + '/pt/list/acp',
      method: 'get',
      data: {},
      header: {
        'token': that.data.token
      },
      success(res) {
        var arr = new Array();
        arr = res.data.data;
        arr = arr.reverse();
        console.log(arr)
        that.setData({
          list: arr
        })
        console.log(res)
        console.log(that.data.list)
      }
    })
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
  jumptoinfo: function (e) {
    var index = e.currentTarget.dataset.index
    wx.setStorageSync('helplist', this.data.list[index])
    wx.navigateTo({
      url: '../../takeinfo/takeinfo',

    })
  },
  onPickerChange: function (e) {
    const index = e.detail.value; // 获取选中的索引
    let selectedOption = '';

    if (index == 0) {
      selectedOption = '快递中心';
    } else {
      selectedOption = index + '号楼';
    }

    this.setData({
      selectedOption: selectedOption
    });

    // 将选中的索引存储到变量中
    let selectedIndex = (index === 0) ? 69 : index;
    if (index == 0) {
      selectedIndex = 69
    }
    this.setData({
      selectedIndex1: selectedIndex
    });
    console.log(this.data.selectedIndex1)
    // 可以在此处将 selectedIndex 发送给后台或进行其他操作
  },
  onPickerChange2: function (e) {
    const index = e.detail.value; // 获取选中的索引
    let selectedOption = '';

    if (index == 0) {
      selectedOption = '快递中心';
    } else {
      selectedOption = index + '号楼';
    }

    this.setData({
      selectedOption2: selectedOption
    });

    // 将选中的索引存储到变量中
    let selectedIndex = (index === 0) ? 69 : index;
    if (index == 0) {
      selectedIndex = 69
    }
    this.setData({
      selectedIndex2: selectedIndex
    });
    console.log(this.data.selectedIndex2)
    // 可以在此处将 selectedIndex 发送给后台或进行其他操作
  },
  upload: function () {
    var that = this
    if(that.data.selectedOption=='起点'){
      wx.showToast({
        title: '请选择起点',
        icon: 'error'
      })
      return;
    }
    if(that.data.selectedOption2=='终点'){
      wx.showToast({
        title: '请选择终点',
        icon: 'error'
      })
      return;
    }
    if(that.data.selectedOption2==that.data.selectedOption){
      wx.showToast({
        title: '起点和终点相同',
        icon: 'error'
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: that.data.rooturl + '/getMediumPath',
      method: 'get',
      data: {
        'source': that.data.selectedIndex1,
        'destination': that.data.selectedIndex2
      },
      header: {
        'token': that.data.token
      },
      success(res) {
        console.log(res)
        that.setData({
          pathlist: res.data.data
        })
        wx.hideLoading()
        that.setData({
          open: -(that.data.open)
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  close: function () {
    var that = this
    this.setData({
      open: -(that.data.open)
    })
  },
})