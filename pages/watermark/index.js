// 获取应用实例
let app = getApp();

const systemInfo = wx.getSystemInfoSync();

Page({

  data: {
    windowWidth: systemInfo.windowWidth,
    windowHeight: systemInfo.windowHeight,
    userInfo: {}
  },

  onLoad() {
    this.ctx = wx.createCanvasContext('canvas')

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  chooseImage() {
    let self = this

    // 1. 选取本地图片
    wx.chooseImage({

      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],

      success: function(res) {

        // 2. 获取图片信息
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          // src: 'https://s10.mogucdn.com/mlcdn/c45406/171031_427c5idljdagfk2g1al753e4l641l_750x1195.png',
          success: function(res2) {

            let _windowWidth = self.data.windowWidth
            let _windowHeight = self.data.windowHeight

            self.ctx.drawImage(res2.path, 0, 0, _windowWidth, _windowWidth * res2.height / res2.width)

            for (let i = - _windowWidth; i < _windowWidth * 3; i += 150) {
              for (let j = -2 * _windowHeight; j < _windowHeight * 3; j += 150) {
                self.ctx.save()
                self.ctx.rotate(-300 / Math.PI / 180)
                self.ctx.translate(i, j);
                self.ctx.setFillStyle('#bbbbbb')
                self.ctx.setFontSize(15)
                self.ctx.fillText(self.data.userInfo.nickName, 0, 0)
                self.ctx.restore()
              }
            }

            self.ctx.draw()

            // 导出图片
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: _windowWidth,
              height: _windowWidth * res2.height / res2.width,
              destWidth: _windowWidth,
              destHeight: _windowWidth * res2.height / res2.width,
              canvasId: 'canvas',
              success: function(res) {
                let arr = []
                arr.push(res.tempFilePath)
                wx.previewImage({
                  current: res.tempFilePath,
                  urls: arr
                })
              }
            })
          }
        })
      }
    })
  }
})