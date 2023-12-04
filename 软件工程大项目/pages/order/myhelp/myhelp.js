
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
    list:[],
    zhuti:'',
    respo:'',
    pg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad(options) {
      const app=getApp();
      this.setData({
        zhuti:app.globalData.zhuti,
        pg:app.globalData.pg
      })
      console.log(this.data.zhuti)

  },
  cancelList:function(e){
    var that=this
    wx.showModal({
      editable: true,
      title:'请输入取消原因',
      complete: (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          that.setData({
            respo:res.content
          })
          this.cancel(e)
        }
      }
    })
  },
  cancel(event)
    {
      var id=event.currentTarget.dataset.id;
      var that=this;
      wx.request({
        url: that.data.rooturl+'/pt/acp/cancel',
        method:'POST',
        data:
        { 
          'taskId':id,
          'reason':that.data.respo
        },
        header:{
          'token':that.data.token
        },
        success(res){
          console.log(res)
          that.onShow()
      }
      })
    },
    complete(event)
    {
      var id=event.currentTarget.dataset.id;
      var that=this;
      wx.request({
        url: that.data.rooturl+'/pt/complete',
        method:'POST',
        data:
        { 
          'taskId':id
        },
        header:{
          'token':that.data.token
        },
        success(res){
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
    var that=this
    const token = wx.getStorageSync('token') || ''
    this.setData({
      list:[],
      token:token
    })
      wx.request({
        url: that.data.rooturl+'/pt/list/acp',
        method:'get',
        data:
        { 
        },
        header:{
          'token':that.data.token
        },
        success(res){
          var arr=new Array();
          arr=res.data.data;
          arr=arr.reverse();
          console.log(arr)
          that.setData({
            list:arr
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
    var index=e.currentTarget.dataset.index
    wx.setStorageSync('helplist',this.data.list[index])
    wx.navigateTo({
      url: '../../takeinfo/takeinfo',
  
    })
  },
})