Page({
  data: {
    inputValue: '',
    warnSize: 'default',
    show: true,
    plain: false,
    openid:"",
    smallimgurl:"https://www.qy58.cn/upload/box.png",
    imgUrls: [
      {
        link: '/pages/index/index',
        url: 'https://www.qy58.cn/upload/lunboone.png'
      }, {
        link: '/pages/inedx/index',
        url: 'https://www.qy58.cn/upload/lunbob.png'
      }, {
        link: '/pages/index/index',
        url: 'https://www.qy58.cn/upload/lunboa.png'
      }
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 3000,  //滑动时间
     buttons: [
            {
                type: 'default',
                className: '',
                text: '辅助操作',
                value: 0
            },
            {
                type: 'primary',
                className: '',
                text: '主操作',
                value: 1
            }
        ]
  },
  onLoad: function (options) {
    
  },
  onShow: function() {
    // 页面出现在前台时执行
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
  },
  onHide: function() {
    // 页面从前台变为后台时执行
  },
  onUnload: function() {
    // 页面销毁时执行
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
  },
  onReachBottom: function() {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function() {
    // 页面滚动时执行
  },
  onResize: function() {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {
    // // tab 点击时执行
    // console.log(item.index)
    // console.log(item.pagePath)
    // console.log(item.text)
  },
  // 事件响应函数
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
  getPerson:function(e){
    // console.log(this.data.openid);
    // console.log(e);
  },
  // 自由数据
  customData: {
    hi: 'MINA'
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  watchPhotoNumber: function (event) {
    console.log(event.detail.value);
    var phone = event.detail.value;
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
        console.log("手机号码有误，请重填");  
        return false; 
    } 
  },
  open: function () {
    this.setData({
        show: true
    })
},
buttontap(e) {
  // console.log(e.detail)
},
open: function () {
  this.setData({
      show: true
  })
},
garbage: function() {
  console.log('垃圾分类')
  console.log(wx.getStorageSync('login'))
  
  if(!wx.getStorageSync('login')) {
    wx.navigateTo({
      url: '../login/login'
    })
  } else {
    wx.navigateTo({
      url: '/pages/secondpage/secondpage'
    })
  }
},

notice: function() {
  console.log('通知')
  console.log(wx.getStorageSync('login'))
  if(!wx.getStorageSync('login')) {
    wx.navigateTo({
      url: '../login/login'
    })
  } else {
    wx.navigateTo({
      url: '/pages/notice/notice'
    })
  }
},
serviceApplication: function() {
  console.log('服务申办')
  console.log(wx.getStorageSync('login'))
  if(!wx.getStorageSync('login')) {
    wx.navigateTo({
      url: '../login/login'
    })
  } else {
    wx.navigateTo({
      url: '/pages/repair/repair'
    })
  }
},
vehicleManagement: function() {
  console.log('车辆管理')
  console.log(wx.getStorageSync('login'))
  if(!wx.getStorageSync('login')) {
    wx.navigateTo({
      url: '../login/login'
    })
  } else {
    wx.navigateTo({
      url: '/pages/vehicle/vehicle'
    })
  }
},

   
})
