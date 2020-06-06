Page({
    data: {
        showsjifen: false,
        showsform: false,
        showsrfid: false,
        titlebig: "",
        englishTitle: "",
        smalltitle: "",
        showsforms: false,
        userintegral: 0,
        miaoshu: "",
        username: "",
        userphone: "",
        userlicense: "",
        startdata: "",
        enddata: "",
        showbutton: false
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载

        var that = this
        if (options.detailxinxi == "showsjifen") {
            that.setData({
                showsjifen: true,
                showsform: false,
                showsrfid: true,
                showsforms: false,
                showbutton: false,
                titlebig: "服 务 信 息",
                englishTitle: "SERVICE MANAGMENT"
            })
            wx.setNavigationBarTitle({ title: '服 务 管 理' })
        }
        if (options.detailxinxi == "showsform" & options.rfid == "show") {
            that.setData({
                showsjifen: false,
                showsform: true,
                showsrfid: true,
                showsforms: false,
                showbutton: true,
                titlebig: "车 辆 信 息",
                englishTitle: "",
                smalltitle: "停车信息"
            })
            wx.setNavigationBarTitle({ title: '车 辆 信 息' })

        }
        if (options.detailxinxi == "showsforms" & options.rfid == "hidden") {
            that.setData({
                showsjifen: false,
                showsform: false,
                showbutton: true,
                showsrfid: false,
                showsforms: true,
                titlebig: "车 辆 信 息",
                smalltitle: "事件信息",
                englishTitle: ""
            })
            wx.setNavigationBarTitle({ title: '事件上传' })

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
    bindTextAreaBlur: function (e) {
        console.log(e.detail.value)
    },
    uploader: function () {
        var that = this;
        let imagesList = [];
        let maxSize = 1024 * 1024;
        let maxLength = 3;
        let flag = true;
        wx.chooseImage({
            count: 6, //最多可以选择的图片总数
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 500
                })
                for (let i = 0; i < res.tempFiles.length; i++) {
                    if (res.tempFiles[i].size > maxSize) {
                        flag = false;
                        console.log(111)
                        wx.showModal({
                            content: '图片太大，不允许上传',
                            showCancel: false,
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                }
                            }
                        });
                    }
                }
                if (res.tempFiles.length > maxLength) {
                    console.log('222');
                    wx.showModal({
                        content: '最多能上传' + maxLength + '张图片',
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                console.log('确定');
                            }
                        }
                    })
                }
                if (flag == true && res.tempFiles.length <= maxLength) {
                    that.setData({
                        imagesList: res.tempFilePaths
                    })
                }
                console.log(res.tempFiles, "res.tempFiles")
                wx.uploadFile({
                    url: 'https://shop.gxyourui.cn',
                    filePath: res.tempFilePaths[0],
                    name: 'images',
                    header: {
                        "Content-Type": "multipart/form-data",
                        'Content-Type': 'application/json'
                    },
                    success: function (data) {
                        console.log(data);
                    },
                    fail: function (data) {
                        console.log(data);
                    }
                })
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        })
    },
    watchPhotoNumber: function (event) {
        console.log(event.detail.value);
        var phone = event.detail.value;
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            console.log("手机号码有误，请重填");
            return false;
        }
    },
    addintegral: function () {
        console.log(this.data.userintegral, "userintegral")
        this.data.userintegral++
        console.log(this.data.userintegral, "++")
        this.setData({
            userintegral: this.data.userintegral
        })
    },
    editintegral: function () {
        console.log(this.data.userintegral, "userintegral")
        this.data.userintegral--
        console.log(this.data.userintegral, "--")
        this.setData({
            userintegral: this.data.userintegral
        })
    },
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        // 车辆管理
        if (this.data.showsform == true) {
            console.log("车辆接口")
            if (e.detail.value.userphone == "") {
                wx.showToast({
                    title: '请输入电话',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false
            }
            if (!(/^1[3456789]\d{9}$/.test(e.detail.value.userphone))) {
                wx.showToast({
                    title: '手机号码有误',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false;
            }
            if (e.detail.value.username == "") {
                wx.showToast({
                    title: '请输入姓名',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false
            }
            if (e.detail.value.userlicense == "") {
                wx.showToast({
                    title: '请输入车牌',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false
            }
            if (this.data.startdata == "") {
                wx.showToast({
                    title: '请输入开始时间',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false
            }
            if (this.data.enddata == "") {
                wx.showToast({
                    title: '请输入结束时间',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false
            }
            if (this.data.startdata != "" & this.data.enddata != "") {
                this.tab(this.data.startdata, this.data.enddata);
                return false
            }
        }
        // 车辆接口
        if (this.data.showsjifen == true) {
            console.log("积分接口")
            // 接口+传值
            // this.data.miaoshu
            // this.data.userintegral
        }
        // 事件接口
        if (this.data.showsforms == true) {
            console.log("事件接口")
            if (e.detail.value.userlocation == "") {
                wx.showToast({
                    title: '请输入地址',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false
            }
            if (e.detail.value.userphones == "") {
                wx.showToast({
                    title: '请输入电话',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false
            }
            if (!(/^1[3456789]\d{9}$/.test(e.detail.value.userphones))) {
                wx.showToast({
                    title: '手机号码有误',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false;
            }
        }
    },
    bindDateChange: function (e) {
        this.setData({
            startdata: e.detail.value
        })
    },
    bindDateChangeend: function (e) {
        this.setData({
            enddata: e.detail.value
        })
    },
    tab: function (date1, date2) {
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);
        if (oDate1.getTime() > oDate2.getTime()) {
            wx.showToast({
                title: '开始时间不得大于结束时间',
                icon: 'none',
                duration: 2000//持续的时间
            })
        } else {
            console.log('第二个大');

        }
    }

}) 