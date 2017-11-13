<template>
  <div>
    <ul>
      <li v-for="(group,groupIndex) in singers" :key="groupIndex">
        <div>{{group.title}}</div>
        <ul>
          <li v-for="(item,itemIndex) in group.items" :key="itemIndex">
            <img :src="item.avator" width="80" height="80" color:>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  import Singer from 'api/singer'
  import Singers from 'common/js/singer.js'

  import { ERR_OK } from 'api/config'
  let singerClass = new Singer()

  const HOT_SEARCH = '热门'
  const HOT_SEARCH_LEN = 10
  const SPECIAL = '#'
  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingers()
    },
    methods: {
      _getSingers() {
        singerClass.getSingers().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this.normalizeSinger(res.data.list)
            console.log(this.singers)
          }
        })
      },
      normalizeSinger(arr) {
        let map = {
          hot: {
            items: [],
            title: HOT_SEARCH
          },
          special: {
            items: [],
            title: SPECIAL
          }
        }

        arr.forEach((item, index) => {
          let key = item.Findex
          if (index < HOT_SEARCH_LEN) {
            map.hot.items.push(new Singers({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }

          if (!map[key]) {
            map[key] = {
              items: [],
              title: key
            }
          }

          if (map[key].title.match(/[0-9]/)) {
            map.special.items.push(new Singers({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          } else {
            map[key].items.push(new Singers({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
        })

        // 获得有序列表
        let hot = []
        let rest = []
        let special = []

        console.log(map)
        for (let key in map) {
          if (map[key].title.match(/[a-zA-Z]/)) {
            rest.push(map[key])
          } else if (map[key].title === HOT_SEARCH) {
            hot.push(map.hot)
          } else if (map[key].title === SPECIAL) {
            special.push(map.special)
          }
        }

        rest.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(rest).concat(special)
      }
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">

</style>