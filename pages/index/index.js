Page({

  data: {},

  // 事件处理函数
  $redirect: function(option) {
    wx.navigateTo({
      url: option.target.dataset['href']
    })
  },

  onLoad: function() {
    
  }
})