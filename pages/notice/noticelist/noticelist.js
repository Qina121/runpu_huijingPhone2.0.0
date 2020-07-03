Page({
    data: {
        date: "", //日期
        releaseTime: null,
        creatorName: null,
        descContent: null,
        browse: "", //浏览次数
        english:"ANNOUNCEMENT", //英文标题
        user: "", //作者
        titles: "通 知 公 告", //图片标题
        title:"",
        articlebody: "", // 文章标题
        artileimg: "", //文章图片
        firstartile: "", //上一篇公告
        endarticle: "",
        historylist:{}
        // historylist:[
        //     {
        //         textareatext:"为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐圾箱置于生活区及办公楼相关位置，但仍有少部分职工充耳不闻，依旧乱扔乱倒垃圾。为使职工及家属了解电池等危险固体废弃物的危害性，以便正确使用垃圾箱...",
        //         dates:"", 
        //         title:"公司已于近日在宿舍南门口设立垃圾回收站"
        //     }
        // ]
         //下一篇公告
    },
    onLoad: function (options) {
        console.log(options, "options");//输出的结果是  1
        var that = this;
        wx.request({
            url: 'https://api.huijingwuye6688.com/notice/selectOneById/'+options.id,
            method: "get",
            data: {
                // id: options.id
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    // historylist: res.data,
                    releaseTime: res.data.data.announceTime,
                    browse: res.data.data.views,
                    // user:res.data.user,
                    title:res.data.data.title,
                    descContent: res.data.data.content,
                    creatorName: res.data.data.creatorName,
                    // articlebody:res.data.articlebody,
                    // artileimg:res.data.artileimg
                })

            }
        })

 



        // wx.request({
        //     url: 'http://www.qy58.cn/cgi-bin/webjsoninterface.exe/query?tableName=notice',
        //     method: "get",
        //     data: {
        //         id: options.id
        //     },
        //     header: {
        //         'Content-Type': 'application/json'
        //     },
        //     success: function (res) {
        //         console.log(res)
        //         that.setData({
        //             historylist: res.data,
        //             // date: res.data.date,
        //             // browse: res.data.browse,
        //             // user:res.data.user,
        //             // title:res.data.title,
        //             // articlebody:res.data.articlebody,
        //             // artileimg:res.data.artileimg
        //         })

        //     }
        // })


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
    }
})