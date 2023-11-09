Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
        type:Number,
        value:0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
        let url  = e.currentTarget.dataset.url
      //这个方法如果调用，会导致tab bar闪动一下，这个是个bug
    /*   this.setData({
        selected: index
      }) */
      //  wx.switchTab({ url })
      wx.reLaunch({
        url
      })
    }

  }
})

