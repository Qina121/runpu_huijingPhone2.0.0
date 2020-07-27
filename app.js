App({
  onLaunch(options) {
    // Do something initial when launch.
    wx.setNavigationBarTitle({
      title: '登录',
    })
  },
  globalData:{
    // api: "https://api.huijingwuye6688.com/",
    api : 'http://192.168.1.110:8084/'
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
  // 当前时间戳转换成字符串格式
  getFullTime() {
    let date = new Date(),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '',
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1),
        D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()),
        h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()),
        m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()),
        s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
    // return Y + '-' + M +'-' + D +'-' + h +'-' + m +'-' + s
    return Y + '-' + M +'-' + D 
},

})