// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rooturl:'http://47.113.216.236:9737',
    avatarUrl:'',
    name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const token = wx.getStorageSync('token') || ''
   if(token) {
    console.log('请求其他数据');
   }else{
     this.login()
   }
   let that=this
        wx.getStorage({//异步获取缓存
            key:"name",//本地缓存中指定的 key
            success:(res)=>{ 
              console.log('获取缓存成功',res.data)      
                this.setData({
                    name:res.data.nickName, //将得到的缓存给key 
                     avatarUrl:res.data.avatarUrl         
                })        
            },
            fail(res){
                console.log(res)
                wx.showModal({
                    title: '感谢您使用！',
                    content: '请允许小程序可以使用您的头像和名字！',
                    success (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        that.getUserProfile()
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
            }   
        })

  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于保存用户的昵称', 
      success: (res) => {
          console.log(res)
        this.setData({
          userInfo: res.userInfo,
          
        })
        wx.setStorage({
            key:'name',//本地缓存中指定的 key(类型：string)
            data:res.userInfo,//需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象(类型:any)
            success:(s)=>{  
                this.setData({
                    avatarUrl:res.userInfo.avatarUrl,         
                     name:res.userInfo.nickName
                })
            },
            fail:(f)=>{ 
            }
        })
      }
    })
  },
  //登录的回调函数
  login(){
    var that=this;
    wx.login({
      success: res => {
        const code = res.code;
        console.log(code)
        wx.request({
          url: that.data.rooturl+'/wx/login',
          method:'post',
          data:{
            'code':code
          },
          success:(res) =>
          {
            wx.setStorageSync('token', res.data.data.token);
          }
        })
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      //就是页面显示出来后，让相应的tab改变颜色 图标等样式，也就是这一步可能造成的自定义tab会闪屏  
      selected: 3
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
 jumptoprivacy:function(){
  wx.navigateTo({
      url: '/pages/selfprivacy/selfprivacy',  /*跳转到course页面*/
    })
},
jumptosetting:function(){
  wx.navigateTo({
      url: '/pages/setting/setting',  /*跳转到course页面*/
    })
},
})