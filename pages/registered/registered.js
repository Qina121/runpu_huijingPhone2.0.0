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
        usertype: "tenant",
        registereds: {},
        phonenumber: "",
        sendTime: '获取验证码',
        sendColor: '#333',
        snsMsgWait: 60,
        smsFlag:false
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
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
    sendCode: function () {
        // 60秒后重新获取验证码
        console.log("yanzhengma")
        var inter = setInterval(function () {
            this.setData({
                smsFlag: true,
                sendColor: '#cccccc',
                sendTime: this.data.snsMsgWait + 's后重发',
                snsMsgWait: this.data.snsMsgWait - 1
            });
            if (this.data.snsMsgWait < 0) {
                clearInterval(inter)
                this.setData({
                    sendColor: '#333',
                    sendTime: '获取验证码',
                    snsMsgWait: 60,
                    smsFlag: false
                });
            }
        }.bind(this), 1000);
    },
    radioChange(e) {
        const items = this.data.items
        for (let i = 0, len = items.length; i < len; ++i) {
            items[i].checked = items[i].value === e.detail.value
        }
        if (e.detail.value == "administrator") {
            var that = this;
            that.setData({
                showtable: (!that.data.showtable)
            })
            console.log(this.data.showtable)
        } else if (e.detail.value == "residents" || e.detail.value == "tenant") {
            var that = this;
            that.setData({
                showtable: true
            })
            console.log(this.data.showtable)

        }
        that.data.residents = e.detail.value
    },
    formSubmit(e) {
        var phone = e.detail.value.phonenumber;
        if (e.detail.value.username == "") {
            wx.showToast({

                title: '请输入您的真实姓名',

                icon: 'none',

                duration: 2000//持续的时间

            })
            return false;

        } 
        // else if (e.detail.value.validation == "") {
        //     wx.showToast({

        //         title: '请输入验证码',

        //         icon: 'none',

        //         duration: 2000//持续的时间

        //     })
        //     return false;
        // }
        else if (this.data.showtable == true) {
            if (e.detail.value.town == "" || e.detail.value.village == "" || e.detail.value.street == "") {
                wx.showToast({

                    title: '请输入详细地址',

                    icon: 'none',

                    duration: 2000//持续的时间

                })
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
            }else {
                var that = this;
                wx.request({
                    url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/common',
                    data: {
                        addresses: e.detail.value.addresses,
                        phonenumber: e.detail.value.phonenumber,
                        street: e.detail.value.street,
                        town: e.detail.value.town,
                        username: e.detail.value.username,
                        village: e.detail.value.village,
                        usertype: that.data.usertype
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data)
                        wx.showToast({
                            title: '请等待审批',
                            icon: 'success',
                            duration: 2000//持续的时间
                        })
                        setTimeout(function () {
                            wx.switchTab({
                                url: '/pages/index/index?role=管理员'
                            })
                            //要延时执行的代码
                           }, 1000)
                        

                    }
                })
            }
            return false;
        } else {
            // e.detail.value == ""
            // 判断匹配则显示正在审批 没有账号跳转到注册 有账号直接进入主页面
            //     wx.switchTab({
            //     url: "/pages/index/index"
            //  })
            var that = this;
            console.log(777)
            wx.switchTab({
                url: '/pages/index/index'
            })
            console.log(e.detail.value.username, "e.value.username")
            var ccc = {
            }
            ccc.username = e.detail.value.username
            ccc.phonenumber = e.detail.value.phonenumber
            ccc.usertype = that.data.usertype
            
            // wx.request({
            //     url: 'http://www.qy58.cn/cgi/webjsoninterface.exe/common',
            //     method: "get",
            //     data: {
            //         logindetails
            //     },
            //     header: {
            //         'content-type': 'application/json' // 默认值
            //     },
            //     success: function (res) {
            //         console.log(res.data)
            //         console.log(997887)
            //     },
            //     error: function (rep) {
            //         console.log(rep)
            //     }
            // })

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