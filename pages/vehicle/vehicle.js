Page({
    onShareAppMessage() {
        return {
            title: 'form',
            path: "pages/shopping/shopping"
        }
    },

    data: {
        pickerHidden: true,
        chosen: '',
        images: [],
        bigtitle:"车 辆 管 理",
        username:"",
        userphone:"",
        userHouse:"",
        userlicense:"",
        startdata:"",
        enddata:"",
        miaoshu:""
    },
    onload(options) {
        $init(this)
    },
    pickerConfirm(e) {
        this.setData({
            pickerHidden: true
        })
        this.setData({
            chosen: e.detail.value
        })
    },

    pickerCancel() {
        this.setData({
            pickerHidden: true
        })
    },

    pickerShow() {
        this.setData({
            pickerHidden: false
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
                console.log(res.tempFiles,"res.tempFiles")
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
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
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
            if (e.detail.value.userHouse  == "") {
                wx.showToast({
                    title: '请输入门牌号',
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
            if (this.data.miaoshu == "") {
                wx.showToast({
                    title: '请输入详细信息',
                    icon: 'none',
                    duration: 2000//持续的时间
                })
                return false
            }
            if (this.data.startdata != "" & this.data.enddata != "") {
                this.tab(this.data.startdata, this.data.enddata);
                return false
            }
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    formReset(e) {
        console.log('form发生了reset事件，携带数据为：', e.detail.value)
        this.setData({
            chosen: ''
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

})