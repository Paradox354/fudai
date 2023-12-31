
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
    pg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  cancel(event)
    {
      var id=event.currentTarget.dataset.id;
      var that=this;
      wx.showModal({
        title: '再次确认',
        content:'确定取消订单',
        complete: (res) => {
          if (res.cancel) {
            return
          }
          if (res.confirm) {
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
                wx.showToast({
                  title: '取消成功',
                  icon:'success'
                })
              that.onShow()
            }
            })
          }
        }
      })
    },
    confirm(event)
    {
      var id=event.currentTarget.dataset.id;
      var status=event.currentTarget.dataset.status;
      console.log(status)
      if(status!='已送达'){
        wx.showToast({
          title: '订单未送达',
          icon:'error'
        })
        return
      }
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
          that.onShow()
      }
      })
    },
    onLoad(options) {
      const app=getApp();
      this.setData({
        zhuti:app.globalData.zhuti,
        pg:app.globalData.pg
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
  jump:function(e){
    var index=e.currentTarget.dataset.index
    console.log(index)
    wx.setStorageSync('orderlist',this.data.list[index])
    wx.navigateTo({
        url: '../../upinfo/state/state',  /*跳转到course页面*/
    })
},
jumptopingjia: function(e){
  var id=e.currentTarget.dataset.id
  console.log(id)
  wx.setStorageSync('orderid',id)
  wx.navigateTo({
    url: '../../pingjia/pingjia',  /*跳转到course页面*/
})
}
})