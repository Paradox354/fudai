Page({
  data: {
    images:'',
    list:[],
    rooturl:'https://rrewuq.com',
    token:'',
    name:'',
    zhuti:'',
    headurl:'',
    nhour:'',
    nmin:'',
    respo2:''
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
          headurl:res.data.avatarUrl
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
            // 后端返回的时间字符串
            const backendTimeString = list.createTime;
            // 将时间字符串转换为 Date 对象
            const backendTime = new Date(backendTimeString);
            // 获取当前时间的 Date 对象
            const currentTime = new Date();
            // 计算时间差（单位为毫秒）
            const timeDifference = currentTime - backendTime;
            // 转换为秒
            const secondsDifference = timeDifference / 1000;
            // 转换为分钟
            const minutesDifference = secondsDifference / 60;
            // 转换为小时
            const hoursDifference = minutesDifference / 60;
            // 转换为天
            const daysDifference = hoursDifference / 24;
            that.setData({
              nhour: parseInt(hoursDifference % 24),
              nmin: parseInt(minutesDifference % 60),
            })
  },
  gotochat()
  {
    wx.navigateTo({
      url: '/pages/chat/chat?taskId='+this.data.list.id,
    })
  },
  comfirm() {
    var that=this
    if(that.data.list.type!='已送达'){
      wx.showToast({
        title: '订单未送达',
        icon:'error'
      })
      return;
    }
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
    const app=getApp()
    this.setData({
      headurl:app.globalData.headurl
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
  previewImage: function (e) {
    let current = e.currentTarget.dataset.src
    var that=this;
    wx.previewImage({
      urls:[that.data.list.incidentalMsg.picture],
      current:current
    })
  },
  jumptokefu: function(){
    wx.navigateTo({
      url: '/pages/kefu/kefu',
    })
  },
  tousu: function (e) {
    var that = this
    wx.showModal({
      editable: true,
      title: '请输入投诉原因',
      complete: (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          if (res.content == '') {
            wx.showToast({
              title: '理由不能为空',
              icon: 'error'
            })
          } else {
            that.setData({
              respo2: res.content
            })
            wx.showLoading({
              title: '上传中',
            })
            wx.request({
              url: that.data.rooturl+'/complain/add',
              method: 'POST',
              data: {
                'taskId': that.data.list.id,
                'reason': that.data.respo2
              },
              header: {
                'token': that.data.token
              },
              success(res) {
                console.log(res)
                console.log(that.data.rooturl+'/complain/add')
                console.log(that.data.list.id)
                console.log(that.data.respo2)
                console.log(that.data.token)
                wx.hideLoading()
                wx.showToast({
                  title: '投诉成功',
                  icon: 'success'
                })
              },
              fail(res){
                wx.hideLoading()
                wx.showToast({
                  title: '投诉失败',
                  icon: 'error'
                })
              }
            })
          }
        }
      }
    })
  },
})