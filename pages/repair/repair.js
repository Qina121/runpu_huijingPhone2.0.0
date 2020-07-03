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
        countPic: 3,//上传图片最大数量
        showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
        uploadImgUrl: 'http://www.qy58.cn/cgi-bin/webUpLoad.exe',//图片的上传的路径
        userId:"",
        name:"",
        address:"",
        phoneNumber:"",
        repairDesc:"",
        createTime:"",
        attachment:"",
        reapirState:1,
        realNameone:"",
        uploadImageId:[]
    },
    ready: function () {
        console.log(this.data)
    },
    myEventListener: function (e) {
        console.log("上传的图片结果集合")
        this.data.showImgUrl = e.detail.picsList
        // console.log( this.data.showImgUrl)
        const imgInfo = JSON.parse(e.detail.data.data)
        let imgIdArr = this.data.uploadImageId
        imgIdArr.push(imgInfo.data[0])
        this.setData({
            uploadImageId:imgIdArr
        })
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
            return false;
        }
    },
    formSubmit(e) {
        console.log(this.data,"data")
        var that = this
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if (e.detail.value.name == "") {
            wx.showToast({
                title: '请输入姓名',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        if (e.detail.value.creatTime == null) {
            wx.showToast({
                title: '请输入日期',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        if (e.detail.value.address == "") {
            wx.showToast({
                title: '请输入报修地址',
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
        if (e.detail.value.repairDesc == "") {
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
        //     //这里本应该是图片上传之后提交信息,暂时不做图片验证所以将代码写在外面
        // }

        console.log("报修请求发送")
            console.log(e,"e")
            var that = this;
            this.setData({
                realNameone: wx.getStorageSync('realNameone'),
            })
            wx.request({
                url: 'https://api.huijingwuye6688.com/repairInfo/insert',
                method: "post",
                header: {
                    // 'Content-Type': 'application/json'
                    'Content-Type':"application/x-www-form-urlencoded"
                },
                data: {
                    name : e.detail.value.name,
                    address: e.detail.value.address,
                    userId:this.data.realNameone.id,
                    phoneNumber:e.detail.value.phoneNumber,
                    repairDesc:e.detail.value.repairDesc,
                    createTime:e.detail.value.creatTime,
                    attachment:this.data.uploadImageId,
                    reapirState:this.data.reapirState,
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