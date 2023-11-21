var app=getApp()
// pages/takekuaidi/takekuaidi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      controls:[
      ],
      code:'',
      part:{
        company: '请选择快递商家',
        selectedExpress2: '请选择快递大小',
        size:'',
        price:0,
        imgpath:''
      },
      expressList: ['请选择快递商家', '圆通快递', '中通快递', '韵达快递', '顺丰快递', '邮政快递', '京东快递', '极兔快递', '其他'],
      expressList2: ['小件￥2','中件￥3','大件￥5'],
      rooturl:'https://rrewuq.com',
      images:[],
      imgnum:0,
      imgpaths:[],
      num:0,
      codeValue: "",
      token:'',
      flag:0,
      elseTo:'',
      smallnum: 0,
      building:0,
      layer:0,
      middlenum: 0,
      largenum: 0,
      //images:[],
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
    if(app.globalData.defaultable)
    {
      this.default();
    }
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
  default()
  {
    var selectedDistrict=wx.getStorageSync('selectedDistrict');
    var selectedBuilding=wx.getStorageSync('selectedBuilding');
    var selectedDormitory=wx.getStorageSync('selectedDormitory');
    var phone=wx.getStorageSync('phone');
    var name=wx.getStorageSync('name');
    var a=parseInt(selectedDormitory);
    this.setData({
      selectedDistrict:selectedDistrict,
      selectedBuilding:selectedBuilding+'号楼',
      selectedDormitory:selectedDormitory,
      building:selectedBuilding,
      layer:a,
      phone:phone,
      name:name
    })
  },
  doUpload: function (e) {
  var that=this;
  var i=e.currentTarget.dataset.index;
  if(this.data.controls[i].company=='请选择快递商家'){
    wx.showToast({
      title: '请选择快递商家',
      icon: 'none',
      duration: 2000
    });
    return;
  }
  if(!this.data.controls[i].size){
    wx.showToast({
      title: '请选择快递大小',
      icon: 'none',
      duration: 2000
    });
    return;
  }
  wx.chooseImage({
     sizeType: ['original', 'compressed'],
     sourceType: ['album', 'camera'], 
     success: res => {
       if (res.tempFilePaths.length<=1) {
         var a='controls['+i+'].imgpath'
         console.log(res)
         this.setData({
           images:that.data.images.concat(res.tempFilePaths[0]),
           [a]:res.tempFilePaths[0],
           flag:1,
           imgnum:this.data.imgnum+1
         })
       } else {
         wx.showToast({
           title: '最多只能选择一张照片',
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
      var a='controls['+i+'].company'
      this.setData({
        [a]:selectedExpress
      })
    }
},
bindPickerChange2: function (e) {
  var index = e.detail && e.detail.value;
  var list=[2,3,5]
  var price =list[index]
  var i=e.currentTarget.dataset.index;
  var money=this.data.controls[i].price;
  this.setData({
    price:this.data.price+price-money
  })
  var list=['小件','中件','大件']
  if (index !== undefined) {
    var selectedExpress2 = this.data.expressList2[index];
    var a='controls['+i+'].selectedExpress2'
    var b='controls['+i+'].price'
    var c='controls['+i+'].size'
      this.setData({
        [a]:selectedExpress2,
        [b]:price,
        [c]:list[index]
      })
  }
},
formsubmit()
{
  var that=this;
  var phoneNumber = this.data.phone;
  if(!that.data.controls.length)
  {
    wx.showToast({
      title: '请填写订单',
      icon: 'none',
      duration: 2000
    });
    return;
  }
  if(!phoneNumber){
    wx.showToast({
      title: '请填写联系电话',
      icon: 'none',
      duration: 2000
    });
    return;
  }
  if(that.data.imgnum!=that.data.controls.length){
    wx.showToast({
      title: '请上传图片',
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
            for (let i = 0; i < that.data.controls.length; i++) {
            console.log(that.data.controls[i].imgpath)
             that.uploadfile(that.data.controls[i].imgpath,i)
}
        }
      }
    }
  })
},
//上传图片和信息
upload_info: function(i,pic) {
  var that =this;
  var address =that.data.selectedDistrict+that.data.selectedBuilding+that.data.selectedDormitory;
  var incidentalMsg={
    "name": "力内则系红组克",
    'code':that.data.code,
    'phone':that.data.phone,
    'address':address,
    'picture':pic
}
  let data = {
  'type':this.data.type,
  'from':'快递站',
  'building':this.data.building,
  'layer':this.data.layer,
  "incidentalMsg":incidentalMsg,
  'elseTo':this.data.elseTo,
  'size':this.data.controls[i].size,
  'price':this.data.controls[i].price,
  'company':this.data.controls[i].company,
  'remark':this.data.remark
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
uploadfile: function (filePath,i){
  let that=this
  console.log(filePath)
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
          const data = JSON.parse(res.data);
          const pic = data.data[0]; 
          console.log(pic)
          that.upload_info(i,pic)
        },
      })
},
previewImage: function (e) {
  let current = e.currentTarget.dataset.src
  var that=this;
  wx.previewImage({
    urls:that.data.images,
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
handleremark: function(event) {
  let value = event.detail.value; // 获取输入框的值
  this.setData({
    remark: value, // 更新 phoneNumber 属性的值
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
      company: '请选择快递商家',
      selectedExpress2: '请选择快递大小',
      price:0,
      size:'',
      imgpath:'',
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
