Page({
    data: {
        imgUrls: '../../image/userimg.png',
        userimg: '../../image/minefenshu.png',
        showshenpi: false,
        realNameone:"",
        username:"",
        usertypes:""
    },
    onLoad: function (options) {
        // 判断是否登录
        // if(!wx.getStorageSync('login')) {
        //     wx.navigateTo({
        //       url: '../login/login'
        //     })
        //   }
        // 生命周期函数--监听页面加载
        wx.setNavigationBarTitle({ title: '我的' })
        this.data.realNameone = wx.getStorageSync('realNameone')
        if(this.data.realNameone.userType === 2) {
            this.setData({
                showshenpi: true
            })
        } else {
            this.setData({
                showshenpi:false
            })
        }
        console.log(this.data.realNameone,"this.data.realNameone")
        if(this.data.realNameone.userType == 1) {
            this.setData({
                usertypes:"管理员" ,
                username:this.data.realNameone.realName
            })
        }
        if(this.data.realNameone.userType == 2) {
            this.setData({
                usertypes:"业主" ,
                username:this.data.realNameone.realName
            })
        }
        if(this.data.realNameone.userType == 3) {
            this.setData({
                usertypes:"住户" ,
                username:this.data.realNameone.realName
            })
        }
        if(this.data.realNameone.userType == 4) {
            this.setData({
                usertypes:"租户" ,
                username:this.data.realNameone.realName
            })
        }
        //console.log(e.detail.value.username);


        // this.setData({imgUrls: '../../image/minefenshu.png' })
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
    changeimg: function (e) {
        console.log(e, "e")
    },
    
})