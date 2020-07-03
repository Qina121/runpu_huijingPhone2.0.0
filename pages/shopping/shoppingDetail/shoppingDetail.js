// pages/shopping/shoppingDetail/shoppingDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
    scrollH: 0, //滚动总高度
    opcity: 0,
    iconOpcity: 0.5,
    banner: [
      "https://www.thorui.cn/img/product/11.jpg",
      "https://www.thorui.cn/img/product/2.png",
      "https://www.thorui.cn/img/product/33.jpg",
      "https://www.thorui.cn/img/product/4.png",
      "https://www.thorui.cn/img/product/55.jpg",
      "https://www.thorui.cn/img/product/6.png",
      "https://www.thorui.cn/img/product/7.jpg",
      "https://www.thorui.cn/img/product/8.jpg"
    ],
    bannerIndex: 0,
    topMenu: [{
      icon: "message",
      text: "消息",
      size: 26,
      badge: 3
    }, {
      icon: "home",
      text: "首页",
      size: 23,
      badge: 0
    }, {
      icon: "people",
      text: "我的",
      size: 26,
      badge: 0
    }, {
      icon: "cart",
      text: "购物车",
      size: 23,
      badge: 2
    }, {
      icon: "kefu",
      text: "客服小蜜",
      size: 26,
      badge: 0
    }, {
      icon: "feedback",
      text: "我要反馈",
      size: 23,
      badge: 0
    }, {
      icon: "share",
      text: "分享",
      size: 26,
      badge: 0
    }],
    menuShow: false,
    popupShow: false,
    value: 1,
    collected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = wx.getMenuButtonBoundingClientRect();
    this.setData({
      width: obj.left,
      height: obj.top + obj.height + 8,
      top: obj.top + (obj.height - 32) / 2
    }, () => {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            scrollH: res.windowWidth
          })
        }
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bannerChange: function (e) {
    this.setData({
      bannerIndex: e.detail.current
    })
  },
  submit() {
    wx.navigateTo({
      url: '../confirmPayment/confirmPayment'
    })
  },
  personalOrder() {
    wx.navigateTo({
      url: '../personalOrder/personalOrder'
    })
  }
 })