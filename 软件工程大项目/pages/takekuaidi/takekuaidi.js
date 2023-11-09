// pages/takekuaidi/takekuaidi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      expressList: ['请选择快递商家', '圆通快递', '中通快递', '韵达快递', '顺丰快递', '邮政快递', '京东快递', '极兔快递', '其他'],
      selectedExpress: '请选择快递商家',
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
      size:'small',
      remark:'测试1',
      code:'',
      from:'',
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
  getmoney(){
    var m=this.data.smallnum*2+this.data.middlenum*3+this.data.largenum*5
    this.setData({
      money:m
    })
  },
  checksmallNum: function (res) {
    var that = this
    var smallnum = res.detail.value
    if (smallnum < 0 || smallnum >= 6 || smallnum == "") {
      wx.showToast({
        title: '输入超出范围',
        icon: 'none'
      })
      that.setData({
        smallnum: 1
      })
    }
  },
  //获取输入数量
  getInputsmallNum: function (res) {
    var that = this
    var smallnum = res.detail.value
    that.setData({
      smallnum: parseInt(smallnum)
    })
  },
  //计算数量
  countsmallNum: function (res) {
    var that = this
    var type = res.currentTarget.dataset.type
    var smallnum = that.data.smallnum
    if (type == 1) {
      if (smallnum > 0) {
        that.setData({
          smallnum: parseInt(smallnum - 1)
        })
      }
    }
    if (type == 2) {
      if (smallnum < 5) {
        that.setData({
          smallnum: parseInt(smallnum + 1)
        })
      }
    }
    this.getmoney();
  },
  checkmiddleNum: function (res) {
    var that = this
    var middlenum = res.detail.value
    if (middlenum < 0 || middlenum >= 6 || middlenum == "") {
      wx.showToast({
        title: '输入超出范围',
        icon: 'none'
      })
      that.setData({
        middlenum: 1
      })
    }
  },
  //获取输入数量
  getInputmiddleNum: function (res) {
    var that = this
    var middlenum = res.detail.value
    that.setData({
      middlenum: parseInt(middlenum)
    })
  },
  //计算数量
  countmiddleNum: function (res) {
    var that = this
    var type = res.currentTarget.dataset.type
    var middlenum = that.data.middlenum
    if (type == 1) {
      if (middlenum > 0) {
        that.setData({
          middlenum: parseInt(middlenum - 1)
        })
      }
    }
    if (type == 2) {
      if (middlenum < 5) {
        that.setData({
          middlenum: parseInt(middlenum + 1)
        })
      }
    }
    this.getmoney();
  },
  checklargeNum: function (res) {
    var that = this
    var largenum = res.detail.value
    if (largenum < 0 || largenum >= 6 || largenum == "") {
      wx.showToast({
        title: '输入超出范围',
        icon: 'none'
      })
      that.setData({
        largenum: 1
      })
    }
  },
  //获取输入数量
  getInputlargeNum: function (res) {
    var that = this
    var largenum = res.detail.value
    that.setData({
      largenum: parseInt(largenum)
    })
  },
  //计算数量
  countlargeNum: function (res) {
    var that = this
    var type = res.currentTarget.dataset.type
    var largenum = that.data.largenum
    if (type == 1) {
      if (largenum > 0) {
        that.setData({
          largenum: parseInt(largenum - 1)
        })
      }
    }
    if (type == 2) {
      if (largenum < 5) {
        that.setData({
          largenum: parseInt(largenum + 1)
        })
      }
    }
    this.getmoney();
  },
  doUpload: function () {
  wx.chooseImage({
     sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
     sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
     success: res => {
       if (this.data.images.length <= 1) {
         const images = this.data.images.concat(res.tempFilePaths)
         console.log(res)
         // 限制最多只能留下2张照片
         this.setData({
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
    if (index !== undefined) {
      var selectedExpress = this.data.expressList[index];
      this.setData({
        selectedExpress: selectedExpress
      });
      console.log('选择的快递商家:', selectedExpress);
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
  this.setData({
    money: this.data.money+a
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
