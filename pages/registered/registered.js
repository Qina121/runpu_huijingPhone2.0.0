Page({
    data: {
        items: [
            { value: 'residents', name: '住户', checked: 'true' },
            { value: 'administrator', name: '管理员' },
            { value: 'tenant', name: '租户' },
        ],
        showtable: true,
        showyan: true,
        hiddenyan: false,
        registereds: {},
        phonenumber: "",
        sendTime: '获取验证码',
        sendColor: '#333',
        snsMsgWait: 60,
        smsFlag: false,
        userType: 4
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        wx.setNavigationBarTitle({
            title: '注册',
          })
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
        console.log(111)
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
    radioChange(e) {
        const items = this.data.items
        for (let i = 0, len = items.length; i < len; ++i) {
            items[i].checked = items[i].value === e.detail.value
        }
        if (e.detail.value == "administrator") {
            var that = this;
            that.setData({
                showtable: (!that.data.showtable),
                userType: 1
            })
            console.log(this.data.showtable)
        }
        if (e.detail.value == "residents") {
            var that = this;
            that.setData({
                showtable: true,
                userType: 3
            })
            console.log(this.data.showtable)

        }
        if (e.detail.value == "tenant") {
            var that = this;
            that.setData({
                showtable: true,
                userType: 4
            })
            console.log(this.data.showtable)

        }
        console.log(this.data, "data")
    },
    formSubmit(e) {
        console.log(this.data.userType, "type")
        var phone = e.detail.value.phoneNumber;

        if (this.data.userType == 1) {
            if (e.detail.value.username == "") {
                wx.showToast({

                    title: '请输入您的真实姓名',

                    icon: 'none',

                    duration: 2000//持续的时间

                })
                return false;

            }
            if (phone == "") {
                wx.showToast({

                    title: '请输入手机号',

                    icon: 'none',

                    duration: 2000//持续的时间

                })
                return false;
            }
            if (!(/^1[3456789]\d{9}$/.test(phone))) {
                wx.showToast({

                    title: '手机号码有误,请重新输入',

                    icon: 'none',

                    duration: 2000//持续的时间

                })
                return false;
            }
            wx.request({
                url: 'https://api.huijingwuye6688.com/userInfo/insertManage',
                method: "post",
                data: {
                    realName: e.detail.value.username,
                    // commonAddress: e.detail.value.commonAddress,
                    phoneNumber: e.detail.value.phoneNumber,
                },
                header: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': "application/x-www-form-urlencoded"

                },
                success: function (res) {
                    console.log(res.data)
                    if(res.data.success == false) {
                        wx.showToast({
                                    title: '注册失败,请检查账号信息是否填写错误',
                                    icon: 'none',
                                    duration: 2000//持续的时间
                                })
                    }else {
                        wx.showToast({
                                    title: '注册成功,请等待审批完成',
                                    icon: 'none',
                                    duration: 2000//持续的时间
                                }) 
                    }

                }

            })
            return false
        }

        if (this.data.userType === 2 || 3 || 4) {
            if (e.detail.value.username == "") {
                wx.showToast({

                    title: '请输入您的真实姓名',

                    icon: 'none',

                    duration: 2000//持续的时间

                })
                return false;

            }
            if (phone == "") {
                wx.showToast({

                    title: '请输入手机号',

                    icon: 'none',

                    duration: 2000//持续的时间

                })
                return false;
            }
            if (!(/^1[3456789]\d{9}$/.test(phone))) {
                wx.showToast({

                    title: '手机号码有误,请重新输入',

                    icon: 'none',

                    duration: 2000//持续的时间

                })
                return false;
            }
            var that = this;
            wx.request({
                url: 'https://api.huijingwuye6688.com/userInfo/insert',
                method:"post",
                data: {
                    realName: e.detail.value.username,
                    commonAddress: e.detail.value.commonAddress,
                    phoneNumber: e.detail.value.phoneNumber,
                    userType: this.data.userType,
                    // street: e.detail.value.street,
                    // town: e.detail.value.town,
                    // village: e.detail.value.village,
                    // usertype: that.data.usertype
                },
                header: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': "application/x-www-form-urlencoded"

                },
                success: function (res) {
                    console.log(res.data)
                    if (res.data.message == 1) {
                        wx.showToast({
                            title: '您为业主,可直接登录',
                            icon: 'none',
                            duration: 2000//持续的时间
                        })
                    }
                    if (res.data.message == 2) {
                        wx.showToast({
                            title: '未找到您的信息,请找相关管理人员处理',
                            icon: 'none',
                            duration: 2000//持续的时间
                        })
                    }
                    if (res.data.message == 3) {
                        wx.showToast({
                            title: '注册成功,请等待审批',
                            icon: 'none',
                            duration: 2000//持续的时间
                        })
                    }
                    if (res.data.message == 4) {
                        wx.showToast({
                            title: '选择角色错误,请重新选择',
                            icon: 'none',
                            duration: 2000//持续的时间
                        })
                    }
                    if (res.data.message == 5) {
                        wx.showToast({
                            title: '账号已注册,请等待审批完成',
                            icon: 'none',
                            duration: 2000//持续的时间
                        })
                    }

                }
            })


            return false;
        }


    },
    showyanz: function () {
        console.log(555)
        var that = this;
        that.setData({
            showyan: false,
            hiddenyan: true
        })
    },

})