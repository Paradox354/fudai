var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rooturl: 'https://rrewuq.com',
    districtOptions: ['生活一区', '生活二区', '生活三区', '生活四区', '生活五区'],
    selectedDistrict: '生活一区',
    buildingOptions: generateBuildingOptions(),
    selectedBuilding: 1,
    building: 1,
    dormitoryOptions: generateDormitoryOptions(),
    selectedDormitory: '101',
    phone: '',
    name: '',
    zhuti: '',
    layer: 101,
    msglist: []
  },
  onLoad(options) {
    const app = getApp();
    this.setData({
      zhuti: app.globalData.zhuti
    })
    var that=this
    wx.request({
      url: this.data.rooturl + '/user/msg',
      method: 'GET',
      header: {
        'token': wx.getStorageSync('token')
      },
      success(res) {
        that.setData({
          msglist:res.data.data.msgList
        })
        console.log(that.data.msglist)
      }
    })
  },
  
  onReady() {

  },

  onShow() {

  },

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
  delusemsg(e)
  {
    var that=this
    var index=e.currentTarget.dataset.index
    wx.request({
      url: this.data.rooturl+'/user/msg',
      method:'DELETE',
      header:{
        'token':wx.getStorageSync('token')
      },
      data:
      {
        'index':index
      },
      success(res)
      {
        that.onLoad()
      }
    })
  },
  upusemsg() {
    if (!this.data.name || !this.data.phone) {
      wx.showToast({
        title: '请完善信息',
        icon: 'error'
      })
      return
    }
    var that=this
    var addressDetail = this.data.selectedDistrict + this.data.selectedBuilding+'号楼' + this.data.selectedDormitory
    var data = {
      'name': this.data.name,
      'phoneEnd': this.data.phone,
      'building': this.data.building,
      'layer': this.data.layer,
      'addressDetail': addressDetail
    }
    wx.request({
      url: this.data.rooturl + '/user/msg',
      method: 'POST',
      header: {
        'token': wx.getStorageSync('token')
      },
      data: data,
      success(res) {
        that.onLoad()
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleDistrictChange: function (e) {
    const index = e.detail.value;
    const selectedDistrict = this.data.districtOptions[index];
    this.setData({
      selectedDistrict: selectedDistrict
    });
  },
  handleBuildingChange: function (e) {
    const index = e.detail.value;
    const selectedBuilding = this.data.buildingOptions[index];
    var a=parseInt(index)+1
    this.setData({
      selectedBuilding: selectedBuilding,
      building: a
    });
    console.log(this.data.building)
  },
  handleDormitoryChange: function (e) {
    const index = e.detail.value;
    const selectedDormitory = this.data.dormitoryOptions[index];
    this.setData({
      selectedDormitory: selectedDormitory,
      layer: parseInt(selectedDormitory)
    });
    console.log(this.data.layer)
  },
  handlePhoneNumberInput: function (event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      phone: value, // 更新 phoneNumber 属性的值
    });
  },
  handleremark: function (event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      name: value, // 更新 phoneNumber 属性的值
    });
  },
})

function generateBuildingOptions() {
  const buildingOptions = [];
  for (let i = 1; i <= 61; i++) {
    buildingOptions.push(i);
  }
  return buildingOptions;
}

function generateDormitoryOptions() {
  const dormitoryOptions = [];
  for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= 16; j++) {
      dormitoryOptions.push(i * 100 + j);
    }
  }
  return dormitoryOptions;
}