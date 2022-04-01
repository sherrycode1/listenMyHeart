import request from './index'
// offset 0 , 0-9 , 10-19 ,
export function getTopMv(offset, limit = 10) {
  return request.get('/top/mv', {
    offset,
    limit
  })
}
// requestMVURL
export function getMVURL(id) {
  return request.get('/mv/url', {
    id
  })
}
// 
export function getMVDetail(mvid) {
  return request.get('/mv/detail', {
    mvid
  })
}

export function getRelatedVideo(id) {
  return request.get('/related/allvideo', {
    id
  })
}