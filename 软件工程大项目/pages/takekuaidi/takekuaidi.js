
// pages/takekuaidi/takekuaidi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      controls:[
      ],
      part:{
        selectedExpress: '请选择快递商家',
        selectedExpress2: '请选择快递大小',
        price:0,
        imgpath:''
      },
      expressList: ['请选择快递商家', '圆通快递', '中通快递', '韵达快递', '顺丰快递', '邮政快递', '京东快递', '极兔快递', '其他'],
      expressList2: ['小件￥2','中件￥3','大件￥5'],
      rooturl:'http://47.113.216.236:9737',
      imgnum:0,
      imgpaths:[],
      num:0,
      codeValue: "",
      token:'',
      flag:0,
      elseTo:'',
      smallnum: 0,
      middlenum: 0,
      largenum: 0,
      images:[],
      adress:'',
      phone:'',
      type:'快递',
      remark:'',
      price:0,
      money:0,
      districtOptions: ['生活一区', '生活二区', '生活三区', '生活四区', '生活五区'],
      selectedDistrict: '生活一区',
      buildingOptions: generateBuildingOptions(),
      selectedBuilding: '1号楼',
      dormitoryOptions: generateDormitoryOptions(),
      selectedDormitory: '101'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const token = wx.getStorageSync('token') || ''
    this.setData({
      list:[],
      token:token
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
  doUpload: function (e) {
  var i=e.currentTarget.dataset.index;
    wx.chooseImage({
     sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
     sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
     success: res => {
       if (this.data.images.length <= 1) {
         const images = this.data.images.concat(res.tempFilePaths)
         var a='controls['+i+'].imgpath'
         console.log(res)
         this.setData({
           [a]:images,
           images: images,
           flag:1,
           imgnum:this.data.imgnum+1
         })
       } else {
         wx.showToast({
           title: '最多只能选择两张照片',
           icon: 'none',
           duration: 2000,
           mask: true
         })
       }
     }
  })
},
  bindPickerChange: function (e) {
    var index = e.detail && e.detail.value;
    var i=e.currentTarget.dataset.index;
    if (index !== undefined) {
      var selectedExpress = this.data.expressList[index];
      var a='controls['+i+'].selectedExpress'
      this.setData({
        [a]:selectedExpress
      })
    }
},
bindPickerChange2: function (e) {
  var index = e.detail && e.detail.value;
  var price = 1+index*2;
  var i=e.currentTarget.dataset.index;
  this.setData({
    price:this.data.price+price
  })
  if (index !== undefined) {
    var selectedExpress2 = this.data.expressList2[index];
    var a='controls['+i+'].selectedExpress2'
    var b='controls['+i+'].price'
      this.setData({
        [a]:selectedExpress2,
        [b]:price
      })
  }
},
formsubmit()
{
  var that=this;
  var phoneNumber = this.data.phone;
  var shanjia = this.data.selectedExpress;
  if(!phoneNumber){
    wx.showToast({
      title: '请填写联系电话',
      icon: 'none',
      duration: 2000
    });
    return;
  }
  if(shanjia === '请选择快递商家'){
    wx.showToast({
      title: '请填写快递商家',
      icon: 'none',
      duration: 2000
    });
    return;
  }
  wx.showModal({
    title: '确认提交',
    success: function(res) {
      if(res.confirm) {
        that.setData({
          date:new Date()
        })
        if (that.data.imgnum == 0) {
          that.upload_info()
        }
        else{
          let imgpath=[]
            for (let i = 0; i < that.data.images.length; i++) {
             imgpath.push(that.uploadfile(that.data.images[i]))
            }
            Promise.all(imgpath).then((res)=>{
              that.upload_info()
            })
        }
      }
    }
  })
},
//上传图片和信息
upload_info: function() {
  var that =this;
  var address =that.data.selectedDistrict+that.data.selectedBuilding+that.data.selectedDormitory;
  var incidentalMsg={
    code:this.data.code,
    phone:this.data.phone,
    address:address,
}
  let data = {
  'type':this.data.type,
  'from':this.data.selectedExpress,
  'size':this.data.size,
  'building':1,
  'layer':1,
  'incidentalMsg':incidentalMsg,
  'file':this.data.imgpath,
  'elseTo':this.data.elseTo,
  'price':this.data.money,
  'remark':this.data.remark,
}
console.log(data)
  let url = that.data.rooturl+'/pt/publish/json';
  wx.request({
    url: url,
    method: 'POST',
    header: {
     'token':that.data.token,
   },
   data: data,
   success(res) {
   console.log(res)
   wx.navigateBack({
    delta: 2
  })
  }
 });
},
uploadfile: function (filePath){
  let that=this
  return new Promise((resolve,reject)=>{
      wx.uploadFile({
        url: that.data.rooturl + "/file/upload",
        filePath: filePath,
        name: 'files',
        formData: {
        },
        header: {
          "Content-Type": "application/form-data",
          'token':that.data.token
        },
        success: function (res) {
          console.log(res.data)
          that.data.imgpaths.push(res.data)
          resolve()
        },
        fail: function (err) {
          console.log(err)
          reject()
        }
      })
  })
  
},
previewImage: function (e) {
  let that=this
  let current = e.currentTarget.dataset.src
  wx.previewImage({
    urls: that.data.images,
    current:current
  })
},
handleDistrictChange: function (e) {
  const index = e.detail.value;
  const selectedDistrict = this.data.districtOptions[index];
  this.setData({
    selectedDistrict: selectedDistrict
  });
},
handlePriceChange: function (e) {
  const index = e.detail.value;
  var a= parseInt(index)
  if(index==''){a=0}
  this.setData({
    money:a
  });
},
addControl: function () {
  this.setData({
    part:{
      selectedExpress: '请选择快递商家',
      selectedExpress2: '请选择快递大小',
    },
    controls:this.data.controls.concat(this.data.part)
  })
},
removeControl: function () {
  const controls = this.data.controls;
  var price=controls[controls.length-1].price;
  if(controls.length>0)
  {
    controls.pop();
  }
  this.setData({
    price:this.data.price-price,
    controls: controls
  });
},
handleBuildingChange: function (e) {
  const index = e.detail.value;
  const selectedBuilding = this.data.buildingOptions[index];
  this.setData({
    selectedBuilding: selectedBuilding
  });
},
handleDormitoryChange: function (e) {
  const index = e.detail.value;
  const selectedDormitory = this.data.dormitoryOptions[index];
  this.setData({
    selectedDormitory: selectedDormitory
  });
},
handlePhoneNumberInput: function(event) {
  let value = event.detail.value; // 获取输入框的值
  this.setData({
    phone: value, // 更新 phoneNumber 属性的值
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
