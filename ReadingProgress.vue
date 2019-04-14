<template>
  <div
    v-if="$readingShow"
    :class="$page.readingConfig.fixed"
    class="reading-progress"
  >
    <div
      class="progress"
      :style="`width:${readingTop / readingHeight * 100}%`"
    ></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      readingTop: null,
      readingHeight: null
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
    }
  }
}
</script>

<style lang="stylus" scoped>
$readingBgColor ?= transparent
$readingZIndex ?= 1000
$readingHeight ?= 3px
$readingProgressColor ?= $accentColor

.reading-progress
  position fixed
  z-index $readingZIndex
  left 0
  right 0
  width 100%
  height $readingHeight
  background $readingBgColor
  .progress
    height 100%
    background $readingProgressColor
.top
  top 0
.bottom
  bottom 0
</style>
