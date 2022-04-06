// pages/home-music/index.js
import {
  rankingStore,
  rankingMap
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
    rankings: {
      0: {},
      2: {},
      3: {}
    }
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
  handleMoreClick(){
    this.navigateToDetailSongPage("hotRanking")
  },
  handleRankingItemClick(event) {
    const idx = event.currentTarget.dataset.idx
    const rankingName = rankingMap[idx]
    this.navigateToDetailSongPage(rankingName)
  },
  navigateToDetailSongPage: function (params) {
      wx.navigateTo({
        url: `/pages/detail-songs/index?ranking=${params}type=rank`,
      })
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
    // 拿巅峰榜的数据
    rankingStore.onState('newRanking', this.getRankingHandler(0))
    rankingStore.onState('originRanking', this.getRankingHandler(2))
    rankingStore.onState('upRanking', this.getRankingHandler(3))

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


  getRankingHandler: function (idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return
      const name = res.name
      const coverImage = res.coverImgUrl
      const songList = res.tracks.slice(0, 3)
      const playCount = res.playCount
      const rankingObj = {
        name,
        coverImage,
        songList,
        playCount
      }
      const originRanking = {
        ...this.data.rankings,
        [idx]: rankingObj
      }
      this.setData({
        rankings: originRanking
      })
    }
  },
  // getNewRankingHandler: function (res) {
  //   if(Object.keys(res).length === 0) return 
  //   const name = res.name
  //   const coverImage = res.coverImgUrl
  //   const songList = res.tracks.slice(0, 3)
  //   const rankingObj = { name , coverImage , songList }
  //   const originRanking = [...this.data.rankings]
  //   originRanking.push(rankingObj)
  //   this.setData({
  //     rankings: originRanking
  //   })

  // }
  // 热门歌单
  handleMenuItemClick(event){
    const item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-songs/index?id=${item.id}&type=menu`,
    })
  }
})
