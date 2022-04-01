// pages/detail-video/detail-video.js
import {
  getMVURL,
  getMVDetail,
  getRelatedVideo
} from '../../pages/service/api_video'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvURLInfo: {},
    mvDetail:{},
    relatedVideos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // get page id 
    const id = options.id
    // get page data
    this.getPageDate(id)
    //  other methods
  },
  getPageDate(id){
    // 1.请求播放地址
    getMVURL(id).then(res => {
      this.setData({ mvURLInfo:res.data })
      
    })
    // 2.请求视频信息
    getMVDetail(id).then(res => {
      this.setData({ mvDetail:res.data })
    })
    // 3.请求相关视频
    getRelatedVideo(id).then(res => {
      this.setData({ relatedVideos: res.data })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})