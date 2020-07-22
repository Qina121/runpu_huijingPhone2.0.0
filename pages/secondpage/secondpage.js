
var app = getApp();
Page({
    onShareAppMessage() {
        return {
            title: 'form',
            path: "pages/shopping/shopping"
        }
    },
    data: {
        api: app.globalData.api,
        pickerHidden: true,
        chosen: '',
        imagesList: [],
        bigtitle: "垃 圾 分 类",
        english: "GARBAGE CLASSIFICATION",
        location: "",
        userId: "",
        phoneNumber: "",
        details: "",
        attachment: "",
        userType: "",
        realName: "",
        auditState: 1,
        creatTime: "",
        realNameone: "",
        countPic: 3,//上传图片最大数量
        showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
        uploadImageId: [],
        uploadImgUrl: 'http://www.qy58.cn/cgi-bin/webUpLoad.exe'//图片的上传的路径
    },
    onload(options) {
        wx.setNavigationBarTitle({ title: '垃圾分类' })
    },
    onready: function () {

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
        var phone = event.detail.value.phoneNumber;
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            return false;
        }
    },
    formSubmit(e) {
        console.log(this.data, "data")
        var that = this
        
        this.setData({
            realNameone: wx.getStorageSync('realNameone'),
        })
        console.log(this.data, "data")
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if (e.detail.value.location == "") {
            wx.showToast({
                title: '请输入地址',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        // if (e.detail.value.creatTime == null) {
        //     wx.showToast({
        //         title: '请输入日期',
        //         icon: 'none',
        //         duration: 2000//持续的时间
        //     })
        //     return false
        // }
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
        if (e.detail.value.describes == "") {
            wx.showToast({
                title: '请输入问题描述',
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
        // } else {
        //     console.log("服务请求发送")
        //     console.log(e, "e")
        //     console.log(this.data.realNameone,"realNameone")
      
        // }
        wx.request({
            url: that.data.api+'garbageClassfy/insert',
            method: "post",
            header: {
                // 'Content-Type': 'application/json'
                'Content-Type': "application/x-www-form-urlencoded"
            },
            data: {
                location: e.detail.value.location,
                userId: this.data.realNameone.id,
                phoneNumber: e.detail.value.phoneNumber,
                details: e.detail.value.details,
                attachment: this.data.uploadImageId,
                // createTime: e.detail.value.creatTime,
                auditState: this.data.auditState,
                realName: this.data.realNameone.realName
            },
            success: function (res) {
                // console.log(res.data, "222")
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
                console.log(error, "error")
            }
        })

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
    myEventListener: function (e) {
        console.log("上传的图片结果集合")
        this.data.showImgUrl = e.detail.picsList
        // console.log(e)



        const imgInfo = JSON.parse(e.detail.data.data)
        console.log(imgInfo)
        let imgIdArr = this.data.uploadImageId
        imgIdArr.push(imgInfo.data[0])
        console.log(imgIdArr)
        this.setData({
            uploadImageId:imgIdArr
        })
        
      
        // 测试结束

        //第一次提交给后台图片地址
        
    },
})