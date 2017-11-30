<template>
 <div ref="wrapper">
  <slot></slot>
 </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      clickable: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        // if (!this.$refs.wrapper) {
        //   return
        // }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.clickable
        })

        if (this.listenScroll) {
          // let me = this
          // this.scroll.on('scroll', (pos) => {
          //   console.log('scroll-111')
          //   me.$emit('scroll', pos)
          // })

          this.scroll.on('scroll', (pos) => {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
              this.$emit('scroll', pos)
            }, 16)
          })
        }
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
