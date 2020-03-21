<template>
  <div v-if="$readingShow" :class="$readingShow" class="reading-progress">
    <div :style="progressStyle" class="progress"></div>
  </div>
</template>

<script>
export default {
  name: 'ReadingProgress',
  data () {
    return {
      readingTop: 0,
      readingHeight: 1,
      progressStyle: null,
      transform: ['transform']
    }
  },
  watch: {
    $readingShow () {
      this.base()
    }
  },
  mounted () {
    this.base()
  },
  beforeDestroy () {
    this.$readingShow && window.removeEventListener('scroll', this.getReadingBase)
  },
  methods: {
    base () {
      if (this.$readingShow) {
        this.transform = this.getTransform()
        this.progressStyle = this.getProgressStyle()
        window.addEventListener('scroll', this.getReadingBase, 200)
      }
    },
    getReadingBase () {
      this.readingHeight = this.getReadingHeight() - this.getScreenHeight()
      this.readingTop = this.getReadingTop()
      this.progressStyle = this.getProgressStyle()
    },
    getReadingHeight () {
      return document.body.scrollHeight
        || document.body.offsetHeight
        || 0
    },
    getScreenHeight () {
      return window.innerHeight
        || document.documentElement.clientHeight
        || 0
    },
    getReadingTop () {
      return window.pageYOffset
        || document.documentElement.scrollTop
        || 0
    },
    getTransform () {
      const transformList = ['transform', '-webkit-transform', '-moz-transform', '-o-transform', '-ms-transform']
      return transformList.filter(item => this.supportCss(item))
    },
    getProgressStyle () {
      const progress = this.readingTop / this.readingHeight
      switch (this.$readingShow) {
        case 'top':
        case 'bottom':
          if (this.transform[0]) {
            return `${this.transform[0]}: scaleX(${progress})`
          } else {
            return `width: ${progress * 100}%`
          }
          break
        case 'left':
        case 'right':
          if (this.transform[0]) {
            return `${this.transform[0]}: scaleY(${progress})`
          } else {
            return `height: ${progress * 100}%`
          }
          break
        default:
          break
      }
    },
    supportCss (value) {
      const div = document.createElement('div')
      return value in div.style
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
    transform-origin 0% 0%
    transition: transform .2s ease-out
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
