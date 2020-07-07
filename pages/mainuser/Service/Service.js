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
        uploadRFID:"",
        userxnix:"",
        userId:"",
        machineCode:"",
        detailss: "",
        username: "",
        userphone: "",
        userlicense: "",
        startdata: "",
        enddata: "",
        sbumitPhoneNumber: '',
        showbutton: false,
        countPic: 3,//上传图片最大数量
        showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
        uploadImageId: [],
        uploadImgUrl: 'http://www.qy58.cn/cgi-bin/webUpLoad.exe',//图片的上传的路径,
        pic_array: [],
        pic_index: 0,
        pic_number: 0,
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

        // 初始化服务管理中积分的区间
        let arr = [];
        for(let i = 0; i < 100; i++) {
            arr.push(i.toString())
        }
        that.setData({
            pic_array : arr
        })
    },
    myEventListener: function (e) {
        console.log("上传的图片结果集合")
        this.data.showImgUrl = e.detail.picsList
        // console.log(this.data.showImgUrl)
        const imgInfo = JSON.parse(e.detail.data.data)
        console.log(imgInfo)
        let imgIdArr = this.data.uploadImageId
        imgIdArr.push(imgInfo.data[0])
        console.log(imgIdArr)
        this.setData({
            uploadImageId:imgIdArr
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
    bindTextAreaBlur: function (e) {
        console.log(e.detail.value)
    },
    watchPhotoNumber: function (event) {
        console.log(event.detail.value);
        this.setData({sbumitPhoneNumber:event.detail.value})
        var phone = event.detail.value;
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
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
    // rfid
    uploadRFID: function() {
        var that = this
        console.log(this.data,"data")
        this.setData({
            userId: wx.getStorageSync('realNameone').id,
        })
        wx.request({
            url: 'https://api.huijingwuye6688.com/rfidInfo/select',
            method: "get",
            header: {
                // 'Content-Type': 'application/json'
                'Content-Type': "application/x-www-form-urlencoded"
            },
            data: {
                userId: this.data.userId
            },
            success: function (res) {
                
                that.setData({
                    userxnix: res.data.data
                })
                console.log(that.data.userxnix,"xinxi")
                wx.showToast({
                    title: '查询成功',
                    icon: 'success',
                    duration: 2000//持续的时间
                })
                // setTimeout(function () {
                //     wx.switchTab({
                //         url: '/pages/index/index'
                //     })
                //     //要延时执行的代码
                // }, 2000)
            },
            error: function (error) {
                console.log(error, "error")
            }
        })
    },

    //uploadimg改方法暂时没用到
    uploadimg: function() {
        var showImgUrlStr = this.data.showImgUrl.join(",");
        showImgUrlStr = showImgUrlStr.slice(7);
        console.log(showImgUrlStr);
        // wx.showLoading({
        //   title: '上传中...',
        //   mask: true,
        // })
        var that = this;
        //   i = data.i ? data.i : 0,
        //   success = data.success ? data.success : 0,
        //   fail = data.fail ? data.fail : 0;
        wx.uploadFile({
          url: 'https://api.huijingwuye6688.com/attachment/uploadFiles1',
          filePath: showImgUrlStr,      
          header: {
            // 'content-type': 'application/json'
            // 'content-type':"application/x-www-form-urlencggoded;charset=UTF-8"
            'content-type':'application/x-www-form-urlencoded' 
        },  
          name: 'fileData',
          formData: null,
          success: (resp) => {
            // wx.hideLoading();
            // success++;
            console.log(resp)
         
            console.log(resp,"上传结果")
      
           
          },
          fail: (res) => {
            // fail++;
            console.log(res);
            // console.log('fail:' + i + "fail:" + fail);
          },
         
        });
      },

    //服务管理 图片 立即上传   /////上传图片时 已经提交了  所以这里只提示成功就好了  
    uploadImgArr:function(){
        console.log(this.data.showImgUrl);
        if(this.data.showImgUrl.length > '0'){
            wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000//持续的时间
            })
        } else {
            wx.showToast({
                title: '请上传图片',
                icon: 'fail',
                duration: 2000//持续的时间
            })
             return;
        }
        console.log(this.data.showImgUrl);
        const imgurl = this.data.showImgUrl[0]
        if(this.data.showImgUrl.length != '0' && this.data.showImgUrl != ''){
            var showImgUrlStr = this.data.showImgUrl.join(",");
            showImgUrlStr = showImgUrlStr.slice(7);
            console.log(showImgUrlStr);
            // var myFormData = new FormData();
            // myFormData.append('file',showImgUrlStr);
            const myFormData = {
                file:showImgUrlStr
            }
            console.log(myFormData)
            // wx.request({
            //     url: 'http://192.168.1.110:8085/attachment/uploadFiles1',
            //     method: "POST",
            //     header: {
            //         // 'content-type': 'application/json'
            //         // 'content-type':"application/x-www-form-urlencggoded;charset=UTF-8"
            //         'content-type':'application/x-www-form-urlencoded' 
            //     },      
            //     data: 
            //         myFormData,
                
            //     success: function (res) {
            //         console.log(res, "这个是图片第一次上传之后返回的数据")
            //         if(res.statusCode == '200'){
            //             wx.showToast({
            //                 title: '上传成功',
            //                 icon: 'success',
            //                 duration: 2000//持续的时间
            //             })
            //         } else {
            //             wx.showToast({
            //                 title: '上传失败',
            //                 icon: 'fail',
            //                 duration: 2000//持续的时间
            //             })
            //         }
                    
            //     },
            //     fail: (res) => {
            //         console.log(res);
            //       }
            // })
            console.log(imgurl)
            console.log('触发我的图片上传')
            wx.uploadFile({
                url: 'https://api.huijingwuye6688.com/attachment/uploadFiles1',
                filePath: showImgUrlStr,      
                header: {
                //   'content-type': 'application/json'
                //   'content-type':"application/x-www-form-urlencggoded;charset=UTF-8"
                //   'content-type':'application/x-www-form-urlencoded' 
                'Content-Type': 'multipart/form-data',
              },  
                name: 'fileData',
                formData: null,
                
                success: (resp) => {
                  // wx.hideLoading();
                  // success++;
                  console.log(resp)
               
                  console.log(resp,"上传结果")
            
                 
                },
                fail: (res) => {
                  // fail++;
                  console.log(res);
                  // console.log('fail:' + i + "fail:" + fail);
                },
               
              });
        } else {
            wx.showToast({
                title: '请上传图片',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false;
        }

        
    },

    // 车辆管理上传//评分
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        console.log(e.detail.value.userlicense)
        const that = this
        // 积分接口
        if (this.data.showsjifen == true) {
            console.log(that.data)
            console.log("积分接口")
            // 接口+传值
            // this.data.miaoshu
            // this.data.userintegral
            wx.request({
                url: 'https://api.huijingwuye6688.com/serviceManagement/insert',
                method: "post",
                header: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': "application/x-www-form-urlencoded"
                },
                data: {
                    rfidInfo:that.data.userxnix.rfid,
                    userId:that.data.userxnix.userId,
                    attachment: that.data.uploadImageId.join(","),
                    details:this.data.descdetailss,
                    score:that.data.pic_number,
                    // score:that.data.userintegral,
                    //details: this.data.detailss
                    // rfidInfo: e.detail.value.creatTime,
                    // auditState: this.data.auditState,
                    // realName: this.data.realNameone.realName

                },
                success: function (res) {
                    console.log(res.data, "222")
                    wx.showToast({
                        title: '上传成功',
                        icon: 'success',
                        duration: 2000//持续的时间
                    })
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '/pages/mainuser/mainuser'
                        })
                        
                        //要延时执行的代码
                    }, 1000)
                }
            })
        }
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
            // if (this.data.startdata != "" & this.data.enddata != "") {
            //     this.tab(this.data.startdata, this.data.enddata);
            //     return false
            // }
            wx.request({
                url: 'https://api.huijingwuye6688.com/carManagement/insert',
                // url: 'http://192.168.1.110:8085/vehicleManager/insert',
                method: "post",
                header: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                // data: {
                //     location: e.detail.value.location,
                //     userId: wx.getStorageSync('realNameone').userOwnerId,
                //     phoneNumber: this.data.sbumitPhoneNumber,
                //     details: e.detail.value.details,
                //     attachment: this.data.showImgUrl,
                //     createTime: e.detail.value.creatTime,
                //     auditState: this.data.auditState,
                //     realName: wx.getStorageSync('realNameone').realName,
                //     details:this.data.descdetailss
                // },
                data: {
                    // location: e.detail.value.location,
                    applyId: wx.getStorageSync('realNameone').id,
                    applyUser: wx.getStorageSync('realNameone').realName,
                    userName: e.detail.value.username,
                    phoneNumber: that.data.sbumitPhoneNumber,
                    // houseNumber: '',
                    attachment: that.data.uploadImageId.join(","),
                    // createTime: e.detail.value.creatTime,
                    // auditState: that.data.auditState,
                    startTime: that.data.startdata,
                    endTime: that.data.enddata,
                    details:that.data.descdetailss,
                    carCard: e.detail.value.userlicense,
                    rfidInfo: that.data.userxnix.rfid,
                    parkingTime: '',
                },
                success: function (res) {
                    console.log(res.data, "222")
                    wx.showToast({
                        title: '上传成功',
                        icon: 'success',
                        duration: 2000//持续的时间
                    })
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '/pages/mainuser/mainuser'
                        })
                        
                        //要延时执行的代码
                    }, 1000)
                },
                error: function (error) {
                    console.log(error, "error")
                }
            })

        }
        
        // 事件接口
        if (this.data.showsforms == true) {
            console.log("事件接口")
            console.log(this.data.descdetailss)
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

            wx.request({
                url: 'https://api.huijingwuye6688.com/eventsUpload/insertEventsUpload',
                method: "post",
                header: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                data: {
                    uploadId:wx.getStorageSync('realNameone').id,
                    location: e.detail.value.userlocation,
                    userId: wx.getStorageSync('realNameone').userOwnerId,
                    phoneNumber: that.data.sbumitPhoneNumber,
                    // details: e.detail.value.details,
                    attachment: that.data.uploadImageId.join(","),
                    createTime: e.detail.value.creatTime,
                    // auditState: this.data.auditState,
                    realName: wx.getStorageSync('realNameone').realName,
                    eventDescription:that.data.descdetailss
                },
                success: function (res) {
                    console.log(res.data, "222")
                    wx.showToast({
                        title: '上传成功',
                        icon: 'success',
                        duration: 2000//持续的时间
                    })
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '/pages/mainuser/mainuser'
                        })
                        //要延时执行的代码
                    }, 1000)
                },
                error: function (error) {
                    console.log(error, "error")
                }
            })
        }
    },
    bindDateChange: function (e) {
        this.setData({
            startdata: e.detail.value
        })
        console.log(this.data.startdata)
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
    },
    bindTextdescBlur: function(e) {
        console.log(e.detail.value)
        this.setData({descdetailss:e.detail.value})
    },
    inputgetName: function(e) {
        console.log(e.detail.value)
        this.setData({descdetailss:e.detail.value})
    },
    bindNumberChange: function(e) {
        // console.log(e)
        this.setData({
            pic_number: e.detail.value
        })
        // console.log(this.data.pic_number)
    }


}) 