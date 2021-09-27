var Egg = require('../../utils/egg.js')
var Egg = Egg.Egg

Page({
  data: {
    logs: [],
    Width:100,
    Height:100,
    progressWidth:100,
    progressHeight:0,
    duration:100
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
    // that.audioCtx = wx.createAudioContext('beepbeep')
    that.audioCtx = wx.createInnerAudioContext();
    that.audioCtx.src = "/pages/logs/beepbeep.mp3"
    
    Egg.startTime = (new Date()).getTime();
    that.setData({
      duration: parseInt(res.timer)
    })
    Egg.endTime = Egg.startTime + that.data.duration;
    Egg.start.apply(this,[]);
  },
  onUnload() {
    clearInterval(Egg.ticker);
    Egg.ticker = null;
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
  onShareAppMessage() {
    return {
      title: '倒计时 eggtimer',
      path: '/pages/logs/logs'+'?timer='+this.data.duration
    }
  }
})
