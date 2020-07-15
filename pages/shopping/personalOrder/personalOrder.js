// pages/shopping/personalOrder/personalOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.globalData.api,
    //小程序没有refs，所以只能用动态布尔值控制关闭
    toggle: false,
    dataList:[
      {
      id:1,
      title:"黑人星耀白星星牙膏去黄牙垢亮白美白口气清新口腔清洁家庭实惠装",
      img: '11'
    }, {
        id: 2,
        title: "王一博高露洁氨基酸牙膏牙结石去除去黄牙垢亮白牙周炎去口臭清新",
        img: '12'
      }, {
        id: 3,
        title: "金角老四川老字号麻辣手撕牛肉干100g重庆特产休闲零食网红小吃",
        img: '13'
      }, {
        id: 4,
        title: "安安金纯橄榄油丝质顺滑护发素润发乳正品修复柔顺滑溜溜男女",
        img: 8
      }, {
        id: 5,
        title: "榄菊蚊香艾草型3+1实惠家庭装30盘送托盘家用室内驱蚊灭蚊批发",
        img: '9'
      }, {
        id: 6,
        title: "富锦新竹米粉干米粉500g米线干米线细粉丝米粉方便速食即食",
        img: '10'
      }, {
        id: 7,
        title: "普京弹钢琴又圈粉 国家领导人们都有哪些才艺？",
        img: 2
      }, {
        id: 8,
        title: "特朗普“海选”FBI局长 一天面试8个",
        img: 1
      }, {
        id: 9,
        title: "经济下行压力是否进一步扩大？官方回应经济热点",
        img: 4
      }, {
        id: 10,
        title: "上海一家三口住9平米房间27年 儿子踩冰箱上床",
        img: 'avatar_2'
      }, {
        id: 11,
        title: "英国曼彻斯特发生爆炸 事发地正举行演唱会",
        img: 1
      }, {
        id: 12,
        title: "美国会表决通过新驻华大使 月底有望赴华",
        img: 'avatar_1'
      }],
    actions: [
      {
        name: '删除',
        color: '#fff',
        fontsize: '22',
        width: 80,
        //icon: 'like.png',//此处为图片地址
        background: '#ed3f14'
      },
      {
        name: '修改',
        color: '#fff',
        fontsize: '22',
        width: 80,
        //icon: 'like.png',//此处为图片地址
        background: '#ff7900'
      },
      {
        name: '收藏',
        width: 80,
        color: '#80848f',
        fontsize: '22',
        //icon: 'undo'
      }
    ],
    allOrder: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
        // 获取详情信息
        wx.request({
          url: that.data.api+'MallOrders/selectAllMallOrders',
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
                allOrder:res.data.data
              })
              console.log(that.data.allOrder)
              
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
  handlerCloseButton(e) {
    let index = e.detail.index;
    let item = e.detail.item;
    let menuTxt = ["删除","修改","收藏"][index];
    wx.showToast({
      title: "您点击了【" + menuTxt+"】按钮，列表id："+item.id,
      icon:"none"
    })
  //list中可以每一项都设置toggle
    setTimeout(()=>{
       this.setData({
        toggle: this.data.toggle ? false : true
      });
    },200)
   
  }
})