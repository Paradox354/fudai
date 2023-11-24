
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
    zhuti:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
    recieve(e)
    {
      var id=e.currentTarget.dataset.id;
      //var id=this.data.list[0].id;
      var that=this;
      wx.request({
        url: that.data.rooturl+'/pt/acp',
        method:'POST',
        data:
        { 
          'taskId':id
        },
        header:{
          'token':that.data.token
        },
        success(res){
          if(res.data.status==500)
          {
            wx.showModal({
              title: '您无法承接自己发布的订单',
              content: '',
              complete: (res) => {
                if (res.cancel) {
                }
                if (res.confirm) {
                }
              }
            })
          }
          else{
            wx.showModal({
              title: '接单成功',
              content: '',
              complete: (res) => {
                if (res.confirm) {
                  that.onLoad()
                }
              }
            })
          }
          console.log(res)
          that.onLoad()
      },
      })
    },
    onLoad() {
      const app=getApp();
      this.setData({
        zhuti:app.globalData.zhuti
      })
      console.log(app.globalData.zhuti)
      console.log(this.data.zhuti)
    var that=this;
    const token = wx.getStorageSync('token') || ''
    this.setData({
      list:[],
      token:token
    })
    wx.request({
      url: that.data.rooturl+'/pt/list',
          method:'post',
          data:
          { 
            "type": "快递代拿",
            "page": 1,
            "pageSize": 20,
          },
          header:{
            'token':that.data.token
          },
          success(res){
            that.setData({
              list:that.data.list.concat(res.data.data)
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

  }
})