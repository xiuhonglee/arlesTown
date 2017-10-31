//获取应用实例

import Preload from '../../components/preload/index'

const thumb = 'https://s10.mogucdn.com/mlcdn/c45406/171031_2d642j2jbffie2gd6kh2hlg87e1j9_30x48.png'
const origin = 'https://s10.mogucdn.com/mlcdn/c45406/171031_427c5idljdagfk2g1al753e4l641l_750x1195.png'

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
      imgUrl: thumb
    });

    //同时对原图进行预加载，加载成功后再替换
    this.imgLoader.load(origin, (err, data) => {
      
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