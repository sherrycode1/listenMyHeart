// pages/home-music/index.js
import {
  rankingStore
} from '../../store/index'

import queryRect from '../utils/query-rect'
import {
  getBanners,
  getSongMenu
} from '../../service/aip_music'
Page({

  data: {
    swiperHeight: 60,
    banners: [],
    songMenu: [],
    recommandSongMenu: [],
    rankings: []
  },

  onLoad: function (options) {
    // 发起共享数据请求
    rankingStore.dispatch("getRankingDataAction")

    // 从store获取共享数据
    rankingStore.onState("hotRanking", res => {
      if (!res.tracks) return
      const recommandSongs = res.tracks.slice(0, 6)
      this.setData({
        recommandSongs
      })
    })

    rankingStore.onState('newRanking', this.getNewRankingHandler)

    // 网络请求
    getBanners().then(res => {
        this.setData({
          banners: res.banners
        })
      }),
      getSongMenu().then(res => {
        this.setData({
          songMenu: res.playlists
        })
      }),
      getSongMenu('华语').then(res => {
        this.setData({
          recommandSongMenu: res.playlists
        })
      })
  },
  // event
  handleSearchClick(e) {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  handleSwiperLoaded() {
    // 拿组件的高度
    queryRect(".swiper-image").then(res => {
      const rectHeight = res[0].height // #the-id节点的上边界坐标
      this.setData({
        swiperHeight: rectHeight
      })
    })
  },


  getNewRankingHandler: function (res) {
    if(Object.keys(res).length === 0) return 
    const name = res.name
    const coverImage = res.coverImgUrl
    const songList = res.tracks.slice(0, 3)
    const rankingObj = { name , coverImage , songList }
    const originRanking = [...this.data.rankings]
    originRanking.push(rankingObj)
    this.setData({
      rankings: originRanking
    })
   
  }
})