Page({
    data:{
        // fuwuimg:"https://www.qy58.cn/upload/fuwu.png",
        // carguanliimg:"https://www.qy58.cn/upload/carguanli.png",
        // shijian:"https://www.qy58.cn/upload/shijian.png",
        fuwuimg:"https://api.huijingwuye6688.com/api/file/wxe09ab78e32c1cde1.o6zAJswoSVnxow4vnHVOonlp0XuA.WhdXrhjbY9woe605316a2c68b896b9e00a753bc54d41.png",
        carguanliimg:"https://api.huijingwuye6688.com/api/file/wxe09ab78e32c1cde1.o6zAJswoSVnxow4vnHVOonlp0XuA.zXRQGKfvnc8y0a6c4bac1b63b00466afa9b2989edd84.png",
        shijian:"https://api.huijingwuye6688.com/api/file/wxe09ab78e32c1cde1.o6zAJswoSVnxow4vnHVOonlp0XuA.ii0txX00MjCpd5a560a1fc3e1eca499ca75f4012cda6.png",
        
    },
    onLoad:function(options){
    wx.setNavigationBarTitle({ title: '汇景恒福物业服务' })

        // 生命周期函数--监听页面加载
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