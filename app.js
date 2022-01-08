// app.js
App({
  onLaunch() {
    // 小程序保持屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
  },
  globalData: {
    userInfo: null
  }
})
