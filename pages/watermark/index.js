// 获取应用实例
let app = getApp();

const systemInfo = wx.getSystemInfoSync()

const _windowWidth = systemInfo.windowWidth >>> 0
const _windowHeight = systemInfo.windowHeight >>> 0
const _dpr = systemInfo.pixelRatio

Page({

  data: {
    windowWidth: _windowWidth,
    windowHeight: _windowHeight,
    imageWidth: 0,
    imageHeight: 0,
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
          count: 1,
          src: res.tempFilePaths[0],
          // src: 'https://s10.mogucdn.com/mlcdn/c45406/171101_1dk69kbj5ba97d38gg9c7g97ai393_375x500.jpg',
          // src: 'https://s10.mogucdn.com/mlcdn/c45406/171101_8d92jcai3g13c9dg6iaa703fe4647_720x721.jpg',
          success: function(res2) {

            self.setData({
              imageWidth: res2.width,
              imageHeight: res2.height
            })

            self.ctx.drawImage(res2.path, 0, 0, res2.width / _dpr, res2.height / _dpr)

            for (let i = - _windowWidth; i < _windowWidth * 2; i += 100) {
              for (let j = -_windowHeight * .5; j < _windowHeight * 1.5; j += 100) {
                self.ctx.save()
                self.ctx.rotate(-300 / Math.PI / 180)
                self.ctx.translate(i, j);
                self.ctx.setFillStyle('#aaaaaa')
                self.ctx.setFontSize(15)
                self.ctx.fillText(self.data.userInfo.nickName, 0, 0)
                self.ctx.restore()
              }
            }
            self.ctx.draw()
          }
        })
      }
    })
  },


  preview() {
    let self = this
    // 导出图片
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: _windowWidth,
      height: _windowWidth * self.data.imageHeight / self.data.imageWidth,
      destWidth: _windowWidth,
      destHeight: _windowWidth * self.data.imageHeight / self.data.imageWidth,
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