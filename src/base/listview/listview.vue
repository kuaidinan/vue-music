<template>
  <scroll :data="data" class="listview" ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h4 class="list-group-title">{{group.title}}</h4>
        <ul>
          <li v-for="item in group.items"  class="list-group-item">
            <img class="avatar" v-lazy="item.avator"></img>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>

<script>
  import scroll from 'base/scroll/scroll.vue'
  export default {
    props: {
      data: {
        type: Array,
        default: []
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
    position:relative
    width:100%
    height:100%
    overflow:hidden
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
</style>
