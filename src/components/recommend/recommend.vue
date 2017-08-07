<template>
  <div>
    推荐页面
  </div>
</template>
<script type="text/ecmascript-6">
  import { getRecommend } from 'api/recommend.js'
  export default {
    created() {
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">

</style>
