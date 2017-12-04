<template>
  <scroll 
    @scroll="scroll" 
    :data="data"
    :listen-scroll="listenScroll"
    :probe-type="probeType"
    class="listview" 
    ref="listview">
    <ul>
      <li v-for="(group, groupIndex) in data" class="list-group" ref="listGroup" :key="groupIndex">
        <h4 class="list-group-title">{{group.title}}</h4>
        <ul>
          <li v-for="(item, itemIndex) in group.items" class="list-group-item" :key="itemIndex">
            <img class="avatar" v-lazy="item.avator"></img>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li v-for="(item, index) in shortCutList"
           @touchstart="onTouchStart" 
           @touchmove="ontouchmove"
           :data-index="index"
           :class = "{'current':currentIndex === index}"
           class="item" 
           :key="index"
           >{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
  import scroll from 'base/scroll/scroll.vue'
  import { getData } from 'common/js/dom.js'
  
  const SHORTCUTHEIGHT = 18
  
  export default {
    data() {
      return {
        scrollY: -1,
        currentIndex: 0
      }
    },
    created() {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
      this.singerHeight = []
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortCutList: function() {
        return this.data.map((item) => {
          return item.title.substring(0, 1)
        })
      }
    },
    methods: {
      onTouchStart(e) {
        let selectedIndex = getData(e.target, 'index')
        this.touch.startY = e.touches[0].pageY
        this.touch.startIndex = selectedIndex
        this._scrollTo(selectedIndex)
      },
      ontouchmove(e) {
        let endY = e.touches[0].pageY || 0
        let delta = (endY - this.touch.startY) / SHORTCUTHEIGHT || 0
        let deltaIndex = parseInt(this.touch.startIndex) + delta
        this._scrollTo(parseInt(deltaIndex))
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _scrollTo(index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _calculHeight() {
        let listGroup = this.$refs.listGroup
        let height = 0
        this.singerHeight.push(height)
        listGroup.forEach((item) => {
          height += item.clientHeight
          this.singerHeight.push(height)
        })
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculHeight()
        }, 20)
      },
      scrollY(newVal) {
        let singerHeight = this.singerHeight
        for (let i = 0; i < singerHeight.length - 1; i++) {
          if (-newVal >= singerHeight[i] && -newVal <= singerHeight[i + 1]) {
            this.currentIndex = i
            return
          }
        }
      }
    },
    components: {
      scroll
    }
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
