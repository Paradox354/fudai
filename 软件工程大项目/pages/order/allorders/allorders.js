
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
    zhuti2:'',
    flag1:1,
    flag2:1,
    open:1,
    selectedBuilding: '1号楼',
    buildingOptions: generateBuildingOptions(),
    price1:'',
    price2:'',
    choosetype:'item',
    choose2:'item',
    choose3:'item',
    choosesize1:'item',
    choosesize2:'item',
    choosesize3:'item',
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
                  that.onShow()
                }
              }
            })
          }
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
    const app=getApp();
    this.setData({
      zhuti:app.globalData.zhuti,
      zhuti2:app.globalData.zhuti2
    })
    console.log(this.data.zhuti2)
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

  },
  choosechange1:function(){
    if(this.data.choosetype=='item1'){
      this.setData({
        choosetype:'item'
      })
    }
    else{
      this.setData({
        choosetype:'item1'
      })
    }
  },
  choosechange2:function(){
    if(this.data.choose2=='item2'&&this.data.choose3=='item'){
      this.setData({
        choose2:'item'
      })
    }
    else if(this.data.choose2=='item'&&this.data.choose3=='item3'){
      this.setData({
        choose2:'item2',
        choose3:'item',
      })
    }
    else{
      this.setData({
        choose2:'item2'
      })
    }
  },
  choosechange3:function(){
    if(this.data.choose2=='item2'&&this.data.choose3=='item'){
      this.setData({
        choose2:'item',
        choose3:'item3'
      })
    }
    else if(this.data.choose2=='item'&&this.data.choose3=='item3'){
      this.setData({
        choose3:'item',
      })
    }
    else{
      this.setData({
        choose3:'item3'
      })
    }
  },
  sizechange1:function(){
    if(this.data.choosesize1=='item'&&this.data.choosesize2=='item'&&this.data.choosesize3=='item'){
      this.setData({
        choosesize1:'item4'
      })
    }
    else if(this.data.choosesize1=='item4'&&this.data.choosesize2=='item'&&this.data.choosesize3=='item'){
      this.setData({
        choosesize1:'item'
      })
    }
    else if(this.data.choosesize1=='item'&&this.data.choosesize2=='item5'&&this.data.choosesize3=='item'){
      this.setData({
        choosesize1:'item4',
        choosesize2:'item'
      })
    }
    else if(this.data.choosesize1=='item'&&this.data.choosesize2=='item'&&this.data.choosesize3=='item6'){
      this.setData({
        choosesize1:'item4',
        choosesize3:'item'
      })
    }
  },
  sizechange2:function(){
    if(this.data.choosesize1=='item'&&this.data.choosesize2=='item'&&this.data.choosesize3=='item'){
      this.setData({
        choosesize2:'item5'
      })
    }
    else if(this.data.choosesize1=='item4'&&this.data.choosesize2=='item'&&this.data.choosesize3=='item'){
      this.setData({
        choosesize1:'item',
        choosesize2:'item5'
      })
    }
    else if(this.data.choosesize1=='item'&&this.data.choosesize2=='item5'&&this.data.choosesize3=='item'){
      this.setData({
        choosesize2:'item'
      })
    }
    else if(this.data.choosesize1=='item'&&this.data.choosesize2=='item'&&this.data.choosesize3=='item6'){
      this.setData({
        choosesize2:'item5',
        choosesize3:'item'
      })
    }
  },
  sizechange3:function(){
    if(this.data.choosesize1=='item'&&this.data.choosesize2=='item'&&this.data.choosesize3=='item'){
      this.setData({
        choosesize3:'item6'
      })
    }
    else if(this.data.choosesize1=='item4'&&this.data.choosesize2=='item'&&this.data.choosesize3=='item'){
      this.setData({
        choosesize1:'item',
        choosesize3:'item6'
      })
    }
    else if(this.data.choosesize1=='item'&&this.data.choosesize2=='item5'&&this.data.choosesize3=='item'){
      this.setData({
        choosesize2:'item',
        choosesize3:'item6'
      })
    }
    else if(this.data.choosesize1=='item'&&this.data.choosesize2=='item'&&this.data.choosesize3=='item6'){
      this.setData({
        choosesize3:'item'
      })
    }
  },
  refresh:function(){
    this.setData({
      price1:'',
      price2:'',
      choosetype:'item',
      choose2:'item',
      choose3:'item',
      choosesize1:'item',
      choosesize2:'item',
      choosesize3:'item',
      selectedBuilding: '1号楼',
    })
  },
  ChangeTimeOrder:function(){
    this.setData({
      flag1:-(this.data.flag1)
    })
  },
  handlePhoneNumberInput: function(event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      price1: value, // 更新 phoneNumber 属性的值
    });
  },
  handlePriceInput: function(event) {
    let value = event.detail.value; // 获取输入框的值
    this.setData({
      price2: value, // 更新 phoneNumber 属性的值
    });
    console.log(this.data.price2)
  },
  cancel:function(){
    this.setData({
      open: -(this.data.open)
    })
    this.refresh()
  },
  ChangePriceOrder:function(){
    this.setData({
      flag2:-(this.data.flag2)
    })
  },
  OpenChoose:function(){
    this.setData({
      open: -(this.data.open)
    })
    console.log(this.data.open)
  },
  handleBuildingChange: function (e) {
    const index = e.detail.value;
    const selectedBuilding = this.data.buildingOptions[index];
    this.setData({
      selectedBuilding: selectedBuilding,
      building:index
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