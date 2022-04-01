// pages/home-video/index.js
import  { getTopMv } from '../service/api_video'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMvs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getTopMvData(0)    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh:function () {
    this.getTopMvData(0)
  },
  //seal request methods
  async getTopMvData(offset) {
    // if request
    if(!this.data.hasMore) return
    // loading animation
    wx.showNavigationBarLoading()
    // request
    
    const res = await getTopMv(offset)
    let newData = this.data.topMvs
    if(offset === 0) {
      newData = res.data 
    }else{
      newData = newData.concat(res.data)
    }
    
    // set
    this.setData({  topMvs: newData  })
    this.setData({ hasMore: res.hasMore})
  
    // wx.hideNavigationBarLoading()
     wx.hideNavigationBarLoading()
     if(offset === 0 ){    
      wx.stopPullDownRefresh()
    }
  },
  //  seal event methods
  handleVideoItemClick(event){
    const id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail-video/detail-video?id=' + id,
    })
    
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.hasMore) return
    this.getTopMvData(this.data.topMvs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})