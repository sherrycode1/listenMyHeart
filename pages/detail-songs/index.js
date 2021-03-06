import {
  rankingStore
} from "../../store/index"

// pages/detail-songs/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking: "",
    rankingInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type
    if (type === "menu") {

    } else if (type === "rank") {
      const ranking = options.ranking
      this.setData({ ranking})
      //  1.获取数据
      rankingStore.onState(ranking, this.getRankingDataHandler)
    }

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    rankingStore.offState(this.data.ranking, this.getRankingDataHandler)
  },
  getRankingDataHandler: function (res) {
    this.setData({
      rankingInfo: res
    })
  }

})