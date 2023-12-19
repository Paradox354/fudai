Page({
  data: {
    rooturl: 'https://rrewuq.com',
    list: [],
    receId: '',
    stars: [0, 0, 0, 0, 0], // 评价星级数组
    sum: '',
    reviewText: "" ,// 用户输入的评价内容,
    zhuti:''
  },
  onShow(){
    const app=getApp();
    this.setData({
      zhuti:app.globalData.zhuti
    })
  },
  // 处理星星点击事件
  handleStarTap: function(e) {
    let index = e.currentTarget.dataset.index;
    let stars = this.data.stars.map((_, idx) => idx <= index ? 1 : 0);
    this.setData({ stars });
    var sum=0
    for(var i = 0;i<stars.length;i++){
      sum += stars[i]; 
    }
    this.setData({ sum });
  },

  // 处理文本框输入事件
  handleTextareaInput: function(e) {
    this.setData({ reviewText: e.detail.value });
  },

  // 提交评价
  submitReview: function() {
    // 这里可以添加代码以处理评价数据
    var that=this
    const id = wx.getStorageSync('orderid')
    console.log(id)
    wx.request({
      url: this.data.rooturl + '/pt/detail?taskId=' + id,
      method: 'GET',
      header: {
        'token': wx.getStorageSync('token')
      },
      success(res) {
        that.setData({
          receId: res.data.data.receiverId
        })
        console.log(that.data.receId)
        wx.request({
          url: that.data.rooturl + '/pt/comment',
          method: 'POST',
          data: {
            'taskId': id,
            'receiverId': that.data.receId,
            'stars': that.data.sum,
            'comment': that.data.reviewText,
          },
          header: {
            'token': wx.getStorageSync('token')
          },
          success(res) {
            console.log(res.data)
          }
        })
      }
    })
    // 提交到服务器等操作
    wx.navigateTo({
      url: '../order/allorders/allorders',  /*跳转到course页面*/
    })
  }
});
