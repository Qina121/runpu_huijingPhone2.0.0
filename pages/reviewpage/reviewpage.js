const app = getApp()
Page({
  data: {
    api: app.globalData.api,
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

  },
  onLoad: function (options) {
    const that = this
    //判断是否用户之前是否登录
    const LoginInfo = wx.getStorageSync('realNameone')
    if(LoginInfo) {
        that.setData({
            nameValue:LoginInfo.realName,
            phoneValue:LoginInfo.phoneNumber
        })
        let userInfoName = that.data.nameValue
        let userInfoPhone = that.data.phoneValue
        wx.request({
            url: that.data.api +'userInfo/selectLogin', //测试服务器接口地址
            method: "get",
            header: {
                'Content-Type': 'application/json'
                // 'Content-Type': "application/x-www-form-urlencoded"
            },
            data: {
                realName: userInfoName,
                phoneNumber: userInfoPhone,
            },
            success: function (res) {
        
                if (res.data.data == null) {
                    wx.showToast({
                        title: '未查询到用户信息',
                        icon: 'none',
                        duration: 2000//持续的时间
                    })
                    return false
                }
                // if(res.data.data.userType == 2 || 3 || 4) {
                //     let realNameone = res.data.data
                //     wx.setStorage(
                //         {
                //             key: "realNameone",
                //             data: realNameone
                //         })
                //     wx.showToast({
                //         title: '登录成功',
                //         icon: 'success',
                //         duration: 2000//持续的时间
                //     })

        
                //     setTimeout(function () {
                //         wx.switchTab({
                //             url: '/pages/index/index'
                //         })
                //         //要延时执行的代码
                //     }, 3000)
                // }
                if (res.data.data.userType == 1 ) {
                    let realNameone = res.data.data
                    wx.setStorage(
                        {
                            key: "realNameone",
                            data: realNameone
                        }
                    )
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000//持续的时间
                    })
      
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '/pages/mainuser/mainuser?role=管理员'
                        })
                        wx.setStorageSync('login', 'true')
                        //要延时执行的代码
                    }, 3000)
                    return false
                }
                if (res.data.data.userType == 2 || 3 || 4 & res.data.data.userState == 2) {
                    const realNameone = res.data.data
                    wx.setStorage(
                        {
                            key: "realNameone",
                            data: realNameone
                        }
                    )
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000//持续的时间
                    })
                    setTimeout(function () {
                        wx.switchTab({
                            url: '/pages/index/index?'
                        })
                        wx.setStorageSync('login', 'true')
                        //要延时执行的代码
                    }, 3000)

                    return false
                }
                if ( res.data.data.userState == 1) {
                    wx.showToast({
                        title: '您暂未通过审批',
                        icon: 'none',
                        duration: 2000//持续的时间
                    })
                    return false
                }
            }
        })
    }
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
                  if(res.data.data) {
                    if(res.data.data.attachment) {
                      // 获取图片
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
  },
  // onShow: function() {
  //   // 页面出现在前台时执行
  // },
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
  wx.navigateTo({
    url: '../login/login'
  })
},

notice: function() {
  wx.navigateTo({
    url: '../login/login'
  })
},
serviceApplication: function() {
  wx.navigateTo({
    url: '../login/login'
  })

},
vehicleManagement: function() {
  wx.navigateTo({
    url: '../login/login'
  })

},

   
})
