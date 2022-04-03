const BASE_URL = "http://123.207.32.32:9001"

class Request {
  Request(url, method, params) {
    return new Promise((resolve , reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method,
        data: params,
        success: function (res) {
          resolve(res.data)
        },
        fail: reject
      })
    })

  }

  get(url , params) {
    return this.Request(url , "GET" , params)
  }

  post(url , data) {
    return this.Request(url , "POST", data)
  }
}
const request = new Request()

// 调用的时候
// Request.get("/top/mv",  {
//   offset: 0,
//   limit: 10
// }).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.log(err);
// })

export default request