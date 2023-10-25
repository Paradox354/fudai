// pages/takekuaidi/takekuaidi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      expressList: ['请选择快递商家', '圆通快递', '中通快递', '韵达快递', '顺丰快递', '邮政快递', '京东快递', '极兔快递', '其他'],
      selectedExpress: '请选择快递商家',
      codeValue: "",
      smallnum: 0,
      middlenum: 0,
      largenum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  checksmallNum: function (res) {
    var that = this
    var smallnum = res.detail.value
    if (smallnum < 0 || smallnum >= 6 || smallnum == "") {
      wx.showToast({
        title: '输入超出范围',
        icon: 'none'
      })
      that.setData({
        smallnum: 1
      })
    }
  },
  //获取输入数量
  getInputsmallNum: function (res) {
    var that = this
    var smallnum = res.detail.value
    that.setData({
      smallnum: parseInt(smallnum)
    })
  },
  //计算数量
  countsmallNum: function (res) {
    var that = this
    var type = res.currentTarget.dataset.type
    var smallnum = that.data.smallnum
    if (type == 1) {
      if (smallnum > 0) {
        that.setData({
          smallnum: parseInt(smallnum - 1)
        })
      }
    }
    if (type == 2) {
      if (smallnum < 5) {
        that.setData({
          smallnum: parseInt(smallnum + 1)
        })
      }
    }
  },
  checkmiddleNum: function (res) {
    var that = this
    var middlenum = res.detail.value
    if (middlenum < 0 || middlenum >= 6 || middlenum == "") {
      wx.showToast({
        title: '输入超出范围',
        icon: 'none'
      })
      that.setData({
        middlenum: 1
      })
    }
  },
  //获取输入数量
  getInputmiddleNum: function (res) {
    var that = this
    var middlenum = res.detail.value
    that.setData({
      middlenum: parseInt(middlenum)
    })
  },
  //计算数量
  countmiddleNum: function (res) {
    var that = this
    var type = res.currentTarget.dataset.type
    var middlenum = that.data.middlenum
    if (type == 1) {
      if (middlenum > 0) {
        that.setData({
          middlenum: parseInt(middlenum - 1)
        })
      }
    }
    if (type == 2) {
      if (middlenum < 5) {
        that.setData({
          middlenum: parseInt(middlenum + 1)
        })
      }
    }
  },
  checklargeNum: function (res) {
    var that = this
    var largenum = res.detail.value
    if (largenum < 0 || largenum >= 6 || largenum == "") {
      wx.showToast({
        title: '输入超出范围',
        icon: 'none'
      })
      that.setData({
        largenum: 1
      })
    }
  },
  //获取输入数量
  getInputlargeNum: function (res) {
    var that = this
    var largenum = res.detail.value
    that.setData({
      largenum: parseInt(largenum)
    })
  },
  //计算数量
  countlargeNum: function (res) {
    var that = this
    var type = res.currentTarget.dataset.type
    var largenum = that.data.largenum
    if (type == 1) {
      if (largenum > 0) {
        that.setData({
          largenum: parseInt(largenum - 1)
        })
      }
    }
    if (type == 2) {
      if (largenum < 5) {
        that.setData({
          largenum: parseInt(largenum + 1)
        })
      }
    }
  },
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
console.log(res);
        // const filePath = res.tempFilePaths[0]
        wx.uploadFile({
          url: 'https://*******/Index/Api/insert', //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'img',
          formData: {
           
          },
          success (res){
            const data = res.data
           console.log(data);
           //返回图片名称
          if (res.data!='') {
            wx.hideLoading({
              success: (res) => {
               setTimeout(() => {
                 wx.showToast({
                   title: '上传成功！',
                 })
               }, 2000);
              },
            })
          } else {
            wx.hideLoading({
              success: (res) => {
               setTimeout(() => {
                 wx.showToast({
                   title: '上传失败！',
                   icon:'none'
                 })
               }, 2000);
              },
            })
          }
           
            //do something
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  bindPickerChange: function (e) {
    var index = e.detail && e.detail.value;
    if (index !== undefined) {
      var selectedExpress = this.data.expressList[index];
      this.setData({
        selectedExpress: selectedExpress
      });
      console.log('选择的快递商家:', selectedExpress);
    }
  }
})