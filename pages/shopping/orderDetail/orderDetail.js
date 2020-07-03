// pages/shopping/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg: '',
    minename: '',
    minegender: '',
    mineaddresses: '',
    minephone: '',
    minedizhi: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取到单条的订单信息
    console.log(options)
    const userInfo = wx.getStorageSync('realNameone')
    let str = userInfo.commonAddress
    const index=str.lastIndexOf("\-");
    str=str.substring(index+1,str.length);
    this.setData({
        userimg: userInfo.headImage,
        minename:userInfo.realName,
        minegender: '',
        mineaddresses:str,
        minephone:userInfo.phoneNumber,
        minedizhi:userInfo.commonAddress,
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

  }
})