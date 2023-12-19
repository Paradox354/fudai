Page({
  data: {
    rooturl: 'https://rrewuq.com',
    score: 3.4,  // 初始分数
    evaluate: '', // 初始评价
    zhuti:''
  },
  onLoad: function() {
    const app = getApp();
    var that=this
    this.setData({
      zhuti: app.globalData.zhuti
    })
    const token = wx.getStorageSync('token') || '';
    this.updateScore()
    console.log(this.data.score)
  },
  updateScore() {
    var that = this;
    const name= wx.getStorageSync('name')
    console.log(name)
    wx.request({
      url: that.data.rooturl + '/statistics/score/get',
      method: 'POST',
      data: {
        'id': name.id
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success(res)
      {
        that.data.score=res.data.data.toFixed(1)
        console.log(that.data.score)
        that.setData({
          score: res.data.data.toFixed(1)
        })
        console.log(res.data)
        that.updateEvaluate();
      }
    })
  },
  updateEvaluate() {
    let score = this.data.score;
    console.log(this.data.score)
    let evaluation = '';
    if (score >= 4.5) {
      evaluation = '信誉情况:优秀';
    } else if (score >= 3.75) {
      evaluation = '信誉情况:良好';
    } else if (score >= 3) {
      evaluation = '信誉情况:中等';
    } else if (score >= 2.5) {
      evaluation = '信誉情况:较差';
    } else {
      evaluation = '信誉情况:差';
    }
    this.setData({
      evaluate: evaluation
    });
  }
})
