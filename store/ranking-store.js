import {
  HYEventStore
} from 'hy-event-store'

import {
  getRankings
} from '../service/aip_music'

const rankingMap = {
  0: "newRanking",
  1: "hotRanking",
  2: "originRanking",
  3: "upRanking"
}
const rankingStore = new HYEventStore({
  state: {
    newRanking: {},
    hotRanking: {},
    originRanking: {},
    upRanking: {}
  },
  actions: {
    // 0 1 2 3 几个榜单
    getRankingDataAction(ctx) {
      // switch的优化
      for (let i = 0; i < 4; i++) {
        getRankings(i).then(res => {
          const rankingName = rankingMap[i]
          // console.log(rankingName);
          ctx[rankingName] = res.playlist
        })

      }
  
    }
  }
})

export {
  rankingStore
}