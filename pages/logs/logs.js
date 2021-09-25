var Egg = require('../../utils/egg.js')
var Egg = Egg.Egg

Page({
  data: {
    logs: [],
    Width:100,
    Height:100,
    progressWidth:100,
    progressHeight:0
  },
  onLoad(res) {
    var that = this;
    wx.getSystemInfo({
      success (res) {
        that.setData({
          Width: res.windowWidth-20,
          Height: res.windowHeight-20,
          progressWidth: res.windowWidth,
          progressHeight: res.windowHeight
        })
      }
    })
    that.audioCtx = wx.createAudioContext('beepbeep')
    // that.audioCtx.play()
    Egg.startTime = (new Date()).getTime();
    var duration = parseInt(res.timer);
    Egg.endTime = Egg.startTime + duration;
    Egg.ticker = null;
    Egg.start.apply(this,[]);
  },
  onUnload() {
    // wx.reLaunch({
    //   url: 'index',
    // })
    // wx.redirectTo({
    //   url: 'index',
    // })
  },
  onShow() {
    // console.log(getCurrentPages());
  },
})
