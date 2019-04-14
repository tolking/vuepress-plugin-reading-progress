import ReadingProgress from './ReadingProgress.vue'

export default ({ Vue }) => {
  Vue.component('ReadingProgress', ReadingProgress)
  Vue.mixin({
    computed: {
      $readingShow () {
        if (this.$frontmatter.readingShow !== undefined) {
          return this.$frontmatter.readingShow
        } else if (this.$page.readingConfig.readingShow !== undefined) {
          return this.$page.readingConfig.readingShow
        } else {
          return true
        }
      }
    }
  })
}
