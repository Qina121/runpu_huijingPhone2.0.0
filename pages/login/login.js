const app = getApp()
Page({
    data: {
        username: "",
        userphone: "",
        loginbg: "http://www.qy58.cn/upload/loginbg.png",
        userId: "333",
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        userInfo: "",
        hasUserInfo: false,
        avatarUrl:""
    },
    onload: function () {
        console.log(111)
        wx.getSetting({
            success: function (res) {
                console.log(res,"res")
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res.userInfo, "111")
                            //用户已经授权过
                        }
                    })
                }
            }
        })
    },
    getUserInfo(e) {
        if (!e.detail.userInfo) {
            console.log(5)
            return
        } else {
            console.log(6)
            console.log(e.detail.userInfo.avatarUrl,"e.detail.userInfo")
            this.setData({
                avatarUrl: e.detail.userInfo.avatarUrl,
                hasUserInfo: true
            })
            console.log(this.data,"data")
        }
    },
    bindGetUserInfo: function (e) {
        console.log(e.detail.userInfo)
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
        } else {
            //用户按了拒绝按钮
        }
    },
    
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
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        var phone = e.detail.value.userphone;
        if (e.detail.value.username == "") {
            wx.showToast({
                title: '请输入您的真实姓名',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        } else if (phone == "") {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        } else if (!(/^1[3456789]\d{9}$/.test(phone))) {
            wx.showToast({
                title: '手机号码有误,请重新输入',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        } else {
            var that = this;
            var jsons = {
                realName: e.detail.value.username,
                phoneNumber: e.detail.value.userphone
            }
            // owneruser.ownername = e.detail.value.username
            // owneruser.userphone = e.detail.value.userphone
            // console.log(owneruser, owneruser)
            console.log(e.detail.value.username, "e.detail.value.username")
            console.log(e.detail.value.userphone, " e.detail.value.userphone")
            wx.request({
                // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/post?tableName=owner&queryString=ownername="' + e.detail.value.username + '" and ownerphone="' + e.detail.value.userphone+'"',
                url: 'http://192.168.1.110:8084/userInfo/insert',
                // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/query',
                method: "post",
                // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/common?tableName=owner',
                header: {
                    // 'Content-Type': 'application/json'
                    'Content-Type':"application/x-www-form-urlencoded"
                },
                // data: {
                //     ownername : e.detail.value.username,
                //     ownerphone : e.detail.value.userphone
                // },
                data: JSON.stringify(jsons),
                success: function (res) {
                    console.log(res.data, "222")
                    // that.data.date = res.data.date
                    // that.data.browse = res.data.browse
                    // that.data.user = res.data.user
                    // that.data.title = res.data.title
                    // that.data.articlebody = res.data.articlebody
                    // that.data.artileimg = res.data.artileimg
                    // wx.navigateTo({
                    //     url: '/pages/notice/noticelist/noticelist?date=' + res.data.date + 
                    //     '&browse='+res.data.browse + '&user='+res.data.user  
                    //     + '&title='+res.data.title + '&articlebody=' + res.data.title + 
                    //     '&articlebody=' + res.data.articlebody + '&artileimg=' +res.data.artileimg
                    // })
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000//持续的时间
                    })
                    wx.setStorage(
                        {
                            key:"userxinxi",
                            data:res.data
                        },{
                        key: "userid",
                        data: res.data
                    })
                    setTimeout(function () {

                        wx.switchTab({
                            url: '/pages/index/index?role=管理员'
                        })
                        //要延时执行的代码
                    }, 1000)


                },
                error: function (error) {
                    console.log(error)
                }

            })

            // 判断匹配则显示正在审批 没有账号跳转到注册 有账号直接进入主页面
            //     wx.switchTab({
            //     url: "/pages/index/index"
            //  })
        }

    },
})