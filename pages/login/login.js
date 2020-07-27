const app = getApp()
Page({
    data: {
        api: app.globalData.api,
        username: "",
        userphone: "",
        loginbg: "https://www.qy58.cn/upload/loginbg.png",
        userId: "333",
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        userInfo: "",
        hasUserInfo: false,
        avatarUrl: "",
        isShow: false,
        canIuse: false,
        userxinxi: {},
        //遮罩层
        showView: false,
        nameValue:'',
        phoneValue:''
    },
    onLoad: function () {
        var that = this
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            //用户已经授权过
                            that.setData({
                                isShow: true
                            })
                        }, error: function () {
                            that.setData({
                                isShow: true
                            })
                        }
                    })
                }
            }
        })
        //判断是否用户之前是否登录
        const LoginInfo = wx.getStorageSync('realNameone')
        if(LoginInfo) {
            that.setData({
                nameValue:LoginInfo.realName,
                phoneValue:LoginInfo.phoneNumber
            })
            that.formSubmit() 
        }
    },
    // bindGetUserInfo: function (e) {
    //     if (e.detail.userInfo) {
    //         //用户按了允许授权按钮
    //     } else {
    //         //用户按了拒绝按钮
    //     }
    // },
    onReady: function () {
        // 生命周期函数--监听页面初次渲染完成

    },
    onShow: function () {
        // 生命周期函数--监听页面显示
    },
    onHide: function () {
        // 生命周期函数--监听页面隐藏
    },
    onUnload: function () {
        // 生命周期函数--监听页面卸载
    },
    onPullDownRefresh: function () {
        // 页面相关事件处理函数--监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            path: 'path' // 分享路径
        }
    },
    formSubmit(e) {
        const that = this
        // var phone = e.detail.value.userphone;

        let userInfoName = that.data.nameValue
        let userInfoPhone = that.data.phoneValue
        if (userInfoName == "") {
            wx.showToast({
                title: '请输入您的真实姓名',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        } else if (userInfoPhone == "") {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        } else if (!(/^1[3456789]\d{9}$/.test(userInfoPhone))) {
            wx.showToast({
                title: '手机号码有误,请重新输入',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        } else {

            wx.request({
                // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/post?tableName=owner&queryString=ownername="' + e.detail.value.username + '" and ownerphone="' + e.detail.value.userphone+'"',
                // url: 'http://124.193.199.178:8085/userInfo/selectLogin',// 原来的
                url: that.data.api +'userInfo/selectLogin', //测试服务器接口地址
                // url: 'http://192.168.1.110:8084/userInfo/insert',
                // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/query',
                method: "get",
                // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/common?tableName=owner',
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

    },
    doNotMove: function() {
        return;    
    },
    change: function() {
        let that = this;
        that.setData({
            showView: (!that.data.showView)
        })
    },
    goregistered: function() {
        wx.navigateTo({
            url: '/pages/registered/registered'
        })
    },
    watchPhotoNumber(e) {
        this.setData({
            phoneValue: e.detail.value
        })
    },
    watchNameValue(e) {
        this.setData({
            nameValue: e.detail.value
        })
    }
})