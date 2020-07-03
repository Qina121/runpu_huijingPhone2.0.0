// component/uploadImages/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: { //最多选择图片的张数，默认9张
      type: Number,
      value: 3
    },
    uploadUrl: { //图片上传的服务器路径
      type: String,
      value: 'http://www.qy58.cn/cgi-bin/webUpLoad.exe/'
    },
    showUrl: { //图片的拼接路径
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    detailPics: [], //上传的结果图片集合
  },

  ready: function() {
    console.log(this.data)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    uploadDetailImage: function(e) { //这里是选取图片的方法
      var that = this;
      var pics = [];
      var detailPics = that.data.detailPics;
      if (detailPics.length >= that.data.count) {
        wx.showToast({
          title: '最多选择' + that.data.count + '张！',
        })
        return;
      }
      wx.chooseImage({
        count: that.data.count, // 最多可以选择的图片张数，默认3
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          console.log(res)
          var imgs = res.tempFilePaths;
          for (var i = 0; i < imgs.length; i++) {
            that.data.detailPics.push(imgs[i])
          }


          detailPics = that.data.detailPics
          that.setData({
            detailPics: that.data.detailPics
          })
          console.log(detailPics);
          var myEventDetail = {
            picsList: that.data.detailPics,
            res: res
          } // detail对象，提供给事件监听函数
          console.log(myEventDetail,"myEventDetail")
          var myEventOption = {} // 触发事件的选项
          that.triggerEvent('myevent', myEventDetail, myEventOption)//结果返回调用的页面

          // const tempFilePaths = res.tempFilePaths

          // Q注释然后在需要上传的文件中完成
          // wx.uploadFile({
          //   url: 'http://124.193.199.178:8085/attachment/uploadFiles1', //仅为示例，非真实的接口地址
          //   filePath: imgs[0],
          //   name: 'file',
          //   formData: {
          //     'file': detailPics
          //   },
          //   success (res){
          //     console.log(res);
          //     wx.showToast({
          //       title: '上传成功',
          //       icon: 'success',
          //       duration: 2000//持续的时间
          //   })
          //     console.log(res);
          //     //do something
          //   },fail (err){
          //     console.log(err);
          //     wx.showToast({
          //       title: '上传失败',
          //       icon: 'fail',
          //       duration: 2000//持续的时间
          //   })
          //   }
          // })

          // 取代上面的方法
          wx.uploadFile({
            url: 'https://api.huijingwuye6688.com/attachment/uploadFiles1',
            filePath: that.data.detailPics[0],
            name: 'file',
            formData: {
                file: res.tempFiles[0],
            },
            header: {
              'Content-Type': 'multipart/form-data',
            //   'content-type':'application/x-www-form-urlencoded' 
            },
            success: function (res) {
              console.log(res);
              const data = JSON.parse(res.data)
              console.log(data)
              
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000//持续的时间
              })
              var myEventDetail = {
                picsList: that.data.detailPics,
                data: res
              } // detail对象，提供给事件监听函数
              that.triggerEvent('myevent', myEventDetail, myEventOption)//结果返回调用的页面
            }, fail: function (err) {
              console.log()
            }
          })



          // console.log(res);
          // var detailPics = that.data.detailPics;
          // console.log(detailPics);
          // detailPics.push(detailPics)
          // that.setData({
          //   detailPics: detailPics
          // })
          
          // that.uploadimg({
          //   url: that.data.uploadUrl, //这里是你图片上传的接口
          //   path: pics, //这里是选取的图片的地址数组
          // });


 


        },
      })
    },
    //多张图片上传
    uploadimg: function(data) {
      console.log(data)
      wx.showLoading({
        title: '上传中...',
        mask: true,
      })
      var that = this,
        i = data.i ? data.i : 0,
        success = data.success ? data.success : 0,
        fail = data.fail ? data.fail : 0;
      wx.uploadFile({
        url: data.url,
        filePath: data.path[i],
        name: 'fileData',
        formData: null,
        success: (resp) => {
          // wx.hideLoading();
          success++;
          console.log(resp)
          var str = resp.data 
          console.log(resp,"上传结果")
          console.log(str,"赋值后结果")
          // JSON.parse(str);
          var pic = JSON.parse(str);
          console.log(str,"转对象后结果")
          console.log(typeof(str),"11")
          var pic_name = pic.path;
          var detailPics = that.data.detailPics;
          detailPics.push(pic_name)
          that.setData({
            detailPics: detailPics
          })
        },
        fail: (res) => {
          fail++;
          console.log(res);
          console.log('fail:' + i + "fail:" + fail);
        },
        complete: () => {
          i++;
          if (i == data.path.length) { //当图片传完时，停止调用     
            console.log('执行完毕');
            console.log('成功：' + success + " 失败：" + fail);
            var myEventDetail = {
              picsList: that.data.detailPics
            } // detail对象，提供给事件监听函数
            console.log(myEventDetail,"myEventDetail")
            var myEventOption = {} // 触发事件的选项
            that.triggerEvent('myevent', myEventDetail, myEventOption)//结果返回调用的页面
          } else { //若图片还没有传完，则继续调用函数
            data.i = i;
            data.success = success;
            data.fail = fail;
            that.uploadimg(data);//递归，回调自己
          }
        }
      });
    },

  }
})