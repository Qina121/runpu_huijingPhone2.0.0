Page({
    data: {
        userimg: "../../../image/userimg.png",
        minename: "",
        minegender: "男",
        mineaddresses: "503门牌",
        minephone: "15394598336",
        minedizhi: "北京市西城区",
        town: '',
        village:''
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        console.log(options, "options")
        const userInfo = wx.getStorageSync('realNameone')
        console.log(userInfo)
        let str = userInfo.commonAddress
        // let usercommonAddress = userInfo.commonAddress

        // if(str) {
        //     const index=str.lastIndexOf("\-");
        //     console.log(index)
        //     if(index == -1) {
        //         str = '无'
        //     } else {
        //         str=str.substring(index+1,str.length);
        //     }
            
        // } else {
        //     str = '无'
        //     usercommonAddress = '无'
        // }
        let town = ''
        let village = ''
        if(userInfo.town) {
            town = userInfo.town
        }
        if(userInfo.village) {
            village = userInfo.village
        }
        this.setData({
            userimg: userInfo.headImage,
            minename:userInfo.realName,
            minegender: '',
            mineaddresses:str,
            minephone:userInfo.phoneNumber,
            // minedizhi:usercommonAddress,
            minedizhi:userInfo.commonAddress,
            town: town,
            village: village
        })
        wx.request({
            // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/query?tableName=owner&queryString=ownername="' + e.detail.value.username + '" and ownerphone="' + e.detail.value.userphone + '"',
            url: 'https://www.qy58.cn/cgi-bin/webjsoninterface.exe/querys',
            method: "POST",
            dataType: "JSON",
            // 'Content-Type': 'application/json;charset:utf-8'
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "charset": 'utf-8'
            },
            data: {
                queryString: "id=5",
                tableName: "userInfo",
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
            }

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
    // 更换头像
    changeimg: function () {
   
  
  
    },
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)

        if (e.detail.value.minename == "") {
            wx.showToast({
                title: '请输入姓名',
                icon: 'none',
                duration: 2000//持续的时间
            })

            return false;
        }
        if (e.detail.value.minegender == "") {
            wx.showToast({
                title: '请输入性别',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        }
        if (e.detail.value.minegender != "男" || e.detail.value.minegender != "女") {

        } else {
            wx.showToast({
                title: '请重新输入',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        }
        if (e.detail.value.mineaddresses == "") {
            wx.showToast({
                title: '请输入门牌号',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        }
        if (e.detail.value.minedizhi == "") {
            wx.showToast({
                title: '请输入地址',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        } else {
            wx.showModal({
                title: '提示',
                content: '确定保存更改?',
                success: function (res) {
                    if (res.confirm) {//这里是点击了确定以后
                        console.log('用户点击确定')
                        wx.request({
                            // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/query?tableName=owner&queryString=ownername="' + e.detail.value.username + '" and ownerphone="' + e.detail.value.userphone+'"',
                            // url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/common?tableName=owner',
                            method: "get",
                            data: {
                                ownername: e.detail.value.minename,
                                ownername: e.detail.value.minegender,
                                ownername: e.detail.value.mineaddresses,
                                ownername: e.detail.value.minedizhi,
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
                                // wx.navigateTo({
                                //     url: '/pages/notice/noticelist/noticelist?date=' + res.data.date + 
                                //     '&browse='+res.data.browse + '&user='+res.data.user  
                                //     + '&title='+res.data.title + '&articlebody=' + res.data.title + 
                                //     '&articlebody=' + res.data.articlebody + '&artileimg=' +res.data.artileimg
                                // })
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
                    } else {//这里是点击了取消以后
                        console.log('用户点击取消')
                    }
                }
            })
            var that = this;
            // var owneruser = {}
            // owneruser.ownername = e.detail.value.username
            // owneruser.userphone = e.detail.value.userphone
            // console.log(owneruser, owneruser)

        }

    },
    // formReset(e) {
    //     console.log('form发生了reset事件，携带数据为：', e.detail.value)
    //     this.setData({

    //     })
    //   }
    cancel() {
        wx.switchTab({
            url: '../../mine/mine'
        });
    }
})