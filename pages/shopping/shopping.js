Page({
    data:{
    pageIndex: 1,
    productList: [{
        img: 1,
        name: "利物浦官方 独家出品纪念版沙发",
        sale: 599,
        factory: 899,
        payNum: 2342
      },
      {
        img: 2,
        name: "好看好养活的绿色养眼小盆栽，超级实惠",
        sale: 29,
        factory: 69,
        payNum: 999
      },
      {
        img: 3,
        name: "利物浦官方 独家出品大红床上用品三件套",
        sale: 299,
        factory: 699,
        payNum: 666
      },
      {
        img: 4,
        name: "利物浦官方 独家出品花花碎花床上用品三件套",
        sale: 1599,
        factory: 2899,
        payNum: 236
      },
      {
        img: 5,
        name: "利物浦官方 独家出品纪念版书柜，便宜又省空间，超级划算",
        sale: 599,
        factory: 899,
        payNum: 2399
      }, {
        img: 1,
        name: "独家出品纪念版沙发",
        sale: 599,
        factory: 899,
        payNum: 2342
      },
      {
        img: 2,
        name: "好看好养活的绿色养眼小盆栽，超级实惠",
        sale: 29,
        factory: 69,
        payNum: 999
      },
      {
        img: 3,
        name: "利物浦官方 独家出品大红床上用品三件套",
        sale: 299,
        factory: 699,
        payNum: 666
      },
      {
        img: 4,
        name: "利物浦官方 独家出品花花碎花床上用品三件套",
        sale: 1599,
        factory: 2899,
        payNum: 236
      },

    ],
    loadData: [{
        img: 1,
        name: "利物浦官方 独家出品纪念版沙发",
        sale: 599,
        factory: 899,
        payNum: 2342
      },
      {
        img: 2,
        name: "好看好养活的绿色养眼小盆栽，超级实惠",
        sale: 29,
        factory: 69,
        payNum: 999
      },
      {
        img: 3,
        name: "利物浦官方 独家出品大红床上用品三件套",
        sale: 299,
        factory: 699,
        payNum: 666
      },
      {
        img: 4,
        name: "利物浦官方 独家出品花花碎花床上用品三件套",
        sale: 1599,
        factory: 2899,
        payNum: 236
      },
      {
        img: 5,
        name: "利物浦官方 独家出品纪念版书柜，便宜又省空间，超级划算",
        sale: 599,
        factory: 899,
        payNum: 2399
      }, {
        img: 1,
        name: "利物浦官方 独家出品纪念版沙发",
        sale: 599,
        factory: 899,
        payNum: 2342
      },
      {
        img: 2,
        name: "好看好养活的绿色养眼小盆栽，超级实惠",
        sale: 29,
        factory: 69,
        payNum: 999
      },
      {
        img: 3,
        name: "大红床上用品三件套",
        sale: 299,
        factory: 699,
        payNum: 666
      },
      {
        img: 4,
        name: "利物浦官方 独家出品花花碎花床上用品三件套",
        sale: 1599,
        factory: 2899,
        payNum: 236
      },
      {
        img: 5,
        name: "利物浦官方 独家出品纪念版书柜，便宜又省空间，超级划算",
        sale: 599,
        factory: 899,
        payNum: 2399
      }
    ],
    loadding: false,
    pullUpOn: true
    },
    onLoad:function(options){
        // 判断是否登录
        // console.log(wx.getStorageSync('login'))
        // if(!wx.getStorageSync('login')) {
        //     wx.navigateTo({
        //       url: '../login/login'
        //     })
        //   }
        wx.setNavigationBarTitle({ title:'积分商城'})
        // 生命周期函数--监听页面加载

        // 获取商品列表信息
        var that = this;
        wx.request({
            url: 'https://api.huijingwuye6688.com/MallGoods/selectAllMallGoods',
            method: "get",
            data: {
                // id: options.id
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res.data)
                // that.setData({
                //     historylist: res.data.data,
                    
                // })
                console.log(that.historylist)

            }
        })
    },
    onReady:function(){
        // 生命周期函数--监听页面初次渲染完成
    },
    onShow:function(){
        // 生命周期函数--监听页面显示
    },
    onHide:function(){
        // 生命周期函数--监听页面隐藏
    },
    onUnload:function(){
        // 生命周期函数--监听页面卸载
    },
    onPullDownRefresh: function() {
        // 页面相关事件处理函数--监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
          title: 'title', // 分享标题
          desc: 'desc', // 分享描述
          path: 'path' // 分享路径
        }
    },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    //延时为了看效果
    setTimeout(() => {
      this.setData({
        productList: this.data.loadData,
        pageIndex: 1,
        pullUpOn: true,
        loadding: false
      })
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '刷新成功',
        icon: "none"
      })
    }, 200)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.pullUpOn) return;
    this.setData({
      loadding: true
    }, () => {
      if (this.data.pageIndex == 3) {
        this.setData({
          loadding: false,
          pullUpOn: false
        })
      } else {
        this.setData({
          productList: this.data.productList.concat(this.data.loadData),
          pageIndex: this.data.pageIndex + 1,
          loadding: false
        })
      }
    })
  },
//   商品的详细内容
  detail(e) {
    wx.navigateTo({
      url: './shoppingDetail/shoppingDetail'
    })
  },
//   轮播图的点击事件
  swiperDetail() {

  },

})