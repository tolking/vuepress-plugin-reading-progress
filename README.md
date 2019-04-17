# vuepress-plugin-reading-progress

> plugin for vuepress

[README](README.md) | [CHANGELOG](CHANGELOG.md)

**This plugin is for Vuepress 1.x which is currently in alpha**

add reading progress bar for vuepress

![vuepress-plugin-reading-progress](https://ououe.com/img/vuepress_plugin_reading_progress.gif)

---

## Installation

``` sh
yarn add vuepress-plugin-reading-progress
// or
npm i vuepress-plugin-reading-progress
```

## Usage

``` js
module.exports = {
  plugins: [
    'reading-progress'
  ]
}
```

[ Vuepress documentation](https://v1.vuepress.vuejs.org/plugin/using-a-plugin.html)


## Options

### readingDir
- Type: `null`, `string`, `array`, `Object`
- Default: `null`

Specify folders that display reading progress bar

example
``` js
{
  readingDir: 'posts'
  // or
  readingDir: ['posts1', 'posts2', 'posts3']
  // or { dir: fixed }
  readingDir: {
    posts1: 'top',
    posts2: 'bottom',
    posts3: 'left'
  }
}
```

### fixed
- Type: `string`
- Default: `top`

support `top`, `bottom`, `left`, `right`

set position for reading progress bar

## style

If you wish to apply simple color overrides to the styling

```
+- .vuepress
  +- styles
    +- palette.styl
```

``` css
$readingBgColor = transparent
$readingZIndex = 1000
$$readingSize = 3px
$readingProgressColor = $accentColor
$readingProgressImage = none
```

## License

[MIT](http://opensource.org/licenses/MIT)

## Keywords

vue vuepress plugin reading-progress vreading progress
