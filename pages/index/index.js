Page({

  data: {
    isSupportRequestAnimation: false
  },

  //事件处理函数
  $redirect: function(option) {
    wx.navigateTo({
      url: option.target.dataset['href']
    })
  },

  onLoad: function() {
    let isSupportRequestAnimation = requestAnimationFrame;
    this.setData({
      isSupportRequestAnimation: true
    });
  }
})