// pages/chatroom/chatroom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rooturl:'https://rrewuq.com',
    token:'',
    list:[],
    zhuti:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app=getApp();
    this.setData({
      zhuti:app.globalData.zhuti
    })
    var that=this;
    const token=wx.getStorageSync('token');
    this.setData({
      token:token
    })
    console.log(token)
    wx.request({
      url: that.data.rooturl+'/chat/list?page=1&&pageSize=10',
      method:'GET',
      header:{
        'token':token
      },
      success(res)
      {
        that.setData({
          list:res.data
        })
        console.log(that.data.list)
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //就是页面显示出来后，让相应的tab改变颜色 图标等样式，也就是这一步可能造成的自定义tab会闪屏  
        selected: 2
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
  jump :function(e) {
    var index=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/chat/chat?taskId='+this.data.list[index].taskId,
    })
  }
})
