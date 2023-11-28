Page({
  data: {
    images:'',
    list:[],
    rooturl:'https://rrewuq.com',
    token:'',
    name:'',
    zhuti:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const app=getApp();
    this.setData({
      zhuti:app.globalData.zhuti
    })
    var that=this;
    wx.getStorage({
      key:'name',
      success(res)
      {
        that.setData({
          name:res.data.nickName, 
          images:res.data.avatarUrl
      })     
      console.log(that.data.images)
      }
    })
    const token = wx.getStorageSync('token') || '';
    const list = wx.getStorageSync('orderlist') || ''
    this.setData({
      token:token,
      list:list,
    })
    console.log(list)
  },
  gotochat()
  {
    wx.navigateTo({
      url: '/pages/chat/chat?taskId='+this.data.list.id,
    })
  },
  comfirm() {
    var that=this
    wx.showModal({
      title: '请确认送达',
      content: '',
      complete: (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          wx.request({
            url: this.data.rooturl + '/pt/confirm',
            method: 'POST',
            data: {
              'taskId': this.data.list.id
            },
            header: {
              'token': this.data.token
            },
            success(res) {
              console.log(res)
              that.setData({
                confirm: 0
              })
            }
          })
        }
      }
    })
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
  previewImage: function (e) {
    let current = e.currentTarget.dataset.src
    var that=this;
    wx.previewImage({
      urls:[that.data.list.incidentalMsg.picture],
      current:current
    })
  },
})