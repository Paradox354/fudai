
// pages/order/allorders/allorders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rooturl:'https://rrewuq.com',
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
  cancel(event)
    {
      var id=event.currentTarget.dataset.id;
      // var id=this.data.list[0].id;
      var that=this;
      wx.request({
        url: that.data.rooturl+'/pt/delete',
        method:'POST',
        data:
        { 
          'taskId':id
        },
        header:{
          'token':that.data.token
        },
        success(res){
        that.onLoad()
      }
      })
    },
    confirm(event)
    {
      var id=event.currentTarget.dataset.id;
      // var id=this.data.list[0].id;
      var that=this;
      wx.request({
        url: that.data.rooturl+'/pt/confirm',
        method:'POST',
        data:
        { 
          'taskId':id
        },
        header:{
          'token':that.data.token
        },
        success(res){
          that.onLoad()
      }
      })
    },
    onLoad(options) {
      var that=this
      const token = wx.getStorageSync('token') || ''
      this.setData({
        list:[],
        token:token
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
  jump:function(e){
    var index=e.currentTarget.dataset.index
    wx.setStorageSync('list',this.data.list[index])
    wx.navigateTo({
        url: '../../upinfo/state/state',  /*跳转到course页面*/
      })
}
})