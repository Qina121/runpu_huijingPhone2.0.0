Page({
    data:{
        date:"2020.05.30",
        browse:"345",
        user:"张张",
        titlebig:"",
        showsshenpi:"",
        showsbaoxiu:"",
        showscar:"",
        showsshenqing:""
    },
    onLoad:function(options){
        // 生命周期函数--监听页面加载
        console.log(options,"options")
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