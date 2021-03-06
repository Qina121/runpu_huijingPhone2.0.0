const app = getApp()
Page({
    data:{
        api: app.globalData.api,
        bgimgurl:"../../image/Integration-background.png",
        jifenDataList: [],
        totalPoints: 0,
    },
    onLoad:function(options){
        wx.setNavigationBarTitle({ title:'我的积分'})
        // 生命周期函数--监听页面加载
        const that = this
        console.log(wx.getStorageSync('realNameone'))
        const realNameone = wx.getStorageSync('realNameone')
        console.log(realNameone.userOwnerId)
        wx.request({
            url: that.data.api +'scoreLogs/selectScoredById',
            method: "get",
            data: {
                userId: realNameone.id
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    jifenDataList: res.data.data,
    
                })
                //默认是10分
                let score = 10
                for(let i = 0; i<that.data.jifenDataList.length; i++) {
                    score += that.data.jifenDataList[i].score
                }
                that.setData({
                    totalPoints: score,
        
                })

            }
        })

      
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