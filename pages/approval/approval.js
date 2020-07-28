const app = getApp()
Page({
    data:{
        api: app.globalData.api,
        showsshenpi:true,
        showsmall:false,
        showsshenqing:true,
        showscheliang:true,
        showsrapair:"",
        smalllefttitle:"",
        jump:"",
        // articletitle:"配置可分类的垃圾桶, 请各部门员工积极配合按垃圾分类标准来处置各类垃圾。",
        // articledate:"2020/05/20",
        historylist:[]

    },
    onLoad:function(options){
        // 生命周期函数--监听页面加载
        var that = this
        if(options.detailxinxi == "showsshenpi") {
            that.setData({
                showsshenpi: true,
                showsmall:true,
                // showsshenqing:false,
                // showscheliang:false,
                // showsrapair:false,
                jump:"showsshenpi",
                titlebig:"我 的 审 批",
                smalllefttitle:"审批",
                englishTitle:"SERVICE MANAGMENT"
            })
            wx.setNavigationBarTitle({ title:'我的审批'})
            wx.request({
                url: that.data.api +'auditInfo/getAuditInfo',
                method: "get",
                header: {
                    'Content-Type': 'application/json'
                    // 'Content-Type':"application/x-www-form-urlencoded"
                },
                data: {
                   userId:wx.getStorageSync('realNameone').id
                },
                success: function (res) {
                    console.log(res)
                    that.setData({
                        historylist : res.data.data
                    })

                },
                error: function (error) {
                    console.log(error,"error")
                }

            })
        }
        if(options.detailxinxi == "showsshenqing") {
            that.setData({
                showsmall:false,
                showsshenpi: true,
                // showsshenqing:true,
                // showscheliang:false,
                // showsrapair:false,
                titlebig:"我 的 申 请",
                smalllefttitle:"申请",
                englishTitle:"",
                jump:"showsshenqing",
            })
            wx.setNavigationBarTitle({ title:'我的申请'})
            // console.log(wx.getStorageSync('realNameone'),"wx.getStorageSync('realNameone')")
            wx.request({
                url: that.data.api +'garbageClassfy/selectRelated',
                
                method: "get",
                header: {
                    'Content-Type': 'application/json'
                    // 'Content-Type':"application/x-www-form-urlencoded"
                },
                data: {
                   userId:wx.getStorageSync('realNameone').id
                },
                success: function (res) {
                    that.setData({
                        historylist : res.data.data
                    })

                },
                error: function (error) {
                    console.log(error,"error")
                }

            })

        }
        if(options.detailxinxi == "showscheliang") {
            that.setData({
                showsshenpi: true,
                showsmall:false,
                // showsshenqing:false,
                // showscheliang:true,
                // showsrapair:false,
                titlebig:"我 的 车 辆",
                smalllefttitle:"车辆",
                englishTitle:"",
                jump:"showscheliang",
            })
            wx.setNavigationBarTitle({ title:'我的车辆'})
            wx.request({
                url: that.data.api +'vehicleManager/selectRelated',
                method: "get",
                header: {
                    'Content-Type': 'application/json'
                    // 'Content-Type':"application/x-www-form-urlencoded"
                },
                data: {
                    userId:wx.getStorageSync('realNameone').id
                },
                success: function (res) {
                    that.setData({
                        historylist : res.data.data
                    })
                    console.log(that.data.historylist, "222")

                },
                error: function (error) {
                    console.log(error,"error")
                }

            })
        }
        if(options.detailxinxi == "showsrapair") {
            that.setData({
                showsshenpi: true,
                showsmall:false,
                // showsshenqing:false,
                // showscheliang:false,
                // showsrapair:true,
                titlebig:"我 的 报 修",
                smalllefttitle:"报修",
                englishTitle:"",
                jump:"showsrapair",
            })
            wx.setNavigationBarTitle({ title:'我的报修'})
            wx.request({
                url: that.data.api +'repairInfo/selectRelated',
                method: "get",
                header: {
                    'Content-Type': 'application/json'
                    // 'Content-Type':"application/x-www-form-urlencoded"
                },
                data: {
                    userId:wx.getStorageSync('realNameone').id
                },
                success: function (res) {
                    that.setData({
                        historylist : res.data.data
                    })
                    console.log(that.data.historylist, "222")

                },
                error: function (error) {
                    console.log(error,"error")
                }

            })
        }
    },
    onReady:function(){
        // 生命周期函数--监听页面初次渲染完成
    },
    onShow:function(){
        // 生命周期函数--监听页面显示
    },
    onHide:function(){
        // 生命周期函数--监听页面隐藏
    },
    onUnload:function(){
        // 生命周期函数--监听页面卸载
    },
    onPullDownRefresh: function() {
        // 页面相关事件处理函数--监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
          title: 'title', // 分享标题
          desc: 'desc', // 分享描述
          path: 'path' // 分享路径
        }
    },
    jumpxinxi: function(e) {
        console.log(this.data.jump,"jump")
        const  item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: '/pages/repair/repairdetail/repairdetail?detailxinxi=' + this.data.jump+'&id='+item.id+'&userId='+item.userId,
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },
    approved: function(item) {
        const that = this
        console.log(item.currentTarget.dataset.item)
        const detailItem = item.currentTarget.dataset.item
        if(detailItem.userState == 2) {
            wx.showToast({
                title: '已通过',
                icon: 'none',
                duration: 2000//持续的时间
            })
            return false
        }
        wx.request({
            url: that.data.api +'auditInfo/updateAuditInfor',
            method: "get",
            header: {
                'Content-Type': 'application/json'
                // 'Content-Type':"application/x-www-form-urlencoded"
            },
            data: {
            //    id:wx.getStorageSync('realNameone').id,
            //    userId:detailItem.id,
               realName:detailItem.realName,
               userState:2,
               phoneNumber:detailItem.phoneNumber

            },
            success: function (res) {
                console.log(res)
                //通过之后刷新
                wx.request({
                    url: that.data.api +'auditInfo/getAuditInfo',
                    method: "get",
                    header: {
                        'Content-Type': 'application/json'
                        // 'Content-Type':"application/x-www-form-urlencoded"
                    },
                    data: {
                       userId:wx.getStorageSync('realNameone').id
                    },
                    success: function (res) {
                        console.log(res)
                        that.setData({
                            historylist : res.data.data
                        })
    
                    },
                    error: function (error) {
                        console.log(error,"error")
                    }
    
                })

            },
            error: function (error) {
                console.log(error,"error")
            }

        })
    }
})