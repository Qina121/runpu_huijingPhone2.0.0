Page({
    data:{
        titlebig:"",
        showsshenpi:"",
        showsbaoxiu:"",
        showscar:"",
        showsshenqing:"",
        historylist:{}
    },
    onLoad:function(options){
        // 生命周期函数--监听页面加载
        console.log(options,"options")
        // const dataId = wx.getStorageSync('realNameone').id
        // const dataOwnId = wx.getStorageSync('realNameone').userOwnerId
         const dataId = options.id
        const dataOwnId = options.userId
        var that = this
        if(options.detailxinxi == "showsrapair") {
            that.setData({
                showsbaoxiu: true,
                showsshenpi: false,
                showscar:false,
                showsshenqing:false,
                titlebig:"我 的 报 修",
                englishTitle:"REPAIR"
            })
            wx.setNavigationBarTitle({ title:'报修详情'})
            wx.request({
                url: 'https://api.huijingwuye6688.com/repairInfo/select',
                method: "get",
                header: {
                    'Content-Type': 'application/json'
                    // 'Content-Type':"application/x-www-form-urlencoded"
                },
                data: {
                //    userId:options.userId,
                //    id:options.id

                        userId:dataOwnId,
                        id:dataId
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
        if(options.detailxinxi == "showsshenpi") {
            that.setData({
                showsbaoxiu: false,
                showsshenpi:true,
                showscar:false,
                showsshenqing:false,
                titlebig:"我 的 审 批",
                englishTitle:"HARBAGE CLASSIFICATION"
            })
            wx.setNavigationBarTitle({ title:'审批详情'})
            wx.request({
                url: 'https://api.huijingwuye6688.com/userInfo/selectOneApproval',
                method: "get",
                header: {
                    'Content-Type': 'application/json'
                    // 'Content-Type':"application/x-www-form-urlencoded"
                },
                data: {
                //    userId:wx.getStorageSync('realNameone').userOwnerId,
                //    id:options.wx.getStorageSync('realNameone').id

                // userId:dataOwnId,
                id:dataId
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
        if(options.detailxinxi == "showsshenqing") {
            that.setData({
                showsbaoxiu: false,
                showsshenpi:false,
                showscar:false,
                showsshenqing:true,
                titlebig:"我 的 申 请",
                englishTitle:"HARBAGE CLASSIFICATION"
            })
            wx.setNavigationBarTitle({ title:'申请详情'})
            wx.request({
                url: 'https://api.huijingwuye6688.com/garbageClassfy/selectOne',
                method: "get",
                header: {
                    'Content-Type': 'application/json'
                    // 'Content-Type':"application/x-www-form-urlencoded"
                },
                data: {
                    // userId:wx.getStorageSync('realNameone').userOwnerId,
                    // id:options.wx.getStorageSync('realNameone').id

                    userId:dataOwnId,
                    id:dataId
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
        if(options.detailxinxi == "showscheliang") {
            that.setData({
                showsbaoxiu: false,
                showsshenpi:false,
                showscar:true,
                showsshenqing:false,
                titlebig:"我 的 车 辆",
                englishTitle:"VEHICLE MANAGEMENT"
            })
            wx.setNavigationBarTitle({ title:'车辆详情'})
            wx.request({
                url: 'https://api.huijingwuye6688.com/vehicleManager/select',
                method: "get",
                header: {
                    'Content-Type': 'application/json'
                    // 'Content-Type':"application/x-www-form-urlencoded"
                },
                data: {
                //    userId:options.userId,
                //    id:options.id

                userId:dataOwnId,
                id:dataId
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
    }
})