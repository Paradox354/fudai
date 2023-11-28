// pages/idconfig/idconfig.js
Page({
  data: {
    code: "",
    name: "",
    major: "",
    zhuti:'',
    rooturl: 'https://rrewuq.com',
    isCertificate:true
  },
  certificate()
  {
    var that=this
    wx.showModal({
      title: '请确认认证信息',
      complete: (res) => {
        if (res.confirm) {
          wx.request({
            url: that.data.rooturl+'/user/certificate',
            method:'POST',
            data:{
              'code':that.data.code,
              'name':that.data.name,
              'major':that.data.major
            },
            header:{
              'token':wx.getStorageSync('token')
            },
            success(res)
            {console.log(res)
            wx.showModal({
              title: '认证成功',
              complete: (res) => {
                if (res.confirm) {
                  wx.navigateBack()
                  {
                    delta:1
                  }
                }
              }
            })}
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    wx.request({
        url: that.data.rooturl+'/user/certificate',
        method:'GET',
        header:{
          'token':wx.getStorageSync('token')
        },
        success(res){
          console.log(res)
          if(res.data.message=='操作成功')
          {
            that.setData({
            'code':res.data.data.code,
            'name':res.data.data.name,
            'major':res.data.data.major,
            'isCertificate':true
          })
          }
          else{
            that.setData({
              'isCertificate':false
            })
          }
          
        }
      })
    const app=getApp();
    this.setData({
      zhuti:app.globalData.zhuti
    })
    this.setData({
      isCertificate:options.isCertificate
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
  handlenumber: function(event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      code: value, // 更新 phoneNumber 属性的值
    });
    console.log(this.data.code)
  },
  handlename: function(event) {
    let value = event.detail.value; 
    this.setData({
      name: value, 
    });
    console.log(this.data.name)
  },
  handleprofessor: function(event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      major: value, // 更新 phoneNumber 属性的值
    });
    console.log(this.data.major)
  },
})