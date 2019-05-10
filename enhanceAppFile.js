import ReadingProgress from './ReadingProgress.vue'
import config from '@dynamic/readingProgress.js'

const setConfig = (regularPath, dir, fixed) => {
  return regularPath.includes(dir) ? fixed : false
}

export default ({ Vue }) => {
  Vue.component('ReadingProgress', ReadingProgress)
  Vue.mixin({
    computed: {
      $readingShow () {
        const { readingDir, fixed } = config
        const regularPath = this.$page.regularPath

        if (this.$frontmatter.readingShow !== undefined) {
          const readingShow = this.$frontmatter.readingShow
          return typeof readingShow === 'boolean' && readingShow
            ? 'top'
            : readingShow
        } else if (regularPath) {
          if (readingDir === null) {
            return fixed
          } else if (typeof readingDir === 'string') {
            return setConfig(regularPath, readingDir, fixed)
          } else if (Array.isArray(readingDir)) {
            for (let i = 0; i < readingDir.length; i++) {
              const item = readingDir[i]
              const isShow = setConfig(regularPath, item, fixed)
              if (isShow) return fixed
            }
            return false
          } else {
            for (const key in readingDir) {
              const item = readingDir[key]
              const isShow = setConfig(regularPath, key, item)
              if (isShow) return item
            }
            return false
          }
        } else {
          return false
        }
      }
    }
  })
}
