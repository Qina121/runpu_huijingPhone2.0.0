// pages/shopping/confirmPayment/confirmPayment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg: '',
    minename: '',
    mineId:'',
    minegender: '',
    mineaddresses: '',
    minephone: '',
    minedizhi: '',
    orderNumber: 0,
    singleMessage: {},
    goodsId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, "options")
    const that = this
    const userInfo = wx.getStorageSync('realNameone')
    let str = userInfo.commonAddress
    if(str) {
      const index=str.lastIndexOf("\-");
      str=str.substring(index+1,str.length);
    }
    this.setData({
        userimg: userInfo.headImage,
        minename:userInfo.realName,
        mineId:userInfo.id,
        minegender: '',
        mineaddresses:str,
        minephone:userInfo.phoneNumber,
        minedizhi:userInfo.commonAddress,
        orderNumber: options.number,
        goodsId:options.detailId
    })


     
    // 获取详情信息
    wx.request({
      url: 'https://api.huijingwuye6688.com/MallGoods/selectOneInfo/'+ options.detailId,
      method: "get",
      data: {
          // id: options.id
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function (res) {
          console.log(res.data)
          that.setData({
            singleMessage: res.data.data
          })
          // console.log(that.data.singleMessage)
      }
    })
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
  submit() {
        const that = this
        // 获取详情信息
        wx.request({
          // url: 'https://api.huijingwuye6688.com/MallGoods/updateUserPurchasesGoods',
          url: 'http://192.168.1.110:8084/MallGoods/updateUserPurchasesGoods',
          method: "post",
          data: {
            id: that.data.mineId,
            realName: that.data.minename,
            phoneNumber:that.data.minephone,
            goodsId: that.data.goodsId,
            // goodsPrice: Number(that.data.singleMessage.goodsPrice),
            goodsPrice: that.data.singleMessage.goodsPrice,
            goodsNumber: that.data.orderNumber
          },
          header: {
              // 'Content-Type': 'application/json'
              'Content-Type': "application/x-www-form-urlencoded"
          },
          success: function (res) {
              // console.log(res)
              if(res.data.success) {
                wx.navigateTo({
                  url: '../paymentSucceeded/paymentSucceeded'
                })
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000//持续的时间
               })
              }
          }
        })
    
  }
})