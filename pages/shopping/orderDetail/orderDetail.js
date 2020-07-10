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
    let usercommonAddress = userInfo.commonAddress
    if(str) {
      const index=str.lastIndexOf("\-");
      console.log(index)
      if(index == -1) {
          str = '无'
      } else {
          str=str.substring(index+1,str.length);
      }
      
  } else {
      str = '无'
      usercommonAddress = '无'
  }
    
    const index=str.lastIndexOf("\-");
    str=str.substring(index+1,str.length);
    this.setData({
        userimg: userInfo.headImage,
        minename:userInfo.realName,
        minegender: '',
        mineaddresses:str,
        minephone:userInfo.phoneNumber,
        minedizhi:usercommonAddress,
    })


        // 获取详情信息
        wx.request({
          url: 'https://api.huijingwuye6688.com//MallOrders/selectOne/' + options.orderDetail,
          method: "get",
          data: {
              // id: options.id
          },
          header: {
              'Content-Type': 'application/json'
          },
          success: function (res) {
              console.log(res.data)
             
              
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

  }
})