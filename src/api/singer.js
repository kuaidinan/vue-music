import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

const data = Object.assign({}, commonParams, {
  channel: 'singer',
  page: 'list',
  key: 'all_all_all',
  pagesize: 100,
  pagenum: 1,
  hostUin: 0,
  needNewCode: 0,
  platform: 'yqq'
})

function SingerFun() {
  return class Singer {
    constructor() {
      this.url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
      this.data = data
    }

    /**
     * get singer list
     * @return Promise
     */
    getSingers() {
      return jsonp(this.url, this.data, options)
    }
  }
}

export default new SingerFun()
