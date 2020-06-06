Page({
    data:{
        showsshenpi:true,
        showsmall:false,
        showsshenqing:"",
        showscheliang:"",
        showsrapair:"",
        smalllefttitle:"",
        jump:"",
        articletitle:"配置可分类的垃圾桶, 请各部门员工积极配合按垃圾分类标准来处置各类垃圾。",
        articledate:"2020/05/20",
        historylist:[
            {
                textareatext:"为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐圾箱置于生活区及办公楼相关位置，但仍有少部分职工充耳不闻，依旧乱扔乱倒垃圾。为使职工及家属了解电池等危险固体废弃物的危害性，以便正确使用垃圾箱...",
                dates:"2020/05/20", //日期
                title:"公司已于近日在宿舍南门口设立垃圾回收站"
            },
            {
                textareatext:"为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐为减少危险废弃物对生活环境的危害，共建美好家园，创建和谐圾箱置于生活区及办公楼相关位置，但仍有少部分职工充耳不闻，依旧乱扔乱倒垃圾。为使职工及家属了解电池等危险固体废弃物的危害性，以便正确使用垃圾箱...",
                dates:"2020/05/20", //日期
                title:"1公司已于近日在宿舍南门口设立垃圾回收站"
            }
        ]

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
    jumpxinxi: function() {
        console.log(this.data.jump,"jump")
        wx.navigateTo({
            url: '/pages/repair/repairdetail/repairdetail?detailxinxi=' + this.data.jump,
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
    }
})