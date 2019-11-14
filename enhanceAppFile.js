import ReadingProgress from './ReadingProgress.vue'

export default ({ Vue }) => {
  Vue.component('ReadingProgress', ReadingProgress)
  Vue.mixin({
    computed: {
      $readingShow() {
        return this.$page.frontmatter.readingShow
      }
    }
  })
}
