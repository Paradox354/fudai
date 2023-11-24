// pages/takeinfo/takeinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    rooturl: 'https://rrewuq.com',
    flag: 0,
    images: [],
    zhuti: '',
    t1: '',
    t2: '',
    t3: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  upload() {
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        if (res.tempFilePaths.length <= 1) {
          this.setData({
            images: this.data.images.concat(res.tempFilePaths[0]),
            flag: 1,
          })
        } else {
          wx.showToast({
            title: '最多只能选择一张照片',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
        console.log(this.data.images)
      }
    })
  },
  cancel(e) {
    console.log(this.data.images)
    var index = e.currentTarget.dataset.index
    console.log(this.data.images.length)
    var image = this.data.images
    if (index == 0) {
      if (this.data.images.length) {
        this.setData({
          images: [],
          flag: 0
        })
      } else {
        wx.showModal({
          title: '请先上传图片',
          content: '',
        })
      }
    } else {
      if (this.data.images.length == 2) {
        image.pop()
        this.setData({
          images: image
        })
      } else {
        wx.showModal({
          title: '请先上传图片',
          content: '',
        })
      }
    }
  },
  comfirm(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var imgpath = '';
    if(that.data.images[index])
    {
      wx.uploadFile({
        url: that.data.rooturl + "/file/upload",
        filePath: that.data.images[index],
        name: 'files',
        formData: {},
        header: {
          "Content-Type": "application/form-data",
          'token': wx.getStorageSync('token')
        },
        success: function (res) {
          const data = JSON.parse(res.data);
          imgpath = data.data[0]
          var url = [that.data.rooturl + '/pt/progress/picture/json', that.data.rooturl + '/pt/complete']
          wx.request({
              url: url[index],
              method: 'POST',
              data: {
                'taskId': wx.getStorageSync('helplist').id,
                'picture': imgpath
              },
              header: {
                'token': wx.getStorageSync('token')
              },
              success(res) {
                console.log(res)
                wx.showToast({
                  title: '上传成功',
                })
              }
            })
        },
      })
    }else{
      wx.showToast({
        title: '请上传图片',
      })
    }
  },
  onLoad(options) {
    var that = this
    const app = getApp();
    this.setData({
      zhuti: app.globalData.zhuti
    })
    const id = wx.getStorageSync('helplist').id
    wx.request({
      url:this.data.rooturl + '/pt/detail?taskId=' + id,
      method:'GET',
      header: {
        'token': wx.getStorageSync('token')
      },
      success(res)
      {
        that.setData({
          list:res.data.data
        })
      }
    })
    wx.request({
      url: this.data.rooturl + '/pt/process/detail?taskId=' + id,
      method: 'GET',
      header: {
        'token': wx.getStorageSync('token')
      },
      success(res) {
        var msg = res.data.data.msgList;
        for (var i = 0; i < msg.length; i++) {
          if (msg[i].type == 3) {
            that.setData({
              images: that.data.images.concat(msg[i].message.picture),
              flag: 1,
              t2: msg[i].createTime
            })
          } else if (msg[i].type == 1) {
            that.setData({
              t1: msg[i].createTime
            })
          } else if (msg[i].type == 7) {
            that.setData({
              images: that.data.images.concat(msg[i].message.picture),
              t3: msg[i].createTime
            })
          }
        }
        console.log(res.data.data)
      }
    })
    console.log(this.data.list)
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
  gotochat()
  {
    wx.navigateTo({
      url: '/pages/chat/chat?taskId='+this.data.list.id,
    })
  },
})