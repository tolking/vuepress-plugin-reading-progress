const { path } = require('@vuepress/shared-utils')

module.exports = (options, ctx) => {
  const {
    readingDir = null,
    fixed = 'top'
  } = options

  return {
    async clientDynamicModules () {
      return [
        {
          name: 'readingProgress.js',
          content: `export default ${JSON.stringify({ readingDir, fixed })}`
        }
      ]
    },
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    globalUIComponents: 'ReadingProgress'
  }
}
