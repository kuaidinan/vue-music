<template>
  <div class="recommend">
    <scroll :data="playlist" class="recommend-content" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门榜单</h1>
          <ul>
            <li v-for='item in playlist' class="item">
              <div class="icon">
                <img width='60' height='60' v-lazy="item.imgurl"></img>
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-content">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
  import { getRecommend, getPlayList } from 'api/recommend'
  import { ERR_OK } from 'api/config.js'

  import slider from 'base/slider/slider'
  import scroll from 'base/scroll/scroll'
  import loading from 'base/loading/loading'
  export default {
    data() {
      return {
        recommends: [],
        playlist: []
      }
    },
    created() {
      this._getRecommend()

      this._getPlayList()
    },
    methods: {
      // 数据、图片异步请求 图片加载完再次初始化
      loadImage() {
        if (!this.isImgLoaded) {
          this.$refs.scroll.refresh()
          this.isImgLoaded = true
        }
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getPlayList() {
        getPlayList().then((res) => {
          if (res.code === ERR_OK) {
            this.playlist = res.data.list
          }
        })
      }
    },
    components: {
      slider,
      scroll,
      loading
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend
    position:fixed
    width:100%
    bottom:0
    top:88px
    .recommend-content
      height:100%
      overflow:hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height:60px
          line-height:65px
          text-align:center
          font-size:$font-size-medium
          color:$color-theme
        .item
          display:flex
          box-sizing:border-box
          align-items:center
          padding:0 20px 20px 20px
          .icon
            width:60px
            padding-right:20px
            flex:0 0 60px
          .text
            flex:1
            display:flex
            flex-direction:column
            justify-content:center
            line-height:20px
            overflow:hidden
            font-size:$font-size-medium
            .name
              margin-bottom:10px
              color:$color-text
            .desc
              color:$color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
