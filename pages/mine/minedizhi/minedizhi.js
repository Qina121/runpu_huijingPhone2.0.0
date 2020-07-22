Page({
    data: {
        showtable: false,
        showsphone: true,
        updateminephone: "",
        showtablephones: true,
        updatephones: "",
        updateminephone: "13439556604",
        optionsph: "",
        phones: "",
        sendTime: '获取验证码',
        sendColor: '#333',
        snsMsgWait: 60,
        smsFlag:false,
        maindizhi:"北京市 市辖市 西城区",
        xiangxi:"北京市西城区车公庄"
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            phones: options.minephone,
        })

        var that = this
        if (options.detailxinxi == "dizhi") {
            that.setData({
                showtable: true,
                showsphone: false,
                xiangxi:options.minedizhi
            })
        }
        if (options.detailxinxi == "phonenumber") {
            that.setData({
                showtable: false,
                showsphone: true
            })
        }
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
    watchPhotoNumber: function (event) {
        console.log(event, "event")
    },
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if(this.data.showtable == true) {
            if (e.detail.value.phones == "") {
                wx.showToast({
                    title: '请输入所在地区',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false;
            }
            if (e.detail.value.phones == "") {
                wx.showToast({
                    title: '请输入详细地址',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false;
            }else {
                wx.showModal({
                    title: '提示',
                    content: '确定更改地址?',
                    success: function (res) {
                      if (res.confirm) {//这里是点击了确定以后
                        console.log('用户点击确定')
                        wx.request({
                            // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/query?tableName=owner&queryString=ownername="' + e.detail.value.username + '" and ownerphone="' + e.detail.value.userphone+'"',
                            // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/common?tableName=owner',
                            method: "get",
                            data: {
                                ownername : e.detail.value.minename,
                                ownername : e.detail.value.minegender,
                                ownername : e.detail.value.mineaddresses,
                                ownername : e.detail.value.minedizhi,
                                // ownerphone : e.detail.value.userphone
                                // owneruser
                            },
                            header: {
                                'Content-Type': 'application/json'
                            },
                            success: function (res) {
                                console.log(res.data)
                                // that.data.date = res.data.date
                                // that.data.browse = res.data.browse
                                // that.data.user = res.data.user
                                // that.data.title = res.data.title
                                // that.data.articlebody = res.data.articlebody
                                // that.data.artileimg = res.data.artileimg
                                
                                wx.showToast({
                                    title: '修改地址成功',
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
                      } else {//这里是点击了取消以后
                        console.log('用户点击取消')
                      }
                    }
                  })
            }
        }else {
            if (e.detail.value.phones == "") {
                wx.showToast({
                    title: '请输入手机号',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false;
            }
            if (!(/^1[3456789]\d{9}$/.test(e.detail.value.phones))) {
                wx.showToast({
                    title: '手机号码有误,请重新输入',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false;
            }if (e.detail.value.yanzhengma == "") {
                wx.showToast({
                    title: '请输入验证码',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false;
            }else {
                var that = this;
                // var owneruser = {}
                // owneruser.ownername = e.detail.value.username
                // owneruser.userphone = e.detail.value.userphone
                // console.log(owneruser, owneruser)
                wx.request({
                    // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/query?tableName=owner&queryString=ownername="' + e.detail.value.username + '" and ownerphone="' + e.detail.value.userphone+'"',
                    // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/common?tableName=owner',
                    method: "get",
                    data: {
                        // ownername : e.detail.value.username,
                        // ownerphone : e.detail.value.userphone
                        // owneruser
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data)
                        // that.data.date = res.data.date
                        // that.data.browse = res.data.browse
                        // that.data.user = res.data.user
                        // that.data.title = res.data.title
                        // that.data.articlebody = res.data.articlebody
                        // that.data.artileimg = res.data.artileimg
                        wx.showToast({
                            title: '修改成功',
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
})