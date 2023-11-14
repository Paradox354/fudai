// pages/idconfig/idconfig.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    professor:''
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
  handlenumber: function(event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      id: value, // 更新 phoneNumber 属性的值
    });
    console.log(this.data.id)
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
      professor: value, // 更新 phoneNumber 属性的值
    });
    console.log(this.data.professor)
  },
})