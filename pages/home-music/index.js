// pages/home-music/index.js
import { rankingStore } from '../../store/index'

import queryRect from '../utils/query-rect'
import {  getBanners } from '../../service/aip_music'
Page({

  data: {
    swiperHeight: 60,
    banners: [],
  },

  onLoad: function (options) {
    // 发起共享数据请求
    rankingStore.dispatch("getRankingDataAction")

    // 从store获取共享数据
    rankingStore.onState("hotRanking", res => {
      if(!res.tracks) return
      const recommandSongs = res.tracks.slice(0,6)
      this.setData({ recommandSongs })
      console.log(this.data.recommandSongs);
    })
    // 网络请求
    getBanners().then(res => {
      this.setData({
        banners: res.banners
      })
    })
  },
  // event
  handleSearchClick(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  handleSwiperLoaded() {
    // 拿组件的高度
    queryRect(".swiper-image").then(res => {
      const rectHeight = res[0].height // #the-id节点的上边界坐标
      this.setData({ swiperHeight: rectHeight })
    })
  }
})