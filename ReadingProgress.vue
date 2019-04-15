<template>
  <div
    v-if="$readingShow"
    :class="$page.readingConfig.fixed"
    class="reading-progress"
  >
    <div
      class="progress"
      :style="progressStyle"
    ></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      readingTop: null,
      readingHeight: null,
      progressStyle: null
    }
  },
  watch: {
    $route() {
      this.getReadingBase()
    },
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.readingTop = this.getReadingTop()
    }, 100)
    this.$nextTick(() => {
      this.getReadingBase()
    })
  },
  
  methods: {
    getReadingBase () {
      this.readingHeight = this.getReadingHeight() - this.getScreenHeight()
      this.readingTop = this.getReadingTop()
      this.progressStyle = this.getProgressStyle()
    },
    getReadingHeight () {
      return document.body.offsetHeight
        || document.body.scrollHeight
        || document.body.clientHeight 
        || 1
    },
    getScreenHeight () {
      return window.innerHeight
        || document.documentElement.clientHeight
        || 0
    },
    getReadingTop () {
      return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop || 0
    },
    setProgressStyle () {
      const progress = this.readingTop / this.readingHeight
      switch (this.$page.readingConfig.fixed) {
        case 'top':
        case 'bottom':
          return `transform: translate3D(${50 - progress * 100}%, 0, 0) scale3D(${progress}, 1, 1)`
          break
        case 'left':
        case 'right':
          return `transform: translate3D(0, ${50 - progress * 100}%, 0) scale3D(1, ${progress}, 1)`
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
$readingBgColor ?= transparent
$readingZIndex ?= 1000
$readingSize ?= 3px
$readingProgressColor ?= $accentColor
$readingProgressImage ?= none

.reading-progress
  position fixed
  z-index $readingZIndex
  background $readingBgColor
  overflow hidden
  .progress
    width 100%
    height 100%
    background $readingProgressColor
    background-image $readingProgressImage
    transition: transform .1s ease-out
.top
  top 0
  left 0
  right 0
  width 100%
  height $readingSize
.bottom
  bottom 0
  left 0
  right 0
  width 100%
  height $readingSize
.left
  left 0
  top 0
  bottom 0
  width $readingSize
  height 100%
.right
  right 0
  top 0
  bottom 0
  width $readingSize
  height 100%
</style>
