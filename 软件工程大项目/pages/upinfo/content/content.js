// pages/upinfo/content/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeValue: '11111111111111111122222222222222222222222222222222222222222222222211',
    images:['../../../img/home.png'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const list = {
      // 表格标题
      th: ["快递大小", "小件","中件","大件"],
      // 表格内容  这里只能使用 数组套数组格式
      td: [
        [
          "快递数量",
          "10",
          "2",
          "3"
        ],
      ],
    }
    this.setData({
      list
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
    let that=this
    let current = e.currentTarget.dataset.src
    wx.previewImage({
      urls: that.data.images,
      current:current
    })
  },
})