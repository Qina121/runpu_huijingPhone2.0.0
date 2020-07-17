App({
  onLaunch(options) {
    // Do something initial when launch.
    wx.setNavigationBarTitle({
      title: '登录',
    })
  },
  globalData:{
    api: "https://api.huijingwuye6688.com/",
    // api : 'http://192.168.1.110:8084/'
  },
  onShow(options) {
    // Do something when show.
  },
  onHide() {
    // Do something when hide.
  },
  onError(msg) {
    // console.log(msg)
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);

  },

})