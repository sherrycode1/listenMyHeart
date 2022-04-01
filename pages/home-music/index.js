// pages/home-music/index.js
Page({

  data: {
    
  },

  onLoad: function (options) {
   
  },
  // event
  handleSearchClick(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  }
})