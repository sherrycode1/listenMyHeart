import request from './index'

export function getBanners() {
  return request.get('/banner',{
    type: 2
  })
}

export function getRankings(idx) {
  return request.get('/top/list', {
    idx
  })
}
