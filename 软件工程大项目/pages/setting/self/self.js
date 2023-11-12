// pages/setting/self/self.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    districtOptions: ['生活一区', '生活二区', '生活三区', '生活四区', '生活五区'],
      selectedDistrict: '生活一区',
      buildingOptions: generateBuildingOptions(),
      selectedBuilding: '1号楼',
      dormitoryOptions: generateDormitoryOptions(),
      selectedDormitory: '101',
      phone:'',
      remark:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.setData({
      selectedBuilding: selectedBuilding,
      building:index
    });
  },
  handleDormitoryChange: function (e) {
    const index = e.detail.value;
    const selectedDormitory = this.data.dormitoryOptions[index];
    this.setData({
      selectedDormitory: selectedDormitory,
      layer:index
    });
  },
  handlePhoneNumberInput: function(event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      phone: value, // 更新 phoneNumber 属性的值
    });
  },
  handleremark: function(event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      remark: value, // 更新 phoneNumber 属性的值
    });
  },
})
function generateBuildingOptions() {
  const buildingOptions = [];
  for (let i = 1; i <= 61; i++) {
    buildingOptions.push(i + '号楼');
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