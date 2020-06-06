
var app = getApp();
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
        imagesList: [],
        bigtitle: "垃 圾 分 类",
        english: "GARBAGE CLASSIFICATION",
        location: "",
        phoneNumber: "",
        describes: "",
        uploadImg: "",
        creat_time: ""
    },
    onload(options) {
        app.editTabBar();
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
        var phone = event.detail.value.phoneNumber;
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            return false;
        }
    },
    uploader: function () {
        var that = this;
        let maxSize = 1024 * 1024;
        let maxLength = 3;
        let flag = true;
        wx.chooseImage({
            count: 6, //最多可以选择的图片总数
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                const tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths)
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 500
                })
                for (let i = 0; i < res.tempFiles.length; i++) {
                    if (res.tempFiles[i].size > maxSize) {
                        flag = false;
                        wx.showModal({
                            content: '图片太大，不允许上传',
                            showCancel: false,
                            success: function (res) {
                                if (res.confirm) {
                                }
                            }
                        });
                    }
                }
                if (res.tempFiles.length > maxLength) {
                    wx.showModal({
                        content: '最多能上传' + maxLength + '张图片',
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                            }
                        }
                    })
                }
                if (res.tempFiles.length <= maxLength) {
                    that.setData({
                        imagesList: res.tempFilePaths
                    })
                }
                console.log(that.data.imagesList, "imagesList")
                wx.uploadFile({
                    url: 'http://www.qy58.cn/upload.htm',
                    filePath: res.tempFilePaths[0],
                    name: 'imagesList',
                    header: {
                        "Content-Type": "multipart/form-data",
                        'Content-Type': 'application/json'
                    },
                    success: function (data) {
                        console.log(data, "data");
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
        var that = this
        console.log(that.data)
        // if (e.detail.value.location == "") {
        //     wx.showToast({
        //         title: '请输入地址',
        //         icon: 'none',
        //         duration: 2000//持续的时间
        //     })
        //     return false
        // }
        // if (e.detail.value.phoneNumber == "") {
        //     wx.showToast({
        //         title: '请输入手机号',
        //         icon: 'none',
        //         duration: 2000//持续的时间
        //     })
        //     return false
        // }
        // if (!(/^1[3456789]\d{9}$/.test(e.detail.value.phoneNumber))) {
        //     wx.showToast({
        //         title: '手机号码有误',
        //         icon: 'none',
        //         duration: 2000//持续的时间
        //     })
        //     return false;
        // }
        // 差上传图片
        if (e.detail.value.describes == "") {
            wx.showToast({
                title: '请输入描述信息',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        } else {
            var timestamp = Date.parse(new Date());
            var date = new Date(timestamp);
            //获取年份  
            var Y = date.getFullYear();
            //获取月份  
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            //获取当日日期 
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            this.data.creat_time = Y + '-' + M + '-' + D
            console.log(this.data.creat_time, "this.data.creat_time")
            console.log(e.detail.value.phoneNumber)
            // var ccc = [
            //     location= e.detail.value.location,
            //     phone_number= e.detail.value.phoneNumber,
            //     details= e.detail.value.describes,
            //     creat_time= this.data.creat_time,
            //     user_id=131313,
            //     attachment= "",
            //     real_name="小明",
            //     audit_state=1
            // ]
            wx.request({
                // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/query?tableName=owner&queryString=ownername="' + e.detail.value.username + '" and ownerphone="' + e.detail.value.userphone + '"',
                url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/add',
                method: "POST",
                dataType: "JSON",
                header: {
                    // 'Content-Type': 'application/json;charset:utf-8'
                    header: {
                         'Content-Type': 'application/x-www-form-urlencoded',
                         "charset" :'utf-8'
                        },
                },
                data: {
                    // location: "'" +e.detail.value.location + "'",
                    // 查询
                    // queryString:"id=1",
                    tableName: "userInfo",
                    // 添加
                    // location: e.detail.value.location,
                    // phoneNumber: e.detail.value.phoneNumber,
                    // describes: e.detail.value.describes,
                    // creatTime:this.data.creat_time,
                    // userId: 131313,
                    // attachment:"",
                    // realName:"xiaoming"
                    // 新增数据
                    // id="",
                    headImage: "http://www.qy58.cn/upload/userimg.png",
                    realName: "张三a",
                    phoneNumber: "13190250707a",
                    commonAddress: "北京市西城区5号线终点a",
                    createTime: "2020-01-01a",
                    userState: "不需审批a",
                    userType: "业主a",
                },
                success: function (res) {
                    console.log(res.data)
                    // that.data.date = res.data.date
                    // wx.navigateTo({
                    //     url: '/pages/notice/noticelist/noticelist?date=' + res.data.date + 
                    //     '&browse='+res.data.browse + '&user='+res.data.user  
                    //     + '&title='+res.data.title + '&articlebody=' + res.data.title + 
                    //     '&articlebody=' + res.data.articlebody + '&artileimg=' +res.data.artileimg
                    // })
                    wx.showToast({
                        title: '上传成功',
                        icon: 'success',
                        duration: 2000//持续的时间
                    })
                    // setTimeout(function () {
                    //     wx.navigateBack({
                    //         url: '/pages/index/index',
                    //         duration: 2000//持续的时间
                    //     })
                    //要延时执行的代码
                    // }, 1000)


                }

            })
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
    }
})