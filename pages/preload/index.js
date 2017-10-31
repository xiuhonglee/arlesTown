//获取应用实例

import Preload from '../../components/preload/index'

const thumd = 'https://s10.mogucdn.com/mlcdn/c45406/171030_003f3hbcjkbe8jdg411b79a2kgje7_80x50.jpg'
const origin = 'https://s10.mogucdn.com/mlcdn/c45406/171030_30fbddh7jcgd4i3lf6890cfga0kdk_3200x2000.jpg'

Page({
  data: {
    imgUrl: ''
  },

  //事件处理函数
  onLoad() {
    this.imgLoader = new Preload(this)
  },
  loadImage() {
    this.setData({
      imgUrl: thumd
    })

    //同时对原图进行预加载，加载成功后再替换
    this.imgLoader.load(origin, (err, data) => {
      console.log('图片加载完成', err, data.src)
      this.setData({
        msg: '大图加载完成~'
      })

      if (!err)
        this.setData({
          imgUrl: data.src
        })
    })
  }
})