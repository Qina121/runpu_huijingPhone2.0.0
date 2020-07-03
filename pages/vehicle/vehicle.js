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
        userId:"",
        applyUser:"",
        phoneNumber:"",
        houseNumber:"",
        statrtTime:"",
        endTime:"",
        applyDesc:"",
        auditState:1,
        createTime:"",
        plateNumber:"",
        realNameone:""
    },
    onload(options) {
        wx.setNavigationBarTitle({ title: '车辆' })
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
    myEventListener: function (e) {
        console.log("上传的图片结果集合")
        this.data.showImgUrl = e.detail.picsList
        console.log( this.data.showImgUrl)
    },
    formSubmit(e) {
        console.log(this.data,"data")
        var that = this
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if (e.detail.value.applyUser == "") {
            wx.showToast({
                title: '请输入姓名',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        if (e.detail.value.phoneNumber == "") {
            wx.showToast({
                title: '请输入联系电话',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        if (!(/^1[3456789]\d{9}$/.test(e.detail.value.phoneNumber))) {
            wx.showToast({
                title: '手机号码有误,请重新输入',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        }
        if (e.detail.value.houseNumber == "") {
            wx.showToast({
                title: '请输入门牌号',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        if (e.detail.value.plateNumber == "") {
            wx.showToast({
                title: '请输入车牌号',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        if (e.detail.value.statrtTime == null) {
            wx.showToast({
                title: '请输入开始时间',
                icon: 'none',
                duration: 2000//持续的时间
            })
            
            return false;
        }
        if (e.detail.value.endTime == null) {
            wx.showToast({
                title: '请输入结束时间',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        }
        if (e.detail.value.applyDesc == "") {
            wx.showToast({
                title: '请输入申请说明',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        }

        // if (this.data.showImgUrl == "") {
        //     wx.showToast({
        //         title: '请上传图片',
        //         icon: 'none',
        //         duration: 2000//持续的时间
        //     })
        //     return false;
        // }
         else {
            this.tab()
            console.log("车辆请求发送")
            console.log(e,"e")
            var that = this;
            this.setData({
                realNameone: wx.getStorageSync('realNameone'),
            })
            console.log(this.data, "data")
            wx.request({
                url: 'https://api.huijingwuye6688.com/vehicleManager/insert',
                method: "post",
                header: {
                    // 'Content-Type': 'application/json'
                    'Content-Type':"application/x-www-form-urlencoded"
                },
                data: {
                    applyUser : e.detail.value.applyUser,
                    userId:this.data.realNameone.id,
                    phoneNumber:e.detail.value.phoneNumber,
                    houseNumber:e.detail.value.houseNumber,
                    statrtTime:e.detail.value.statrtTime,
                    endTime:e.detail.value.endTime,
                    applyDesc:e.detail.value.applyDesc,
                    auditState:this.data.auditState,
                    plateNumber:e.detail.value.plateNumber,
                    createTime:e.detail.value.statrtTime,
                    realName: this.data.realNameone.realName
                },
                success: function (res) {
                    console.log(res.data, "222")
                    wx.showToast({
                        title: '上传成功',
                        icon: 'success',
                        duration: 2000//持续的时间
                    })
                    setTimeout(function () {
                        wx.switchTab({
                            url: '/pages/index/index'
                        })
                        //要延时执行的代码
                    }, 2000)
                },
                error: function (error) {
                    console.log(error,"error")
                }
            })
        }
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
            statrtTime: e.detail.value
        })
    },
    bindDateChangeend: function (e) {
        this.setData({
            endTime: e.detail.value
        })
    },

})