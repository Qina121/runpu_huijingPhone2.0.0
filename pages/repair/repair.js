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
        detailPics: [],
        bigtitle: "报 修",
        historylist: [
            {
                textareatext: "为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐圾箱置于生活区及办公楼相关位置，但仍有少部分职工充耳不闻，依旧乱扔乱倒垃圾。为使职工及家属了解电池等危险固体废弃物的危害性，以便正确使用垃圾箱...",
                dates: "", //日期
                title: "公司已于近日在宿舍南门口设立垃圾回收站"
            },
            {
                textareatext: "为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐圾箱置于生活区及办公楼相关位置，但仍有少部分职工充耳不闻，依旧乱扔乱倒垃圾。为使职工及家属了解电池等危险固体废弃物的危害性，以便正确使用垃圾箱...",
                dates: "", //日期
                title: "1公司已于近日在宿舍南门口设立垃圾回收站"
            }
        ],
        username: "",
        repairaddress: "",
        userphone: "",
        miaoshu: "",
        countPic: 3,//上传图片最大数量
        showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
        uploadImgUrl: 'http://www.qy58.cn/cgi-bin/webUpLoad.exe'//图片的上传的路径

    },
    ready: function () {
        console.log(this.data)
    },
    myEventListener: function (e) {
        console.log("上传的图片结果集合")
        console.log(e.detail.picsList)
    },
    onload(options) {
        wx.setNavigationBarTitle({ title: '报修' })

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
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if (e.detail.value.username == "") {
            wx.showToast({
                title: '请输入姓名',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        if (e.detail.value.repairaddress == "") {
            wx.showToast({
                title: '请输入地址',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        if (e.detail.value.userphone == "") {
            wx.showToast({
                title: '请输入联系电话',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        if (e.detail.value.repairaddress == "") {
            wx.showToast({
                title: '请输入联系电话',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        if (!(/^1[3456789]\d{9}$/.test(e.detail.value.userphone))) {
            wx.showToast({
                title: '手机号码有误,请重新输入',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        }
        if (e.detail.value.miaoshu == "") {
            wx.showToast({
                title: '请输入问题描述',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        }
        if (this.data.images == "") {
            wx.showToast({
                title: '请上传图片',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        } else {
            console.log("报修请求发送")
            wx.request({
                // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/common',
                data: {
                    addresses: e.detail.value.username,
                    phonenumber: e.detail.value.repairaddress,
                    street: e.detail.value.userphone,
                    town: e.detail.value.miaoshu,
                    username: e.detail.value.username,
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    console.log(res.data)
                    wx.showToast({
                        title: '已发送申请',
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
    

})