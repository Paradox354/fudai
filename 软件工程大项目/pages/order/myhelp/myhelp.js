
// pages/order/allorders/allorders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rooturl:'http://47.113.216.236:9737',
    token:'',
    page:1,
    from:'',
    builidng:'',
    layer:'',
    size:'',
    elseTo:'',
    pagesize:4,
    minP:1,
    maxP:10,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad(options) {
    var that=this;
    wx.request({
      url: that.data.rooturl+'/wx/login/temp',
      method:'POST',
      data:
      {
        'openid':'61'
      },
      success:(res)=>{
        that.setData({
          token:res.data.data.token
        })
        wx.request({
          url: that.data.rooturl+'/pt/list/pub',
          method:'get',
          data:
          { 
          },
          header:{
            'token':that.data.token
          },
          success(res){
            that.setData({
              list:that.data.list.concat(res.data.data)
            })
            console.log(res)
            console.log(that.data.list)
          }
        })
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

  }
})