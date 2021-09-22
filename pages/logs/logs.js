// logs.js
const Egg = require('../../utils/egg.js')
const Time = require('../../utils/time.js')

Page({
  data: {
    logs: [],
    Width:100,
    Height:100
  },
  onLoad(res) {
    var that = this;
    wx.getSystemInfo({
      success (res) {
        that.setData({
          Width: res.windowWidth-20,
          Height: res.windowHeight-20
        })
      }
    })

    // 读取当前页面信息
    console.log(Egg)
    console.log(Time)

    Egg.startTime = (new Date()).getTime();
    var duration = parseInt(res.timer)
    Egg.endTime = Egg.startTime + duration
    console.log(Egg)
    Egg.start();

  }
})
