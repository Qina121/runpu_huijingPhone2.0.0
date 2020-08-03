const app = getApp()
Page({
  data: {
    api: app.globalData.api,
    inputValue: '',
    warnSize: 'default',
    show: true,
    plain: false,
    openid:"",
    smallimgurl:"https://api.huijingwuye6688.com/api/file/wxe09ab78e32c1cde1.o6zAJswoSVnxow4vnHVOonlp0XuA.94tj7BSYXhyAb98970fc0416a79e39f2646e00a061ef.png",
    imgUrls: [
      {
        link: '/pages/index/index',
        url: 'https://api.huijingwuye6688.com/api/file/wxe09ab78e32c1cde1.o6zAJswoSVnxow4vnHVOonlp0XuA.CASESTTpKKvr91616d1fbc712f90a7b0701560950606.jpg'
      }, {
        link: '/pages/inedx/index',
        url: 'https://api.huijingwuye6688.com/api/file/wxe09ab78e32c1cde1.o6zAJswoSVnxow4vnHVOonlp0XuA.nKU7yUef8rJc2cb1c7fbf62286c9d02f2febb7d142cb.jpg'
      }, {
        link: '/pages/index/index',
        url: 'https://api.huijingwuye6688.com/api/file/wxe09ab78e32c1cde1.o6zAJswoSVnxow4vnHVOonlp0XuA.5HB7pV7gXYzOc4aff9afbf870f1c3e8a8632c7cdcf07.png'
      }
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 4000,  //间隔时间
    duration: 1000,  //滑动时间
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
    ],
    IdSwiper:[],
    noticeSwiper:[],
    // SwiperInfo: []
  },
  onLoad: function (options) {
    const that = this
    wx.request({
      url: that.data.api+'NoticeAsCarousel/selectOneNoticeAsCarousel',
      method: "get",
      data: {
          // id: options.id
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function (res) {
     
          if(res.data.data.noticeAsCarousel) {
            that.setData({
              IdSwiper:res.data.data.noticeAsCarousel.split(',')//获取轮播图公告的id
            })

          }
          let imgArr = [] //轮播图数组
          // let info = []  //获取图片id和 公告id
          // 按照轮播图的id查询每一条详细信息
          for(let i = 0; i<that.data.IdSwiper.length; i++ ) {  //遍历公告找出图片id
            wx.request({
              url: that.data.api+'notice/selectOneById/'+that.data.IdSwiper[i],
              method: "get",
              data: {       
              },
              header: {
                  'Content-Type': 'application/json'
              },
              success: function (res) {

                  // 获取图片
                  if(res.data.data) {
                    if(res.data.data.attachment) {
                      wx.request({
                        url: that.data.api+'notice/selectPictureById/'+res.data.data.attachment,
                        method: "get",
                        data: {
                            // id: options.id
                        },
                        header: {
                            'Content-Type': 'application/json'
                        },
                        success: function (res) {
            
                            imgArr.push({
                              link: '/pages/notice/noticelist/noticelist?id='+that.data.IdSwiper[i],
                              url: res.data.data.fileUrl
                            })
                            that.setData({
                              imgUrls:imgArr
                            })
                        }
                      })
                    }
                  }
                  

              }
            })
          }
      }
  })

  // console.log(wx.getStorageSync('realNameone').carNumber)
  // console.log(wx.getStorageSync('realNameone').carNumber.split(','))
  // console.log(wx.getStorageSync('realNameone').carNumber, '车牌')
  //判断车牌时效性
  if(wx.getStorageSync('realNameone').carNumber) {
    const carNumberArr = wx.getStorageSync('realNameone').carNumber.split(',');
    for(let i = 0; i<carNumberArr.length; i++) {
      console.log(carNumberArr[i])
      wx.request({
        url: that.data.api+'RfidCarTimeliness/selectOneInfoByCarNumber',
        method: "get",
        data: {
            carNumber: carNumberArr[i]
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            console.log(res)    
            if(res.data.data) {
              var day1 = new Date(app.getFullTime());
            var day2 = new Date(res.data.data.endTime);
            // var day1 = new Date("2017-9-18");
            // var day2 = new Date("2017-9-18");
            // console.log((day2 - day1) / (1000 * 60 * 60 * 24));
            const timeNumber = (day2 - day1) / (1000 * 60 * 60 * 24)
            console.log(timeNumber)
            if(timeNumber<0){
              wx.showModal({
                title: '您的车牌已过期',                                       
                confirmText: '确定',                                       
                content: '请联系管理员',                                      
                success: function (res) {                                      
                  if (res.confirm) {}
                }
               })
              // 过期提示后台
              wx.request({
                url: that.data.api+'RfidCarTimeliness/updateRfidCarFailure',
                method: "get",
                data: {
                    carNumber: carNumberArr[i]
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    console.log(res)
                }
              })
            }
  
           else if(0<=timeNumber && timeNumber<2) {
                wx.showModal({
                  title: '您的车牌即将到期',                                       
                  confirmText: '确定',                                       
                  content: '请联系管理员',                                      
                  success: function (res) {                                      
                    if (res.confirm) {}
                  }
                 })
            }
            }                      
        }
      })
    }
  }
 


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
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  watchPhotoNumber: function (event) {

    var phone = event.detail.value;
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
        return false; 
    } 
  },
  open: function () {
    this.setData({
        show: true
    })
},
buttontap(e) {

},
open: function () {
  this.setData({
      show: true
  })
},
garbage: function() { 
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
  const that = this
  if(!wx.getStorageSync('login')) {
    wx.navigateTo({
      url: '../login/login'
    })
  } else {
    // wx.navigateTo({
    //   url: '/pages/notice/notice'
    // })
     //通知公告请求
     wx.request({
         url: that.data.api+'notice/selectAllNotice',
         method: "get",
         data: {
             // id: options.id
         },
         header: {
             'Content-Type': 'application/json'
         },
         success: function (res) {
            //  console.log(res.data.data)
             if(res.data.data.length>0) {
                wx.navigateTo({
                  url: '/pages/notice/notice'
                })
             } else {
              wx.showToast({
                title: '暂无通知公告',
                icon: 'none',
                duration: 2000//持续的时间
              })
             }
         }
     })
  }
},
serviceApplication: function() {
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
