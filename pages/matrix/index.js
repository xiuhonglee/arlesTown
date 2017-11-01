// 获取应用实例
Page({

  data: {},

  onLoad() {
    this.ctx = wx.createCanvasContext('canvas')
    this.drawRect(this.ctx)
    this.rotate(this.ctx)
  },

  drawRect(ctx) {
    ctx.setStrokeStyle('red')
    ctx.strokeRect(0, 0, 150, 100)
    
    ctx.rotate(1 * Math.PI / 180)
    
    ctx.setStrokeStyle('cyan')
    ctx.strokeRect(0, 0, 150, 100)

    ctx.draw()
  },

  rotate(ctx) {
    ctx.save()

    ctx.rotate(20 * Math.PI / 180)

    ctx.restore()
  }


})