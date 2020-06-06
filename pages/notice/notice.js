Page({
    data:{
        date:"", 
        allDetail:{},
        // 详情页数据
        users:"",
        titles:"",
        articlebodys:"",
        artileimgs:"",
        textareatext:"为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐圾箱置于生活区及办公楼相关位置，但仍有少部分职工充耳不闻，依旧乱扔乱倒垃圾。为使职工及家属了解电池等危险固体废弃物的危害性，以便正确使用垃圾箱...",
        historylist:[
            {
                textareatext:"为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐圾箱置于生活区及办公楼相关位置，但仍有少部分职工充耳不闻，依旧乱扔乱倒垃圾。为使职工及家属了解电池等危险固体废弃物的危害性，以便正确使用垃圾箱...",
                dates:"", //日期
                title:"公司已于近日在宿舍南门口设立垃圾回收站"
            },
            {
                textareatext:"为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐圾箱置于生活区及办公楼相关位置，但仍有少部分职工充耳不闻，依旧乱扔乱倒垃圾。为使职工及家属了解电池等危险固体废弃物的危害性，以便正确使用垃圾箱...",
                dates:"", //日期
                title:"1公司已于近日在宿舍南门口设立垃圾回收站"
            }
        ]
    },
    onLoad:function(options){
        // 生命周期函数--监听页面加载
        wx.setNavigationBarTitle({ title:'通知公告'})
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
    lookdetail(e) {
                var that = this;
                // wx.request({
                //     url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/query?tableName=notice',
                //     method: "get",
                //     data: {
                //        id:1
                //     },
                //     header: {
                //         'Content-Type': 'application/json'
                //     },
                //     success: function (res) {
                        // console.log(res.data)
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
                        wx.navigateTo({
                                url: '/pages/notice/noticelist/noticelist?id=1'
                            })
                        
                    // }
                // })
                
            return false;


    },
})