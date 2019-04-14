const { path, datatypes: { isString }} = require('@vuepress/shared-utils')

module.exports = (options, ctx) => {
  const {
    readingDir = null,
    fixed = 'top'
  } = options

  return {
    extendPageData($page) {
      const { regularPath } = $page
      const setConfig = (dir, fixed) => {
        if (regularPath.includes(dir)) {
          $page.readingConfig = {
            readingShow: true,
            fixed
          }
        } else {
          $page.readingConfig = {
            readingShow: false
          }
        }
      }

      if (readingDir === null) {
        $page.readingConfig = {
          readingShow: true,
          fixed
        }
      } else if (isString(readingDir)) {
        setConfig(readingDir, fixed)
      } else if (Array.isArray(readingDir)) {
        readingDir.forEach(item => {
          setConfig(item, fixed)
        })
      } else {
        Object.keys(readingDir).forEach(key => {
          setConfig(key, readingDir[key])
        })
      }
    },
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    globalUIComponents: 'ReadingProgress'
  }
}
