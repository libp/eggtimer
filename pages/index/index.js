// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    timeArray: ['秒','分钟','小时'],
    index: 0,
    inputValue: '',
    isReEnter: true,
  },
  Focus(e){
    console.log(e.detail.value);
    
    this.setData({
      inputValue:e.detail.value.replace(/[^\d]/g,''),
    })
    if(e.detail.value.length==6){
      console.log("超过最大输入长度： " + e.detail.value.length);
      // this.setData({
      //   inputValue: '',
      //   index: '1',
      //   isReEnter: false,
      // })
    }
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: parseInt(e.detail.value)
    })
  },
  bindKeyInput: function() {
    var time = this.data.inputValue;
    var timescale = this.data.index

    switch ( timescale ) {
      case 1:
        time = time * 60000;
        break;
      case 2:
        time = time * 3600000;
        break;
      default:
        time = time * 1000;
    }
    console.log('开始倒计时 ' + time);
    wx.navigateTo({
      url: '../logs/logs'+'?timer='+time,
    })
  },

  bindshortcut: function(e) {
    wx.navigateTo({
      url: '../logs/logs'+'?timer='+e.target.dataset.field,
    })
  },
  onLoad() {
  },
})
